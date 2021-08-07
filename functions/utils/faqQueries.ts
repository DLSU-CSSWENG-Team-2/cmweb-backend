const GET_FAQ = `
    query { 
        allFAQCategories { 
            data { 
                _id
                title
                icon
                list
            }
        }
    }
`;

export { GET_FAQ };
