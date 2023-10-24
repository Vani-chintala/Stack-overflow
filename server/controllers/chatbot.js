
import dotenv from "dotenv"
dotenv.config();
import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});




export const Chatbot = async (req, res) => {
  console.log("HEEY MAN")
  const { prompt } = req.body
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role" : "assistant", "content" : prompt }], //text or prompt
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    console.log(response)
    console.log("hello")
    console.log(response.data.choices[0].message.content)
    res.send(response.choices[0].message.content)
    //  res.status(200).json({message : response.data.choices[0].message.content})
  } catch (error) {
    res.status(500).send(error)
  }
}
