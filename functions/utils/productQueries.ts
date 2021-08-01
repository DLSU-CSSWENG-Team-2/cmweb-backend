// For view-all-products in shop feature
const GET_ALL_PRODUCTS: String = `
    query{
        allProducts{
            data{
                name
                price
                mainImage
            }
        }
    }
`;

export {
    GET_ALL_PRODUCTS
}