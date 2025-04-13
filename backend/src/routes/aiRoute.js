import { Router } from "express";
import {generateContent} from '../services/aiService.js'

const aiRouter = Router();

aiRouter.get('/get-response', async (req, res) => {
    const prompt = req.query.code;

    if(!prompt){
        return res.status(400).json({
            message: "Enter some code to review"
        })
    }

    try{
        const response = await generateContent(prompt);

        return res.send({
            response
        })
    } catch(error){
        console.log("Error generating content: ",error);
        return res.status(500).json({
            message: "Error generating content",
            error: error.message
        });
    }

   
})

export default aiRouter;