import gql from 'graphql-tag';

export const LOGIN_USER = gql `
mutation loginUser($email: String!, $password: String!) {
login(email: $email, password: $password) {
    token
    user {
    _id
    username
    }
}
}
`;

export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
addUser(username: $username, email: $email, password: $password) {
    token
    user {
    _id
    username
    }
}
}
`;

// export const SAVE_BOOK = gql `
// mutation saveBook($id: ID!) {
// saveBook(author: String!, description: String!, title: String!, bookId: ID!, image: String, link: String) {
//     author
//     description
//     title
//     bookId
//     image 
//     link
// }
// }
// `;

export const REMOVE_BOOK = gql `
mutation removeBook($id: ID!) {
removeBook(id: $id) {
    _id
    username
    book {
    _id
    username
    }
}
}
`;