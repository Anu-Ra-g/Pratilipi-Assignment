const { gql } = require('@apollo/server');

const typeDefs = `
    type User {
        id: ID!
        name: String
        email: String
    }

    type Product {
        id: ID!
        name: String
        price: Float  
        inventory: Int  
    }
    
    type Order {
        id: ID!
        userid: ID!
        productid: ID!
        quantity: Int  
        totalprice: Float  
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
        role: String!
    }

    input LoginInput{
        email: String!
        password: String!
    }

    input ProductInput {
        name: String!
        price: Float!
        inventory: Int!
    }
    
    input OrderInput {
        productid: ID!
        quantity: Int!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        products: [Product]
        product(id: ID!): Product
        orders: [Order]
        order(id: ID!): Order
    }

    type Mutation {
        signup(input: RegisterInput!): User  
        login(input: LoginInput!): String  
        createProduct(input: ProductInput!): Product  
        placeOrder(input: OrderInput!): Order  
    }
`;

module.exports = typeDefs;
