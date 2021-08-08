const GET_FAQ = `
    query { 
        allFAQCategories { 
            data { 
                _id
                title
                icon
                list {
                    data { 
                        question
                        answer
                    }
                }
            }
        }
    }
`;

const GET_QUESTION = `
    query getFAQuestion($id: String) {
        findFAQuestionByID(id: $id) {
            question
            answer
        }
    }
`;

export { GET_FAQ, GET_QUESTION };
