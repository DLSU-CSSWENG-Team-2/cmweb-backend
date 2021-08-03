const axios = require(`axios`);
const sendQuery = require("./utils/sendQuery");
const { GET_ALL_PRODUCTS } = require(`./utils/productQueries.js`);
import { Handler } from "@netlify/functions";
require(`dotenv`).config();

/**
 * Queries all products from FaunaDB.
 * @param event
 * @returns all currently existing products but with specific fields (i.e. _id, name, price, mainImage).
 */
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
    const res = await sendQuery(GET_ALL_PRODUCTS);
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
};

export { handler };
