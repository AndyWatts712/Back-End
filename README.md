# Back-End

API hosted at: https://wunderlist-bw820.herokuapp.com/

API - These are the endpoints and required information

### User Endpoints 

| Method | Endpoint           | Need Auth? | Description                            |
| ------ | ------------------ | ---------- | -------------------------------------- |
| POST   | /api/auth/register | No         | Allows users to register an account    |
| POST   | /api/auth/login    | No         | Allows user to login to their account  |
| GET    | /api/users         | Yes        | Returns a list of all users            |
| GET    | /api/users/:id     | Yes        | Returns a specific user by id          |
| PUT    | /api/users/:id     | Yes        | Edits a specific user by id            |
| DELETE | /api/users/:id     | Yes        | Deletes a specific user by id          |


### Lists Endpoints


| Method | Endpoint           | Need Auth? | Description                            |
| ------ | ------------------ | ---------- | -------------------------------------- |
| GET    | /api/lists         | Yes        | Allows users to get all of their lists |
| POST   | /api/lists         | Yes        | Allows user to create a new list       |
| GET    | /api/lists/:id     | Yes        | Returns a specific list by id          |
| PUT    | /api/lists/:id     | Yes        | Edits a specific list by id            |
| DELETE | /api/lists/:id     | Yes        | Deletes a specific list by id          |

### Items Enpoints

***Following table must be prefaced by /api/lists/:id/***

| Method | Endpoint           | Need Auth? | Description                            |
| ------ | ------------------ | ---------- | -------------------------------------- |
| GET    | /tasks             | Yes        | Allows users to get a list of tasks    |
| POST   | /tasks             | Yes        | Allows user to create new tasks        |
| GET    | /tasks/:id         | Yes        | Returns a specific task by id          |
| PUT    | /tasks/:id         | Yes        | Edits a specific task by id            |
| DELETE | /tasks/:id         | Yes        | Deletes a specific task by id          |

## DB SCHEMA

Users Schema

| Field       | Data Type    | Metadata                     |
| ----------- | ------------ | ---------------------------- |
| id          | integer      | Primary Key, auto-increments |
| username*   | string(56)   | none                         |
| email*      | string(255)  | Unique                       |
| password*   | string       | none                         |
| time        | timestamps   | Auto-generated, create/update|

Lists Schema

| Field    | Data Type     | Metadata                     |
| -------- | ------------- | ---------------------------- |
| id       | integer       | Primary Key, auto-increments |
| name*    | varchar (255) | none                         |
| type_id* | integer (FK)  | 1=todo,2=work,3=shopping     |
| user_id  | integer (FK)  | Will be set by endpoint      |

Items (Tasks) Schema

| Field        | Data Type     | Metadata                     |
| ------------ | ------------- | ---------------------------- |
| id           | integer       | Primary Key, auto-increments |
| name*        | varchar (255) | none                         |
| completed    | boolean       | defaults to false            |
| complete_by  | date          | not required (YYYY-MM-DD)    |
| list_id*     | integer (FK)  | set at time of creation      |

### Items marked with * are required
