const router = require('express').Router();

//import user
const User = require('../model/User');

//import validation
const {registerValidation, loginValidation} = require('../validation');

//import bcrypt
const bcrypt = require('bcryptjs');

//import JWT
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res)=>{
    //validate user before posting it to the db
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email already exists in db
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('The email already exists');
    
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt); 

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saveUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req,res)=>{
    //validate login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email exists
    const userExists = await User.findOne({email: req.body.email});
    if(!userExists) return res.status(400).send('Email is not found');
    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, userExists.password);
    if(!validPassword) return res.status(400).send('Invalid Password');
    //create and assign token
    const token = jwt.sign({_id: userExists._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
});

module.exports = router;