import { Handler } from "@netlify/functions";
import faunaRequest from "./config/FaunaAxiosConfig";

const handler: Handler = async (event, context) => {
  // Send query to FaunaDB to get collections

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, World!" }),
  };
};

export { handler };
