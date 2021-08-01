import { Handler } from "@netlify/functions";
import { getUploadURL } from "./config/BackblazeController";

const handler: Handler = async (event, context) => {
  await getUploadURL();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, World!" }),
  };
};

export { handler };
