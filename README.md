<div align="center">

<h1>Tasks Server</h1>

<p>Restfull API developed as part of the application for the position of back-end developer at <a  href="https://niteki.co.mz/corporate"  target="_blank">@Niteki</a></p>

<div>
<img src="https://img.shields.io/badge/version-1.3.0-blue.svg"  alt="Version 1.0.3" />
</div>
</div>

## Brief Note

This api was developed as part of the job application for NodeJS Developer at [@Niteki](https://niteki.co.mz/corporate) but you can use it for other purposes if you so wish!

## Requirements

To run this API, you need to have installed [Nodejs v18 (or above)](https://nodejs.org/), [yarn v1.22 (or above)](https://yarnpkg.com/) or any other Node.js dependency manager

# Getting Started - Server setup

> Note: You can skip installation steps and use [niteki-api-tasks.onrender.com](https://niteki-api-tasks.onrender.com) as base url.

1. Clone this repository using the command:

```bash

git clone git@github.com:nairo-mudumane/api-tasks.git

```

2. In the root directory of the repository, install all necessary dependencies using the following command

```bash

yarn install

```

3. Proceed with compiling the code for the production environment using the following command

```bash

yarn build

```

4. finally run the http server initialization command

```bash

yarn start

```

### Note: The server will only work correctly if all environment variables are defined in the .env file (at the root of the project)

# Available Routes

## Authentication

### New account

```js
// Method:
POST
// URL
http://localhost:{port}/accounts/auth/signup/
// Payload
{
  "name": string,
  "email": string,
  "password": string,
}
```

### Login to an existing account

```js
// Method:
POST
// URL
http://localhost:{port}/accounts/auth/login/
// Payload
{
  "email": string,
  "password": string,
}
```

## Tasks

### New task

```js
// Method:
POST
// URL
http://localhost:{port}/tasks/
// headers
{
  "Content-Type": "application/json",
  "authorization": "Niteki {token}",
}
// payload
{
 "category": string,
  "name": string,
  "completeAt": Date, // optional
  "description": string // optional
}
```

### List all your tasks

> Tasks are listed in the following descending order:
>
> 1. All that have the most recent date to complete, in descending order

```js
// Method:
GET
// URL
http://localhost:{port}/tasks/
// headers
{
  "authorization": "Niteki {token}",
}
```

#### you can filter tasks as follows:

```js
// Method:
GET
// URL
http://localhost:{port}/tasks?category={encoded%20category%20name}&is_done=1
// headers
{
  "authorization": "Niteki {token}",
}
```

### list by key

**You can list by task ID or by task name**

> **Note**: If you are going to post by the name of the task, it is advisable to make the URL encode the name

```js
// Method:
GET
// URL
http://localhost:{port}/tasks/{_id%20or%20name}
// headers
{
  "authorization": "Niteki {token}",
}
```

### Toggle status

**Use this endpoint to toggle task state**

```js
// Method:
PUT
// URL
http://localhost:{port}/tasks/{_id%20or%20name}/status
// headers
{
  "Content-Type": "application/json",
  "authorization": "Niteki {token}",
}
// payload
{
 "isDone": boolean,
}
```

### Update by key

**Use this endpoint to update task**

```js
// Method:
PATCH
// URL
http://localhost:{port}/tasks/{_id%20or%20name}
// headers
{
  "Content-Type": "application/json",
  "authorization": "Niteki {token}",
}
// payload
{
  "name": string, // optional
  "category": string, // optional
  "completeAt": Date, // optional
  "description": string, // optional
}
```

### Delete by key

**Use this endpoint to delete a task**

```js
// Method:
DELETE
// URL
http://localhost:{port}/tasks/{_id%20or%20name}
// headers
{
  "Content-Type": "application/json",
  "authorization": "Niteki {token}",
}
// payload
{
  "tasks": {_id%20or%20name}
  // "tasks": [{_id%20or%20name}] // For more than one task
}
```
