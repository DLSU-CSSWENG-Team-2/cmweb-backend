const axios = require(`axios`);
const sendQuery = require("./utils/sendQuery");
const { GET_FAQ } = require("./utils/faqQueries");
import { Handler } from "@netlify/functions";
require(`dotenv`).config();

interface UnprocessedFAQ {
  _id: string;
  title: string;
  icon: string;
  list: QuestionList;
}

interface QuestionList {
  data: Array<Object>;
}

const handler: Handler = async (event: any) => {
  // Restrict to get request
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "This endpoint only accepts GET requests.",
      }),
    };
  }

  try {
    const res = await sendQuery(GET_FAQ);
    const data = res.allFAQCategories.data;

    const newData = data.map((faq: UnprocessedFAQ) => {
      const newFaqType: any = faq;
      newFaqType.list = faq.list.data;
      return newFaqType;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(newData),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
  };
};

export { handler };
