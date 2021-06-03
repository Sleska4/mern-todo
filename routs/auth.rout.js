const {Router} = require('express');
const router = Router();
const User = require('../modals/User');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/registration', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Неккоректный пароль').isLength({min: 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации'
            })
        }

        const {email, password} = req.body;

        const isUsed = await User.findOne({ email });

        if(isUsed){
            return res.status(300).json({message: 'Данный Email уже занят, попробуйте другой'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email, password: hashedPassword
        });

        await user.save();

        res.status(201).json({message: 'Пользователь создан'})

    } catch(err){
        console.log(err)
    }
})


router.post('/login', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Неккоректный пароль').exists()
    ],
    async (req, res) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch || !user){
            return res.status(400).json({message: 'Неверный логин или пароль'})
        }
        
        const jwtSecret = 'rg34gtu467j53ytf34rf4cth75645t4werg45yrtt3q43y4er';

        const token = jwt.sign(
            {userId: user.id},
            jwtSecret,
            {expiresIn: '1h'}
        )

        res.status(200).json({token, userId: user.id})

    } catch(err){
        console.log(err)
    }
})

module.exports = router