import faunaRequest from "../config/FaunaAxiosConfig";
require(`dotenv`).config();

/**
 * Takes in GQL query and variables (if any). Sends query to Fauna
 * @param query String GQL query
 * @param variables Object containing variables
 */
export = async (query: String, variables: Object) => {
    try{
        const res = await faunaRequest.post("", {query, variables});
        return res.data.data;

    }catch (err){
        console.error(err);
        throw new Error(`Something went wrong when sending the query`);    
    }
}