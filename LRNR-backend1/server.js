const OpenAI = require("openai");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 4000;

const openai = new OpenAI({
  apiKey: process.env.apiKey,
});

app.use(cors());

async function getQuestions(top, exp, num, sty) {
  let topic = top;
  let expertise = exp;
  let numQuestions = num;
  let style = sty;
  let prompt = `Genereate ${numQuestions} on a ${expertise} level regarding  ${topic}. Questions should be simple. Do not answer the questions.
    Please word the questions as if you were ${style}, make sure to integrate this in each question but keep the questions based on ${topic}.
    each question must be based on ${topic} .
    format the response as an array with each question being a string value in the array.
    Please do not number the questions.`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  try {
    console.log(completion.choices[0].message.content);
    console.log(
      JSON.parse(`{"Questions": ${completion.choices[0].message.content}}`)
    );
    return JSON.parse(
      `{"Questions": ${completion.choices[0].message.content}}`
    );
  } catch (error) {
    console.log({
      error: "Invalid response from GPT. Please try again.",
    });
    return {
      error: "Invalid response from GPT. Please try again.",
    };
  }
}

async function getEvaluation(ques, sub) {
  let question = ques;
  let submission = sub;
  let prompt = `Please provide answer for the following question: '${question}' then compare that answer to the possible submission: '${submission}' to determine if that submission is an acceptable answer with an explanation why.
    Make sure you do not repeat the submission or question in your response.
    Make sure you do not use quotation marks in your evaluation or explanation.
    Make sure to format the response as a JSON object with only two values: 'evalutaion' and 'explanation'.
    Make sure the evaluation value is either 'correct' or 'incorrect'.
    Please do not use any line breaks in your response.`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  try {
    //this is responsible for getting questions made from categories and console logs
    console.log(completion.choices[0].message.content);
    console.log(JSON.parse(completion.choices[0].message.content));
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.log({
      error: "Invalid response from GPT. Please try again.",
    });
    return {
      error: "Invalid response from GPT. Please try again.",
    };
  }
}

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello LRNR!");
});

app.get("/questions", async (req, res) => {
  const topic = req.query.topic;
  const expertise = req.query.expertise;
  const numQuestions = req.query.numQuestions;
  const style = req.query.style;
  const questions = await getQuestions(topic, expertise, numQuestions, style);
  res.json(questions);
});

app.get("/evaluation", async (req, res) => {
  const question = req.query.question;
  const submission = req.query.submission;
  const evaluation = await getEvaluation(question, submission);
  res.json(evaluation);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
module.exports = { getQuestions, getEvaluation, app };
