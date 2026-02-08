import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('ChatGPT App is running!');
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // Placeholder for ChatGPT integration
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
});

app.listen(port, () => {
  console.log(`ChatGPT app listening on port ${port}`);
});
