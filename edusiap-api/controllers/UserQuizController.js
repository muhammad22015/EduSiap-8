const { Prisma } = require('../prisma/prismaClient');

const scoreById = async (req,res) => {
    const { user_id, quiz_id } = req.body;
    if(!user_id || !quiz_id ){
        return res.status(400).json({ status: "Bad Request", error: "user_id atau quiz_id tidak ditemukan"});
    }

    try{
        const userquiz = await Prisma.user_quiz.findUnique({
            where: {
                user_id_quiz_id: {
                    user_id,
                    quiz_id
                }
            }
        });
        if(!userquiz) return res.status(404).json({ status: "Bad Request", error: "User Quiz tidak ditemukan"});

        return res.status(200).json({ status: "Authorized", response: userquiz});
    } catch(err) {
        return res.status(500).json({ status: "Server Error", error: err.message});
    }
}

const uploadScoreById = async (req,res) => {
    const { user_id, quiz_id, score } = req.body;
    if (!user_id || !quiz_id){
        return res.status(400).json({ status: "Bad Request", error: "user_id atau quiz_id tidak ditemukan"});
    }

    try{
        await Prisma.user_quiz.upsert({
            where: {
                user_id_quiz_id: {
                    user_id, 
                    quiz_id
                }
            },
            create: {
                user_id,
                quiz_id,
                score
            },
            update: {
                score
            },
        });

        return res.status(200).json({ status: "Success", message: "UserQuiz Score terbaharui"});
    } catch(err){
        return res.status(500).json({ status: "Server Error", error: err.message });
    }
}

module.exports = { scoreById, uploadScoreById };