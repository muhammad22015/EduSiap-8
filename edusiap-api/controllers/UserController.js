const { Prisma } = require('../prisma/prismaClient')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationMail } = require('../utils/sendMail');
// require('dotenv').config();

const register = async (req,res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(8),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(422).json({status: error.details[0].message});

    const {username, email, password} = value;

    try {
        const existingUser = await Prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            if (existingUser.is_verified) {
                return res.status(409).json({ status: 'Email sudah terdaftar' });
            }

            const NOW = new Date();
            const EMAIL_SENT = new Date(existingUser.created_at);
            const HOUR = 60 * 60 * 1000;

            if (NOW - EMAIL_SENT < HOUR) {
                return res.status(429).json({ status: 'Link verifikasi telah dikirim, cek Email anda' });
            }

            await Prisma.user.update({
                where: { email },
                data: { created_at: new Date() }
              });              

            const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "1h"});
            const url = `${process.env.BASE_URL}/users/verify?token=${token}`;
        
            await sendVerificationMail(email, url, username);

            return res.status(201).json({status: 'Verifikasi email telah dikirim' });
        }
    
        const existingUsername = await Prisma.user.findUnique({ where: { username } });
        if (existingUsername) {
          return res.status(409).json({ status: 'Username sudah digunakan' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        await Prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }
        })
        
        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "1h"});
        const url = `${process.env.BASE_URL}/users/verify?token=${token}`;
    
        await sendVerificationMail(email, url, username);
    
        return res.status(201).json({status: 'Verifikasi email telah dikirim' });
    } catch(err) {
        return res.status(500).json({status: "Server Error", error: err.message})
    }
}

const verify = async (req,res) => {
    const { token } = req.query;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await Prisma.user.findFirst({
            where: { email }
        });
        if (!user) return res.status(404).send('User tidak ditemukan atau Token kadaluarsa');
        if(user.is_verified) return res.status(404).send('Akun telah terverifikasi');

        await Prisma.user.update({
            where: { email },
            data: {
                is_verified: true,
            }
          });
        
        return res.send("Verifikasi Berhasil");
    } catch (err) {
        return res.send("Token Kadaluarsa");
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

        if(!user.is_verified) return res.status(401).json({status: "Verify Akun terlebih dahulu!"});

        return res.status(200).json({status: "Login Berhasil"});
    } catch (err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

module.exports = { register, verify, login };