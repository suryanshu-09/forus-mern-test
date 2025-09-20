# Backend for the blog website

## Routes

### User Routes

```
POST /user/register - to register the user
POST /user/login - to login and authenticate with jwt
DELETE /user - to delete the user
```

### Blog Routes

```
GET /api/posts - get all posts of a user
GET /api/posts/:id - get a particular post with id
POST /api/posts - create a post
PUT /api/posts/:id - update a post
DELETE /api/posts/:id - delete a post
```

## Features

- **jwt** for authentication
- zod for type safety
