const axios = require("axios");

describe("User story #4 facilitates data flow with regards to Frequently Asked Questions (FAQs).", () => {
  // Making a non get request should return a status 400

  // Able to get a 200 response
  // Response Data
  let response = null;
  test("The get request works and returns a valid response.", async () => {
    response = await axios.get("http://localhost:9000/getFAQ");
    expect(response).not.toEqual(null);
    expect(response.status).toEqual(200);
    expect(response.data).not.toEqual(null);
  });
});
