import express from "express";
import mongoose from "mongoose";
import { identityContact } from "./contoller/identifyContact";

const app = express();
app.use(express.json());

mongoose.connect("MongoDB url")

app.get("/", (req, res) => {
    res.send("hello");
})

app.post("/identity", async(req, res) => {
    const email = req.body;
    const phoneNumber = req.body;
    if (!email && !phoneNumber){
        return res.status(400).json({error: "email and phone number required"})
    }
    try {
        const result = await identityContact({email, phoneNumber})
        res.status(200).json({contact : result})
    } catch (error) {
        console.log("Error in identifying contacts", error);
        res.status(500).json({error :'Internal server error'})
        
    }

})

const PORT = 3000;
app.listen(PORT,  () => {
    console.log(`Serveer running on http://localhost:${PORT}`)
});