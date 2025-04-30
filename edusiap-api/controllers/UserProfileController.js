const { Prisma } = require('../prisma/prismaClient');

const userProfileByUserId = async (req,res) => {
    const { id } = req.query;

    try {
        const user_profile = await Prisma.user_profile.findUnique({
            where: { user_id: parseInt(id)},
        })
        if(!user_profile) return res.status(404).json({status: "User tidak ditemukan"});
        
        return res.status(200).json({status: "Authorized", response: user_profile})
    } catch(err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

module.exports = { userProfileByUserId };