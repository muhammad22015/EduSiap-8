const { Prisma } = require('../prisma/prismaClient')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationMail } = require('../utils/sendMail');

const tempUsers = new Map();

const register = async (req,res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(8),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(422).json({status: error.details[0].message});

    const {username, email, password} = value;

    const existingEmail = await Prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ status: 'Email sudah terdaftar' });
    }

    const existingUsername = await Prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ status: 'Username sudah digunakan' });
    }

    tempUsers.set(email, { username, email, password });

    await sendVerificationMail(email);

    return res.json({ message: 'Verifikasi email telah dikirim' });

}

const verify = async (req,res) => {
    const { token } = req.query;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const tempUser = tempUsers.get(email);
        if (!tempUser) return res.status(404).send('User tidak ditemukan atau Token kadaluarsa');

        const hashedPassword = await bcrypt.hash(tempUser.password, 10);
        await Prisma.user.create({
            data: {
                email: tempUser.email,
                username: tempUser.username,
                password: hashedPassword
            }
        })

        tempUsers.delete(email); 
        return res.send("Verifikasi Berhasil");
    } catch (err) {
        return res.send(err);
    }
}

const login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({status: "Email dan Password diperlukan!"});

    try {
        const user = await Prisma.user.findFirst({
            where: { email }
        });
        if(!user) return res.status(401).json({status: "Email salah!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({status: "Password salah!"});

        return res.status(200).json({status: "Login Berhasil"});
    } catch (err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

module.exports = { register, verify, login };