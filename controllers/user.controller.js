const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/UserSchema.js")
const  Question = require("../models/QuesSchema");
var secretKey="sfndoifndonvdovndvndkovndokn"

module.exports.userLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        console.log(validUser);

        if (!validUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcryptjs.compare(password, validUser.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const { _id, password: hashedPassword, ...userInfo } = validUser._doc;
        const token = jwt.sign({ id: _id }, secretKey);
        console.log('Generated token', token);
        console.log('userInfo:', userInfo);

        return res.cookie('jwt', token, { httpOnly: true }).status(200).json({ token, user: userInfo });
    } catch (error) {
        console.log('Error Signing In', error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.Signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('New User created');
        return res.status(200).json(newUser);
    } catch (error) {
        console.log('Error Signing Up', error.message);

        if (error.message.includes("E11000")) {
            return res.status(409).json({ message: "Error: Email already in use" });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports.GenerateQuestion = async (req, res) => {
    const { company_name } = req.query;

    try {
        const questions = await Question.find({ company_name });

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for the specified company" });
        }

        return res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        return res.status(500).json({ message: "An error occurred while fetching questions", error: error.message });
    }
};
