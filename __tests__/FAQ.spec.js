const axios = require("axios");

describe("User story #4 facilitates data flow with regards to Frequently Asked Questions (FAQs).", () => {
  // Making a non get request should return a status 400
  test("The endpoint must reject non GET requests.", async () => {
    let caught = 0;
    let response = null;
    try {
      response = await axios.delete("http://localhost:9000/getFAQ");
    } catch (ex) {
      caught++;
    }
    try {
      response = await axios.post("http://localhost:9000/getFAQ");
    } catch (ex) {
      caught++;
    }
    try {
      response = await axios.put("http://localhost:9000/getFAQ");
    } catch (ex) {
      caught++;
    }
    expect(caught).toEqual(3);
  });

  // Able to get a 200 response
  // Response Data
  response = null;
  test("The get request works and returns a valid response.", async () => {
    response = await axios.get("http://localhost:9000/getFAQ");
    expect(response).not.toEqual(null);
    expect(response.status).toEqual(200);
    expect(response.data).not.toEqual(null);
  });

  test("Should retrieve the correct details (preview image, product name, product price, before cursor, after cursor) for each product from the database.", () => {
    expect(response.data.data).not.toEqual(null);

    // Test every element to see if it is a valid JS object that we are expecting
    response.data.forEach((faq) => {
      expect(faq).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          icon: expect.any(String),
          list: expect.any(Object),
        })
      );
      // the list should be a correct object
      faq.list.forEach((faqEntry) => {
        expect(faqEntry).toEqual(
          expect.objectContaining({
            question: expect.any(String),
            answer: expect.any(String),
          })
        );
      });
    });
  });
});
