const axios = require(`axios`);
require(`dotenv`).config();

/**
 * Takes in GQL query and variables (if any). Sends query to Fauna
 * @param query String GQL query
 * @param variables Object containing variables
 */
export = async (query: String, variables: Object) => {
    const {data: { data, errors }} = await axios({
        url: `https://graphql.fauna.com/graphql`,
        method: `POST`,
        headers: {
            Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`
        },
        data: {
            query,
            variables,
        },
    });

    if(errors) {
        console.error(errors);
        throw new Error(`Something went wrong when sending the query`);
    }

    return data;
}