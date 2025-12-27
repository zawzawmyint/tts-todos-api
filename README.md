# TTS Todos API

A robust RESTful API for managing todos, built with Node.js, Express, and PostgreSQL. This project features secure user authentication and a comprehensive todo management system.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality powered by [Better Auth](https://www.better-auth.com/).
- **Todo Management**: Full CRUD (Create, Read, Update, Delete) operations for todos.
- **Categorization & Prioritization**: Organize todos with categories (e.g., WORK) and priority levels (LOW, MEDIUM, HIGH).
- **User-Centric Design**: All data is scoped to the authenticated user.
- **RESTful Architecture**: Follows standard REST principles with JSON responses.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Language**: JavaScript (ES Modules)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v18+ recommended)
- PostgreSQL

## Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/zawzawmyint/tts-todos-api.git
    cd tts-todos-api
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**

    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

    Or manually create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=3001
    DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"
    BETTER_AUTH_SECRET="your_generated_secret_key"
    BETTER_AUTH_URL="http://localhost:3001" # Base URL of your API
    NODE_ENV="development"
    ```

    _Note: Replace the placeholders with your actual database credentials and secrets._

4.  **Run Database Migrations**

    Apply the Prisma schema to your PostgreSQL database:

    ```bash
    npm run prisma:migrate
    ```

## Running the Application

- **Development Mode** (with hot-reloading):

  ```bash
  npm run dev
  ```

- **Production Mode**:

  ```bash
  npm start
  ```

The server will start on `http://localhost:3001` (or the port specified in your `.env`).

## API Documentation

- **Base URL**: `/api`
- **Health Check**: `GET /`

### Key Endpoints

- **Auth**: `/api/auth/*` (Handled by Better Auth)
- **Users**: `/api/users`
- **Todos**: `/api/todos`
