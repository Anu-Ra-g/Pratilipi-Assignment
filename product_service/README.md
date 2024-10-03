## Description

This is the directory of `product_service` and code belonging to this service is present here. This service takes care of product management and uses `product_postgres` for storing data. This service exposes a REST API to the `graphql_gateway` for interactions. 
Any time an order is placed in `order_postgres`, the values are updated in `product_postgres`

### Tables in product_postgres
- products

### PORT exposed 
3001

### Endpoints
- `POST /products`              🔒 (ADMIN)
- `PUT /products/:id`           🔒 (ADMIN)
- `GET /products`
- `GET /products/:id` 

**/products**
- This endpoint is used to create a new product. Only *authenticated* users with "ADMIN" role can create a new product
```
mutation CreateProduct {
    createProduct(
        input: { 
            name: "baseball bat", 
            price: 23.88, 
            inventory: 40000000 
        }
    ) {
        id
        name
        price
        inventory
    }
}

```


