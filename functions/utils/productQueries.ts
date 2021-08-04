/**
 * For view-all-products in shop feature
 */ 
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

const GET_PRODUCT_PAGE: string = `
    query getProductPage($cursor: String){
        allProducts(_size :8, _cursor: $cursor){
            data{
                _id
                name
                price
                mainImage
            }
            before
            after
        }
    }
`


export { 
    GET_ALL_PRODUCTS,
    GET_PRODUCT_PAGE
};
