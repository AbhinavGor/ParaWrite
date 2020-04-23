const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const Admin = require('../../models/Admin')
//@route  POST api/admins
//@desc   Register admin
//@access Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;
    const member = true;

    try {
            //See if the admin exists
            let admin = await Admin.findOne({email});

            if(admin){
                return res.status(400).json({ errors: [{ msg: 'admin already exists.'}]});
            }

            //Get admins gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            admin = new Admin({
                name, 
                email,
                avatar, 
                password,
                member
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);

            admin.password = await bcrypt.hash(password, salt);

            await admin.save();

            //Return jsonwebtoken
            const payload = {
                admin: {
                    id: admin.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000}, 
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }


});

module.exports = router;