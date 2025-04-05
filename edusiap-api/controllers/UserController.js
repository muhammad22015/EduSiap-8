const { Prisma } = require('../prisma/prismaClient')
const Joi = require('joi');
const bcrypt = require('bcrypt');

const register = async (req,res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(8),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(422).json({status: error.details[0].message});

    const {username, email, password} = value;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await Prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }
        })

        return res.status(201).json({status: "User berhasil ditambahkan", user});
    } catch (err) {
        return res.status(500).json({status: "Server Error", error: err.message});
    }
}

module.exports = { register };