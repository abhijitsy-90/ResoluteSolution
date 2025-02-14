Simple Blog API

Description
This is a RESTful API built using Node.js and Express.js for a simple blog application. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts.

Features
- Create, read, update, and delete blog posts.
- Uses a JavaScript array to store blog post data (no database required).
- Validation for required fields (title and content).
- Error handling with appropriate HTTP status codes.
- Basic authentication for secure operations.
- Unit tests for API endpoints.
- Pagination.

API Endpoints

Get all blog posts
GET `/posts`
- Returns a JSON response with a list of all blog posts.

Get a single blog post
GET `/posts/:id`
- Returns a JSON response with a specific blog post by its ID.

Create a new blog post
POST`/posts`
- Request Body (JSON):
  ```json
  {
    "title": "Sample Blog Post",
    "content": "This is a sample blog post.",
    "author": "John Doe"
  }
  ```
- Returns the created blog post.
Update a blog post
**PUT** `/posts/:id`
- Request Body (JSON):
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content."
  }
  ```
- Returns the updated blog post.

Delete a blog post
**DELETE** `/posts/:id`
- Deletes the specified blog post.
- Returns a success message.

Validation
- Ensures required fields (`title`, `content`) are provided when creating or updating a post.
- Returns error messages with appropriate status codes.

Setup Instructions
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd resolutionassignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

##Authentication (Optional)
- Implement basic authentication using tokens or API keys.
- Only authenticated users can create, update, and delete posts.


Deployment (Optional)
- Deploy to a cloud platform like render.com.

Bonus Features (Optional)
- Implement pagination for the list of blog posts.



---
Happy coding! 🚀

