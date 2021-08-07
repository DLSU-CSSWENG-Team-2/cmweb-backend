const axios = require(`axios`);
const sendQuery = require("./utils/sendQuery");
const { GET_FAQ } = require(`./utils/faqQueries`);
import { Handler } from "@netlify/functions";
require(`dotenv`).config();

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
    const data = res.allProducts.data;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
