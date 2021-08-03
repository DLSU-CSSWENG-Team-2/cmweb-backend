/**
 * For getting all collections.
 */
 const GET_ALL_COLLECTIONS: string = `
 query{
     allCollections{
         data{
             _id
             name
             description
         }
     }
 }
`

/**
* For getting collection array, either featured or not featured depending on input.
* To be used in dashboard when showcasing certain collections.
*/
const GET_FEATURED_COLLECTIONS: string = `
    query getFeaturedCollections($featured: Boolean){
        collections(featured: $featured){
            data{
                _id
                name
                description
                products(_size:1){
                    data{
                        mainImage
                    }
                }
            }
        }
    }
`

export { 
    GET_ALL_COLLECTIONS,
    GET_FEATURED_COLLECTIONS,
};