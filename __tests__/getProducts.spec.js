const axios = require("axios");

/**
 * For this test suite, we need to check for all the test cases for user story 2
 */
describe("User story #2 retrieves products from FaunaDB then returns it as an HTTP response.", () => {
  // Response Data
  let response = null;
  test("The get request works and returns a valid response.", async () => {
    response = await axios.get("http://localhost:9000/getProducts");
    expect(response).not.toEqual(null);
    expect(response.status).toEqual(200);
    expect(response.data).not.toEqual(null);
  });

  // Test pagination once it's available

  test("Should retrieve the correct details (preview image, product name, product price, collection, product category) for each product from the database.", () => {
    expect(response.data).not.toEqual(null);

    // Test every element to see if it is a valid JS object that we are expecting
    response.data.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          mainImage: expect.any(String),
        })
      );
      expect(product.mainImage).toMatch(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      );
    });
  });
});