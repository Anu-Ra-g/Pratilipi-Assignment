const axios = require('axios');
require('dotenv').config();

const USER_URL = process.env.USER_URL;
const PRODUCT_URL = process.env.PRODUCT_URL;
const ORDER_URL = process.env.ORDER_URL;


const resolvers = {
    Query: {
        users: async () => {
            const response = await axios.get(`http://${USER_URL}/auth/users`);
            return response.data;
        },
        user: async (_, { id }) => {
            const response = await axios.get(`http://${USER_URL}/auth/users/${id}`);
            return response.data;
        },
        products: async () => {

            const response = await axios.get(`http://${PRODUCT_URL}/products`);

            return response.data;
        },
        product: async (_, { id }) => {

            const response = await axios.get(`http://${PRODUCT_URL}/products/${id}`);            
            return response.data;
        },
        orders: async () => {
            const response = await axios.get(`http://${ORDER_URL}/orders`);
            return response.data;
        },
        order: async (_, { id }) => {
            const response = await axios.get(`http://${ORDER_URL}/orders/${id}`);
            return response.data;
        },
    },
    Mutation: {
        signup: async (_, { input }) => {
            const { name, email, password, role } = input;
            const response = await axios.post(`http://${USER_URL}/auth/signup`, { name, email, password, role });
            return response.data;
        },
        login: async (_, { input }) => {
            const { email, password } = input;
            const response = await axios.post(`http://${USER_URL}/auth/login`, { email, password });

            // api gateway handles the authentication by storing the token in token variable
            token = response.data;
            
            return response.data;
        },
        createProduct: async (_, { input }) => {
            const { name, price, inventory } = input;
            const response = await axios.post(`http://${PRODUCT_URL}/products`, { name, price, inventory }, {
                headers: {
                    'Authorization': token  
                }
            });

            return response.data;
        },
        placeOrder: async (_, { input }) => {
            const { productid, quantity } = input;
            const response = await axios.post(`http://${ORDER_URL}/orders`, { productid, quantity }, {
                headers: {
                    'Authorization': token  
                }
            });
            return response.data;
        }
    },
};

module.exports = resolvers;
