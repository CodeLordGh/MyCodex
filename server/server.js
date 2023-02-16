// Import necessary modules
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
 // Load environment variables
dotenv.config()
 // Initialize Configuration and OpenAIApi
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
 // Create Express App
const app = express()
app.use(cors())
app.use(express.json())
 // Route for GET Request
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})
 // Route for POST Request
app.post('/', async (req, res) => {
    try {
      // Extract prompt from request body
      const prompt = req.body.prompt;
       // Use OpenAI API to create completion
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
       // Return response
      res.status(200).send({
        bot: response.data.choices[0].text
      });
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something went wrong');
    }
})
 // Start Server
app.listen(5500, () => console.log('AI server started on http://localhost:5500'))
