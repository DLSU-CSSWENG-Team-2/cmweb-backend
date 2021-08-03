// For view-all-products in shop feature
const GET_ALL_PRODUCTS: string = `
    query{
        allProducts{
            data{
                _id
                name
                price
                mainImage
            }
        }
    }
`;

export { GET_ALL_PRODUCTS };
