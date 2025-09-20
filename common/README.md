# Common types for both backend and frontend

## Schemas

### User Registeration

```
name: string, min length 6
email: string, email
password: string, min length 6
```

### User Login

```
email: string, email
password: string, min length 6
```

### User Deletion

```
email: string, email
```

### Blogpost Input

```
title: string, min length 6
content: string
thumbnail: string, url
```
