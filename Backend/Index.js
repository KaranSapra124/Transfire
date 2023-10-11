const express = require('express');
const mongoose = require('mongoose');
const md5 = require('md5')
const app = express();
const cors = require('cors')
require("dotenv").config()
// Dependencies imported
// const Url = 'mongodb+srv://saprakaran001:Iamphenomenol1@transfirecluster.mlemikd.mongodb.net/?retryWrites=true&w=majority'
// Connected to database
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully Connected");
}).catch((err) => {
    console.log("Error while connecting: ", err);
})

var HashPass = ""
// cors policy bypass
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json())

// Routes Started
const NewUser = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    UserDic: Array
})

const New_User = mongoose.model('New_User', NewUser)
app.post("/SignUp", async (req, res) => {
    const { Name, Email, Password } = req.body
    console.log(Name, Email, Password);
    HashPass = md5(md5(Password))
    console.log(typeof (HashPass));
    const New__User = new New_User({ Name, Email, Password: HashPass })
    await New__User.save().then(() => {
        console.log("Success");
    })
})
app.post("/Login", async (req, res) => {
    const { Name, Email, Password } = req.body
    // console.log(Name, Password);
    HashPass = md5(md5(Password))
    console.log(typeof (HashPass));
    New_User.findOne({ Email: Email })
        .then((docs) => {
            if (docs.Password === HashPass) {
                res.status(200).json({ message: "Successfully logged in!!!" })
            } else {
                console.log("Not Matched");
                return;
            }
        })
})
app.post("/translate", async (req, res) => {
    const { emailId, SavedWords } = req.body;
    console.log(emailId, SavedWords);

    try {
        const docs = await New_User.findOne({ Email: emailId });

        if (!docs) {
            // Handle the case where the user is not found
            return res.status(404).json({ error: "User not found" });
        }

        docs.UserDic = [...docs?.UserDic,...SavedWords]
        await docs.save();

        return res.status(200).json({ message: "Words Saved!!" });
    } catch (error) {
        // Handle any errors that occur during database operations
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/About", (req, res) => {
    const { emailId } = req.body;
    console.log(emailId);
    New_User.findOne({ Email: emailId })
        .then((docs) => {
            return res.status(200).json({ message: docs })
        })
        .catch((err) => {
            return res.status(404).json({ message: "Not Found!!!!" })
        })
})



app.listen(3000, () => {
    console.log("Running on port 3000");
});