const axios = require("axios");

describe("The Hello World Endpoint", () => {
  test("It is supposed to expose the helloWorld endpoint for conenctivity testing purposes.", async () => {
    const responseData = await axios.get("http://localhost:9000/helloWorld");
    expect(responseData.status).toEqual(200);
    expect(responseData.statusText).toEqual("OK");
    expect(responseData.data.message).toEqual("Hello, World!");
  });
});
