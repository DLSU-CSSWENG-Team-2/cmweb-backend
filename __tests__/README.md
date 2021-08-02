## Unit Testing Using JestJS

Unit testing with JestJS will be done via API calls to the exposed endpoint of the Netlify serverless functions.

For each endpoint created, a corresponding JestJS test specification must be defined in the `__test__` directory. The format for the test specification is as follows:

This is a sample specification lifted from the helloWorld endpoint to test if a connection can be made. The specification can be found [here](./connection.spec.js).

```
const axios = require('axios');

describe("The Hello World Endpoint", () => {
  test("It is supposed to expose the helloWorld endpoint for conenctivity testing purposes.", async () => {
    const responseData = await axios.get("http://localhost:9000/helloWorld");
    expect(responseData.status).toEqual(200);
    expect(responseData.statusText).toEqual("OK");
    expect(responseData.data.message).toEqual("Hello, World!");
  });
});
```

Read up more on the documentation for Jest to figure out the available test methods we can use. There should be some for time optimization, memory optimization, as well as type-checking.

For our specific use-case in this project, there should be at least one test specification for each user story. Each specification must have at least one test to fulfill each acceptance criteria accompanied by test cases to test the integrity of the implementation.
