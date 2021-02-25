const express = require('express');
const router = express.Router();
// const MongoInit = require('../config/mongodb');
const User = require('../model/user');
const bcrypt = require('bcryptjs');

router.get('/users', (req, res) => {
    User.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/signup', (req, res) => {
    let alreadyexist = User.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
    });
    if (alreadyexist.length) {
        return res.json({ msg: "User already exists!" });
    }
    let password = bcrypt.hashSync(req.body.password, 9);
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        contact: req.body.contact,
        password: password
    });

    user.save((err, data) => {
        if (err) throw err;
        res.send({ msg: "Signed up successfully..." });
    })

})

router.post('/login', (req, res) => {
    let user = User.findOne({ email: req.body.email }, (err, data) => {
        if (err) return res.status(500).json({ msg: "Error while login" });
        if (!data) return res.status(404).json({ msg: "Email not found" });
        else {
            let PassMatch = bcrypt.compareSync(req.body.password, data.password);
            if (!PassMatch) {
                return res.status(400).send({
                    msg: "Invalid password"
                })
            }
            res.status(200).send({ msg: "Login Success" });
        }
    })


})

module.exports = router;