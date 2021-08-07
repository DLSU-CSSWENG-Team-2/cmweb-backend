const axios = require("axios");

/**
 * For this test suite, we need to check for all the test cases for user story 2
 */
describe("User story #2 retrieves products from FaunaDB then returns it as an HTTP response.", () => {
  // Making a non get request should return a status 400
  test("The endpoint must reject non GET requests.", async () => {
    let caught = 0;
    let response = null;
    try {
      response = await axios.delete("http://localhost:9000/getProducts");
    } catch (ex) {
      caught++;
    }
    try {
      response = await axios.post("http://localhost:9000/getProducts");
    } catch (ex) {
      caught++;
    }
    try {
      response = await axios.put("http://localhost:9000/getProducts");
    } catch (ex) {
      caught++;
    }
    expect(caught).toEqual(3);
  });

  // Page 1 of shop
  var response = null;
  test("The get request works and returns a valid response.", async () => {
    response = await axios.get("http://localhost:9000/getProducts");
    expect(response).not.toEqual(null);
    expect(response.status).toEqual(200);
    expect(response.data).not.toEqual(null);
  });

  test("The number of products should be less than or equal to 8.", async () => {
    expect(response.data.data.length <= 8);
    //console.log(response.data.data.length)
  });

  test("Should retrieve the correct details (preview image, product name, product price, before cursor, after cursor) for each product from the database.", () => {
    expect(response.data.data).not.toEqual(null);

    // Test every element to see if it is a valid JS object that we are expecting
    response.data.data.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          slug: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
          mainImage: expect.any(String),
        })
      );
      // expect before and after cursor
      expect(product.mainImage).toMatch(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      );
    });

    // Must contain the after & before field, can be null or String
    expect(response.data.after).toBeDefined();
    expect(response.data.before).toBeDefined();
  });

  // Pagination test: next page and check EVERY page
  // Tests from first page to last page
  test("Should successfully retrieve the NEXT page of products successfully", async () => {
    // Next page available
    while (response.data.after !== null) {
      //cursor = response.data.after
      response = await axios.get(
        `http://localhost:9000/getProducts?cursor=${response.data.after}`
      );

      // Number of products <= 8
      expect(response.data.data.length <= 8);

      expect(response.data.data).not.toEqual(null);

      // Test every element to see if it is a valid JS object that we are expecting
      response.data.data.forEach((product) => {
        expect(product).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            slug: expect.any(String),
            name: expect.any(String),
            price: expect.any(Number),
            mainImage: expect.any(String),
          })
        );

        expect(product.mainImage).toMatch(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        );
      });

      // Must contain the after & before field, can be null or String
      expect(response.data.after).toBeDefined();
      expect(response.data.before).toBeDefined();
    }
  });

  // Pagination test: previous page and check EVERY page
  // Tests from last page to first page
  test("Should successfully retrieve the PREVIOUS page of products successfully", async () => {
    // Previous page available
    while (response.data.before !== null) {
      response = await axios.get(
        `http://localhost:9000/getProducts?cursor=${response.data.before}`
      );

      // Number of products <= 8
      expect(response.data.data.length <= 8);

      expect(response.data.data).not.toEqual(null);

      // Test every element to see if it is a valid JS object that we are expecting
      response.data.data.forEach((product) => {
        expect(product).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            slug: expect.any(String),
            name: expect.any(String),
            price: expect.any(Number),
            mainImage: expect.any(String),
          })
        );

        expect(product.mainImage).toMatch(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        );
      });

      // Must contain the after & before field, can be null or String
      expect(response.data.after).toBeDefined();
      expect(response.data.before).toBeDefined();
    }
  });
});
