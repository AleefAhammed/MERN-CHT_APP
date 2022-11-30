const User = require('../Model/userModel')
const bcrypt = require('bcrypt');
const { response } = require('express');


module.exports.signup = async (req, res, next) => {

    try {

        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username })
        if (usernameCheck)
            // console.log(usernameCheck);
            return res.json({ msg: "Username already taken", status: false })

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already taken", status: false });

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({

            username,
            email,
            password: hashedPassword
        });
        delete user.password
        return res.json({ status: true, user })
    } catch (err) {

        next(err)
    }
};


module.exports.login = async (req, res, next) => {

    try {

        const { username, email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user)
            // console.log(usernameCheck);
            return res.json({ msg: "Incorrect email or password", status: false })

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.json({ msg: "Incorrect email or password", status: false });

        delete user.password;

        return res.json({ status: true, user })
    } catch (err) {

        next(err)
    }
};

module.exports.setavatar = async (req, res, next) => {

    try {

        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {

            isAvatarImageSet: true,
            avatarImage,
        });

        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (ex) {

        next(ex)
    }
};

module.exports.getAllUsers = async (req, res, next) => {

    try {

        const users = await User.find({ _id: { $ne: req.params.id } }).select([

            "email",
            "username",
            "avatarImage",
            "_id"
        ]);

        // console.log(users);
        return res.json(users)
    } catch (ex) {

        next(ex)
    }
}
