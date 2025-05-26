const { Prisma } = require('../prisma/prismaClient');
const jwt = require('jsonwebtoken');

const newAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(400).json({ status: "Bad Request", error: "refreshToken diperlukan"});

    try {
        const storedToken = Prisma.refresh_token.findUnique({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!storedToken) return res.status(403).json({ error: "Refresh Token tidak ditemukan" });      

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        const accesstoken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "5m" });

        return res.status(200).json({ status: "Access Token berhasil dibuat", response: accesstoken});
    } catch(err) {
        if (err.name === 'TokenExpiredError') {
            await Prisma.refresh_token.delete({
                where: {
                    refresh_token: refreshToken
                }
            })
            return res.status(403).json({ error: "Refresh token sudah expired" });
        }
        return res.status(500).json({ status: "Server Error", error: err.message});
    }
}

module.exports = { newAccessToken };