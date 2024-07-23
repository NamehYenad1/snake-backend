# Snake Backend API

This is the backend API for the Snake game. It is built with Node.js, Express, and TypeScript, and deployed using Vercel. The API provides endpoints to start a new game and validate the game's state and moves.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
    - [Start a New Game](#start-a-new-game)
    - [Validate Moves](#validate-moves)
- [Development](#development)
  - [Running Locally](#running-locally)
  - [Testing](#testing)
  - [Deployment](#deployment)
- [License](#license)

## Features

- **Start a New Game**: Initialize a new game with a specified width and height for the game board.
- **Validate Moves**: Validate a sequence of moves for the snake to ensure it follows the game rules and reaches the fruit.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript.
- **Vercel**: Deployment platform.
- **Jest**: Testing framework.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **npm**: Node.js package manager, which comes with Node.js.

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/NamehYenad1/snake-backend.git
cd snake-backend
```

2. **Install Dependencies:**

```bash
npm install
```

## Usage

### Endpoints

#### Start a New Game

- **Endpoint**: `/api/game/new`
- **Method**: `GET`
- **Query Parameters**:
  - `w`: Width of the game board
  - `h`: Height of the game board
- **Response**:
  - `200`: JSON marshalled state with randomly generated fruit position
  - `400`: Invalid request
  - `405`: Invalid method
  - `500`: Internal server error

#### Validate Moves

- **Endpoint**: `/api/game/validate`
- **Method**: `POST`
- **Body**:

```json
{
  "gameId": "string",
  "width": "number",
  "height": "number",
  "score": "number",
  "fruit": {
    "x": "number",
    "y": "number"
  },
  "snake": {
    "x": "number",
    "y": "number",
    "velX": "number",
    "velY": "number"
  },
  "ticks": [
    { "velX": "number", "velY": "number" }
  ]
}
```

- **Response**:
  - `200`: Valid state & ticks. Returns JSON marshalled state with new randomly generated fruit position and a score incremented by 1.
  - `400`: Invalid request
  - `404`: Fruit not found, the ticks do not lead the snake to the fruit position
  - `405`: Invalid method
  - `418`: Game is over, snake went out of bounds or made an invalid move
  - `500`: Internal server error

## Development

### Running Locally

**Start the Development Server:**

```bash
npm start
```

- The server will run on `http://localhost:3000`.

### Testing

**Run Tests:**

```bash
npm test
```

- This will run the tests using Jest.

PostMan Tests 
```
1.http://localhost:3000/api/game/new?w=10&h=10
2.http://localhost:3000/api/game/validate
JSON for POST
180 degree turn{
  "gameId": "test",
  "width": 10,
  "height": 10,
  "score": 0,
  "fruit": { 
    "x": 5, 
    "y": 0 
  },
  "snake": { 
    "x": 0, 
    "y": 0, 
    "velX": 1, 
    "velY": 0 
  },
  "ticks": [
    { 
      "velX": 1, 
      "velY": 0 
    }, 
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": -1, 
      "velY": 0 
    }
  ]
}

hit the edge
{
  "gameId": "test",
  "width": 10,
  "height": 10,
  "score": 0,
  "fruit": { 
    "x": 9, 
    "y": 1 
  },
  "snake": { 
    "x": 0, 
    "y": 0, 
    "velX": 1, 
    "velY": 0 
  },
  "ticks": [
    { 
      "velX": 1, 
      "velY": 0 
    }, 
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": 0, 
      "velY": 1 
    },
    { 
      "velX": 1, 
      "velY": 0 
    },
    { 
      "velX": -1, 
      "velY": 0 
    },
    { 
      "velX": 0, 
      "velY": 1 
    }
  ]
}


direct to fruit
{
  "gameId": "test",
  "width": 10,
  "height": 10,
  "score": 0,
  "fruit": { 
    "x": 2, 
    "y": 0 
  },
  "snake": { 
    "x": 0, 
    "y": 0, 
    "velX": 1, 
    "velY": 0 
  },
  "ticks": [
    { 
      "velX": 1, 
      "velY": 0 
    }, 
    { 
      "velX": 1, 
      "velY": 0 
    }
  ]
}
```

## Deployment

This project is deployed using Vercel. The deployment is automated using GitHub Actions.

**Deploying to Vercel:**

- Ensure your Vercel project is correctly linked to your GitHub repository.
- Push changes to the `main` branch to trigger a deployment.


## License

This project is licensed under the MIT License. See the LICENSE file for details.
