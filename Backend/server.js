const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/loginDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existUser = await User.findOne({ username });
        if (existUser) return res.status(400).send("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.send("User registered!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send("Invalid password");

        res.send("Login successful!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
