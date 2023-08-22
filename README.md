# LSTV-CRUD-TS

This is a web application built using PHP, MySQL, and React Vite for managing employee records.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [PHP](https://www.php.net/downloads.php) installed on your local machine.
- [Node.js](https://nodejs.org/) installed on your local machine.
- [XAMPP](https://www.apachefriends.org/index.html) installed on your local machine to set up an Apache web server and MySQL database.

## Backend Setup
1. Create a user for php-database connection using the following credentials:
   username: 'zero'
   password: '1234'
   host: 'localhost'
2. Create a new database in MySQL named "employeedb".
3. Import the `employeedb.sql` file provided in the repository to set up the required tables.
4. Update the database connection details in `backend/db_connect.php`. Make sure to set the correct hostname, username, password, and database name.

## Frontend Setup

1. Navigate to the `frontend` directory: `cd frontend`.
2. Install dependencies: `npm install`.

## Running the Application


1. Place the entire folder of this code in the `htdocs` directory of your XAMPP installation folder (usually `C:\xampp\htdocs` on Windows).
2. Start the PHP development server using XAMPP: run both Apache and MySQL services.
3. Start the React Vite development server in the `frontend` directory: `npm run dev`.
4. Open your web browser and access `http://localhost:3000` to use the application.
5. Use these credentials to access the system:
   username: 'zero'
   password: '123'

## Note

This project is for application for work  and does not include a license. Use it responsibly and adhere to all relevant laws and regulations.
