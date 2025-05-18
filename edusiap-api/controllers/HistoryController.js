const { Prisma } = require('../prisma/prismaClient');

const historyByUserId = async (req,res) => {
    const { id } = req.query;

    try {
        const history = await Prisma.history.findMany({
            where: { user_id: parseInt(id)},
            orderBy: {
                watched_at: 'desc'
            },
        })
        if(!history) return res.status(404).json({status: "Bad Request", error: "Tidak Ada History Video"});
        
        return res.status(200).json({status: "Authorized", response: history})
    } catch(err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

const watchVideo = async (req, res) => {
    try {
        const { user_id, video_id } = req.body;
  
        if (!user_id || !video_id) {
            return res.status(400).json({ status: "Bad Request", error: "user_id dan video_id tidak ditemukan" });
        }
  
        await Prisma.$transaction([
            Prisma.history.upsert({
                where: { 
                    user_id_video_id: {
                        user_id,
                        video_id,
                    }
                },
                create: {
                    user_id,
                    video_id,
                    watched_at: new Date(),
                },
                update: {
                    watched_at: new Date(),
                },
            }),
  
            Prisma.video.update({
                where: {
                    video_id,
                },
                data: {
                    view_count: {
                        increment: 1,
                    },
                },
            }),
      ]);
  
      return res.status(200).json({ status: "Success", message: "History terbaharui dan Video View Count naik" });
  
    } catch (error) {
        console.error('Error in watchVideo:', error);
        return res.status(500).json({ status: "Server Error", error: error.message });
    }
};


module.exports = { historyByUserId, watchVideo };