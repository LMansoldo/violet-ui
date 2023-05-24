import axios from 'axios';
import { quizStore } from '../components/admin.store';

interface OpenAIResponse {
    choices: {
      text: string;
      index: number;
      logprobs: {
        token_logprobs: number[];
        top_logprobs: number[];
        token_ids: number[];
      }[];
    }[];
  }



const OPENAI_API_KEY = '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'; // Replace with your actual API key
const API_URL = 'https://api.openai.com/v1/completions';

export default async function getQuestions(prompt: string) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  };

  const data = {
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

 await axios.post(API_URL, data, { headers: headers })
    .then(response => {
      const responseData = response.data;
      const text = responseData.choices[0].text;
      const minifiedJsonString = JSON.stringify(JSON.parse(text));
      console.log(minifiedJsonString)
      const json = JSON.parse(minifiedJsonString)
      json.map((q) => {
        quizStore.addQuestions(q)
      })
    })
    .catch(error => {
      console.log(error);
    });
}