const { gql } = require('apollo-server-express');


const typeDefs = gql `
type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(author: String!, description: String!, title: String!, bookId: ID!): User
    removeBook(bookId: ID!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID,
    authors: [author],
    description: String,
    title: String,
    image,
    link
}

Type Auth {
    token: ID!
    user: User   
}
`;

module.exports = typeDefs;