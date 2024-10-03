## Description

This is the directory of `order_service` and code belonging to this service is present here. This service takes care of order processing and uses `order_postgres` for storing data. This service exposes a REST API to the `graphql_gateway` for interactions.
Any time a new product is added or updated in `product_postgres`, the values are updated in `order_postgres`

### Tables in order_postgres
- catalog (values from `product_postgres`)
- orders

### PORT exposed 
3002

### Endpoints
- `POST /orders`              🔒 (ADMIN or USER)
- `GET /orders`
- `GET /orders/:id` 

**/products**
- This endpoint is used to places a new order. Only *authenticated* users with "ADMIN" or "USER" role can place a new order
```
mutation PlaceOrder {
    placeOrder(
        input: { 
            productid: "1", 
            quantity: 500 
            }
        ) {
        id
        userid
        productid
        quantity
        totalprice
    }
}

```



