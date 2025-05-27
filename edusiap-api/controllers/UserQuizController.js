const { Prisma } = require('../prisma/prismaClient');

const scoreById = async (req, res) => {
    const { user_id } = req.user;
    const { quiz_id } = req.query;
    
    console.log('Fetching score for:', { user_id, quiz_id });

    if (!user_id || !quiz_id) {
        return res.status(400).json({ 
            status: "Bad Request", 
            error: "Missing user_id or quiz_id" 
        });
    }

    try {
        const userquiz = await Prisma.user_quiz.findUnique({
            where: {
                user_id_quiz_id: {
                    user_id: parseInt(user_id),
                    quiz_id: parseInt(quiz_id)
                }
            }
        });
        
        console.log('Found quiz record:', userquiz);

        if (!userquiz) {
            return res.status(200).json({ 
                status: "Authorized", 
                response: null 
            });
        }

        return res.status(200).json({ 
            status: "Authorized", 
            response: {
                user_id: userquiz.user_id,
                quiz_id: userquiz.quiz_id,
                score: userquiz.score
            }
        });
    } catch (err) {
        console.error('Error fetching quiz score:', err);
        return res.status(500).json({ 
            status: "Server Error", 
            error: err.message
        });
    }
}

const uploadScoreById = async (req,res) => {
    const { user_id } = req.user;
    const { quiz_id, score } = req.body;
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