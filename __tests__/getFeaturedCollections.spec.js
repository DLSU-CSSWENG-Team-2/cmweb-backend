const axios = require("axios");

describe("User story #1 retrieves featured product collections from FaunaDB then returns it as an HTTP response.", () => {
  // Making a non get request should return a status 400
  test("The endpoint must reject non GET requests.", async () => {
    let caught = 0;
    let response = null;
    try {
      response = await axios.delete(
        "http://localhost:9000/getFeaturedCollections"
      );
    } catch (ex) {
      caught++;
    }
    try {
      response = await axios.post(
        "http://localhost:9000/getFeaturedCollections"
      );
    } catch (ex) {
      caught++;
    }
    try {
      response = await axios.put(
        "http://localhost:9000/getFeaturedCollections"
      );
    } catch (ex) {
      caught++;
    }
    expect(caught).toEqual(3);
  });

  // Response Data
  let response = null;
  test("The GET request works and returns a valid response.", async () => {
    response = await axios.get("http://localhost:9000/getFeaturedCollections");
    expect(response).not.toEqual(null);
    expect(response.status).toEqual(200);
    expect(response.data).not.toEqual(null);
  });

  // Test pagination once it's available

  test("Should retrieve the correct collection details from the database.", () => {
    expect(response.data).not.toEqual(null);

    // Test every element to see if it is a valid JS object that we are expecting
    response.data.forEach((collection) => {
      expect(collection).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
        })
      );
    });
  });
});
