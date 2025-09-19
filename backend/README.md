# Backend Documentation

This document provides a detailed overview of the backend for the Career Guidance Platform.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Profile](#profile)
  - [Assessment](#assessment)
  - [Colleges](#colleges)
- [Data Storage](#data-storage)
- [Running the Application](#running-the-application)

## Getting Started

### Prerequisites

- Python 3.x
- `pip` (Python package installer)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>/backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the dependencies:**
    ```bash
    pip install Flask Flask-Cors
    ```

## Backend Structure

```
backend/
├── main.py           # Main application file with all the API endpoints
└── venv/             # Virtual environment directory
```


## API Endpoints

The base URL for all the endpoints is `/`.

### Authentication

- `POST /api/register`**: Registers a new user.
  - **Request Body**: `{ "email": "<user-email>", "password": "<user-password>" }`
  - **Response**:
    - `201 Created`: `{ "message": "User registered successfully" }`
    - `400 Bad Request`: `{ "error": "User already exists" }`

- **`POST /api/login`**: Logs in a user.
  - **Request Body**: `{ "email": "<user-email>", "password": "<user-password>" }`
  - **Response**:
    - `200 OK`: `{ "message": "Login successful", "user": { "email": "<user-email>" } }`
    - `401 Unauthorized`: `{ "error": "Invalid credentials" }`
  - **Note**: Currently, this endpoint has a hardcoded user (`test@example.com` with password `password`).

### Profile

- **`GET /api/profile`**: Retrieves the user's profile.
  - **Response**: `{ "name": "...", "education": "...", ... }`
  - **Note**: This endpoint currently uses a hardcoded user (`test@example.com`).

- **`POST /api/profile`**: Creates or updates a user's profile.
  - **Request Body**: `{ "name": "...", "education": "...", ... }`
  - **Response**: `200 OK`: `{ "message": "Profile updated successfully" }`
  - **Note**: This endpoint currently uses a hardcoded user (`test@example.com`).

### Assessment

- **`GET /api/assessment/questions`**: Retrieves assessment questions.
  - **Query Parameters**: `user_type` (e.g., `10th`, `12th`, `ug`). Defaults to `10th`.
  - **Response**: A JSON object containing questions for the specified user type.

- **`POST /api/assessment/submit`**: Submits assessment answers.
  - **Request Body**: The user's answers to the assessment questions.
  - **Response**: A mock result with career, course, and college recommendations.

### Colleges

- **`GET /api/colleges`**: Retrieves a list of all colleges.
  - **Query Parameters**: `search` (e.g., `?search=delhi`).
  - **Response**: A list of college objects. If a search query is provided, it returns a filtered list.

- **`GET /api/colleges/<int:college_id>`**: Retrieves details of a specific college.
  - **Response**:
    - `200 OK`: A college object.
    - `404 Not Found`: `{ "error": "College not found" }`

## Data Storage

For demonstration purposes, the backend uses in-memory Python dictionaries to store data for users, profiles, colleges, and assessment questions. This data is not persistent and will be lost when the application restarts. In a production environment, this would be replaced with a database like PostgreSQL, MySQL, or MongoDB.

## Running the Application

To run the backend server, make sure you are in the `backend` directory and your virtual environment is activated. Then, run the following command:

```bash
python main.py
```

The application will start in debug mode on `http://127.0.0.1:5000`.
