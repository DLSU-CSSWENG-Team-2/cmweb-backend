import { Handler } from "@netlify/functions";
import { GET_FEATURED_COLLECTIONS } from "./utils/collectionQueries.js";
import sendQuery from "./utils/sendQuery";

const handler: Handler = async (event, context) => {
  // Restrict to get request
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "This endpoint only accepts GET requests.",
      }),
    };
  }

  // Send query to FaunaDB to get collections
  try {
    // GET_FEATURED_COLLECTIONS takes "featured": Boolean field parameter
    const res = await sendQuery(GET_FEATURED_COLLECTIONS, {"featured" : true});
    const data = res.collections.data;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  };
};

export { handler };
