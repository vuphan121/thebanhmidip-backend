# The Banh Mi Dip Backend

This is the backend server for **The Banh Mi Dip** project, built with **TypeScript** and **Express**.  
It provides REST API endpoints to fetch articles, article images, and issue data.

---

## Setup

Clone the project:

```bash
git clone https://github.com/vuphan121/thebanhmidip-backend.git
cd thebanhmidip-backend
```

Install dependencies:

```bash
npm install
npm install typescript --save-dev
```

---

## Running the Server

### Option 1: Compile then run

Compile TypeScript to JavaScript:

```bash
npx tsc
```

Run the compiled server:

```bash
node dist/server.js
```

### Option 2: Run directly with ts-node (development mode)

```bash
npx ts-node src/server.ts
```

The server runs on **http://localhost:3001** by default.

---

# API Documentation

## Get All Articles

**Endpoint:** `GET /api/articles`  
**Description:** Retrieves a list of all articles.

**Example:**

```bash
curl http://localhost:3001/api/articles
```

**Response:**

```json
[
  {
    "id": "1",
    "title": "Article Title",
    "content": "Article content..."
  },
  {
    "id": "2",
    "title": "Another Article",
    "content": "More content..."
  }
]
```

---

## Get Article by ID

**Endpoint:** `GET /api/articles/:id`  
**Description:** Retrieves a single article by its `id`.

**Example:**

```bash
curl http://localhost:3001/api/articles/1
```

**Response (Success):**

```json
{
  "id": "1",
  "title": "Article Title",
  "content": "Article content..."
}
```

**Response (Not Found):**

```json
{
  "error": "Article not found"
}
```

---

## Get Article Image

**Endpoint:** `GET /api/article-image/:filename`  
**Description:** Retrieves the image associated with an article by filename.

**Example:**

```bash
curl http://localhost:3001/api/article-image/example.jpg --output example.jpg
```

**Response:**  
Binary image data with the correct `Content-Type` (e.g., `image/jpeg`).

**Response (Error):**

```json
"Failed to retrieve image"
```

---

## Get Issue by Article ID

**Endpoint:** `GET /api/issues/:id`  
**Description:** Retrieves the issue details and related articles for a given article ID.

**Example:**

```bash
curl http://localhost:3001/api/issues/1
```

**Response (Success):**

```json
{
  "intro": "Issue introduction text",
  "articles": [
    {
      "id": "1",
      "title": "Article Title"
    },
    {
      "id": "2",
      "title": "Another Article"
    }
  ]
}
```

**Response (Not Found):**

```json
{
  "error": "No issue found for this article"
}
```

**Response (Internal Server Error):**

```json
{
  "error": "Internal server error"
}
```
ect is open-source and available under the [MIT License](LICENSE).
