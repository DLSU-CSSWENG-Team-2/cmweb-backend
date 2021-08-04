const axios = require(`axios`);
const sendQuery = require("./utils/sendQuery");
const { GET_ALL_PRODUCTS, GET_PRODUCT_PAGE } = require(`./utils/productQueries.js`);
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
  
  // event.queryStringParameters.<variable>
  // requirements: cursor : String, either before or after
  // Is there a way to pass the cursor from front-end to back-end without including it in the query for GET request?
  
  
  try {
    const {cursor, sort, category, collection} = event.queryStringParameters;
    
    // No cursor yet, i.e. page 1
    if(cursor === null){
      var res = await sendQuery(GET_PRODUCT_PAGE);
    }
    
    else{
      var res = await sendQuery(GET_PRODUCT_PAGE, {cursor});
    }

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
