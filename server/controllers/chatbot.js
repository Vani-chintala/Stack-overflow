
import dotenv from "dotenv"
dotenv.config();
import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export const Javascriptchat = async (req, res) => {
  const { text } = req.body
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content : text }], //text or prompt
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    //console.log(response)
    console.log("hello")
    console.log(response.data.choices[0].message.content)
     res.status(200).send(response.data.choices[0].message.content)
  } catch (error) {
    res.status(404).send(error)
  }
}
