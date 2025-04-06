const { Prisma } = require('../prisma/prismaClient');

const allData = async (req,res) => {
    try {
        const videos = await Prisma.video.findMany();

        return res.status(200).json({status: "Authorized", response: videos});
    } catch(err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

const videobyId = async (req,res) => {
    const { id } = req.query;

    try {
        const video = await Prisma.video.findUnique({
            where: { video_id: parseInt(id)}
        })
        if(!video) return res.status(404).json({status: "Video Tidak Ditemukan"});
        
        return res.status(200).json({status: "Authorized", response: video})
    } catch(err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

module.exports = { allData, videobyId };