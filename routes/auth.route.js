const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();
const User = require('../models/User');


// Route for Registration
router.post('/registration', 
  [
    check('email', 'Введите корректный Email').isEmail(),
    check('password', 'Пароль должен быть минимум 4').isLength({min: 4}),
  ], 
  async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(), 
        message: 'Некорректные данные при регистрации.',
      });
    }

    const {email, password} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const isUsed = await User.findOne({email});

    if (isUsed) {
      return res.status(300).json({message: 'Данный Email уже зарегистрирован, пожалуйста, введите другой Email.'});
    }

    const user = new User({
      email, 
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({message: 'Регистрация прошла успешно.'});
    console.log(user);
    console.log('User created');
    
  } catch (error) {
    console.log(error)
  }
});

//Route for login
router.post('/login', 
  [
    check('email', 'Введите корректный Email').isEmail(),
    check('password', 'Некорректный пароль').exists()
  ], 
  async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(), 
        message: 'Некорректные данные при регистрации.',
      });
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({message: 'Пользователь не найден.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({message: 'Неверный пароль.'});
    }

    const JWT_SECRET = 'dvbfkpeoc@dblhjkjdsjdf6734%32fsdfg';

    const token = jwt.sign(
      {userId: user.id}, 
      JWT_SECRET, 
      {expiresIn: '1h'}
    );
    console.log('User logged in');
 

    res.json({message: 'Авторизация прошла успешно!', token, userId: user.id});
    
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;