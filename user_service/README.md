## Description

This is the directory of `user_service` and code belonging to this service is present here. This service takes care of user management and uses `user_postgres` for storing data. This service exposes a REST API to the `graphql_gateway` for interactions. 

### Tables in user_postgres
- users

### PORT exposed 
3000

### Endpoints
- `POST /auth/signup`  
- `POST /auth/login`  
- `GET /auth/users`
- `GET /auth/users/:id` 

**/auth/signup**
- This endpoint is used to create a new user. It accepts a JSON payload with the following fields
```
mutation Signup {
    signup(
        input: {
            name: "anurag"
            email: "nab@gmail.com"
            password: "23423r0f8fw"
            role: "ADMIN"   // or "USER"
        }
    ) {
        name
        email
        id
    }
}

```

**/auth/signup**
- This endpoint is used to login user. It accepts a JSON payload with the following fields and returns a JWT token
```
mutation Login {
    login(
        input: { 
            email: "nab@gmail.com", 
            password: "23423r0f8fw" 
            }
        )
}

```

