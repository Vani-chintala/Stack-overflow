import express from "express"
// mongoose from "mongoose"
import cors from "cors" //to eliminate cross origin issues we use cors
import dotenv from "dotenv"
dotenv.config()
//import openai from "openai"
import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const app = express()

app.use(express.json())
app.use(cors()) 



app.post('/chat', async(req,res)=>{
    const {prompt} = req.body
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role : "assistant", content : prompt }], //text or prompt
        temperature: 1,
        max_tokens: 256,
        top_p:   1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      console.log(response)
      console.log("hello")
      console.log(response.data.choices[0].message.content)
      return res.status(200).send(response.data.choices[0].message.content)
    }catch(error){
      res.status(404).send(error)
    }
})


const port = 5000

app.listen(port,()=>{
    console.log(`running in port ${port}`)
})