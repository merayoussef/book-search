import gql from 'graphql-tag';

export const QUERY_ME = gql `
{
me {
    _id
    username
    email
    bookCount
    savedBooks {
    _id
    author
    description
    title
    image
    link
    }
}
}

`;