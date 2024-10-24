# Investment Tracking Application

This is a simple investment tracking application built using Next.js, Prisma, and TanStack Query (React Query). The application allows users to track their investments and calculate totals. It supports authentication and provides features like CSV export.

## Features
1. Track investments (name, quantity, buy price, current price).
2. Authentication using NextAuth.js.
3. Real-time updates of aggregated investment data.
4. Export investments to CSV.
5. Persistent data with PostgreSQL using Prisma ORM.
6. Allow users to edit the table inline (e.q. quantity)

## Prerequisites
Before setting up the application, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm (version 7 or higher)
- PostgreSQL (local or cloud instance)
- Docker (optional, if using Docker to run the application)

## Local Setup Instructions

### 1. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 2. Set Up PostgreSQL Database
Make sure you have PostgreSQL running on your local machine or a cloud service. You need to create a database for the project.

Example (using psql CLI):
```bash
createdb investment_tracker
```

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following configuration. Replace <your_database_url> with your actual PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port><dbname>schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```
### 4. Set Up Prisma
Generate the Prisma client and run migrations to set up your database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Running the Application
After setting up the environment, run the application locally:

```bash
npm run dev
```

Your application should now be running on http://localhost:3000.

### 6. User Registration
Users can create an account by visiting the sign-up page at /auth/signup. To create a new account:

Navigate to http://localhost:3000/auth/signup in your browser.
Fill out the registration form with your email, password, and other necessary details.
After submitting the form, you will be redirected to the login page where you can log in and start tracking your investments.

### 7. Using Docker (Optional)
If you prefer to use Docker for running the application, follow these steps:

Build the Docker image:

```bash
docker build -t investment-tracker .
```

Run the application with Docker:

```bash
docker run -p 3000:3000 investment-tracker
```

### 8. Access the Application
Once the app is running, you can access it by navigating to http://localhost:3000 in your browser.