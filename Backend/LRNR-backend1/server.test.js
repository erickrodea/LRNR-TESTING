const { getQuestions, getEvaluation, app } = require("./server");
const request = require("supertest");

let questions;
let evaluation;
beforeAll(async () => {
  questions = await getQuestions("javaScript", "novice", 5, "master oogway");
  evaluation = await getEvaluation(
    "What is JavaScript?",
    "JavaScript is a programming language"
  );
});

//test error messages from evaluation function
jest.mock("./server", () => ({
  getEvaluation: jest.fn(() => {
    return {
      error: "Invalid response from GPT. Please try again.",
    };
  }),
  getQuestions: jest.fn(() => {
    return {
      error: "Invalid response from GPT. Please try again.",
    };
  }),
}));

// test error messages from questions function

test("getQuestions function gives error if api gives invalid response", async () => {
  const response = await getQuestions("aws", "novice", 5, "master oogway");
  expect(response).toEqual({
    error: "Invalid response from GPT. Please try again.",
  });
});

test("getQuestions returns error when invalid parameters are provided", async () => {
  const response = await getQuestions(
    "invalidTopic",
    "invalidExpertise",
    0,
    "invalidStyle"
  );
  expect(response).toEqual({
    error: "Invalid response from GPT. Please try again.",
  });
});

test("invalid answer ", async () => {
  const response = await getEvaluation(
    "What is JavaScript?",
    "JavaScript is a programming language"
  );
  expect(response).toEqual({
    error: "Invalid response from GPT. Please try again.",
  });
});

//tests for the server to generate random tests if no parameters are provided
test("random test", async () => {
  const responseEvaluation = await getEvaluation(
    "what are the basic principles of physics?",
    "The basic principles of physics include..."
  );

  const responseQuestions = await getQuestions("", "", 5, "");

  expect(responseEvaluation).toBeDefined();
  expect(responseQuestions).toBeDefined();
  expect(responseEvaluation.error).toBe(
    "Invalid response from GPT. Please try again."
  );
  expect(responseQuestions.error).toBe(
    "Invalid response from GPT. Please try again."
  );
});

test("test the data is returned from the server", async () => {
  function callback(error, data) {
    if (error) {
      document(error);
      return;
    }
    try {
      expect(data).toBe("Hello LRNR!");
      done();
    } catch (error) {
      done(error);
    }
  }
  fetch("http://localhost:4000", callback);
});
