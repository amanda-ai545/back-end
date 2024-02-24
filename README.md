# Back-end Project

This is the back-end project for the POC: Reqres (front-end) application. It provides APIs for managing users.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)
- [Endpoints](#endpoints)

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd back-end

# Install dependencies using NPM
npm install
```

## Development

```bash
# Start the development server:
npm run dev
```

The server will be accessible at http://localhost:8181.

## Testing

```bash
# Run tests:
npm run test
```

## Endpoints

### Users

- GET /users?page=1: Get a list of all users.
- POST /users/create: Create a new user.
  - Request body should contain the following information:
    ```bash
    {
      "name": "Jane",
      "job": "Software Engineer"
    }
    ```
- GET /users/:id: Get details of a specific user.
