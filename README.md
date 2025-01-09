# Alerting System for Monitoring Failed POST Requests
## This project is a backend alerting system designed to monitor and log failed POST requests, track IP addresses exceeding a failure threshold, and send email notifications for potential unauthorized activities.

Features
Failed Request Tracking: Logs failed POST requests due to invalid headers or tokens.
IP Threshold Monitoring: Tracks failed requests from each IP within a configurable time window.
Email Notifications: Sends alerts via email when the failure threshold is exceeded.
Metrics API: Exposes an endpoint to fetch metrics for analysis.

## Tech Stack
Node.js with Express.js for the backend server.
MongoDB for storing logs and tracking failures.
Nodemailer for email notifications.
dotenv for environment variable management.

# Installation
## 1. Clone the Repository

git clone https://github.com/your-username/alerting-system.git
cd alerting-system

## 2. Install Dependencies

npm install
## 3. Configure Environment Variables
Create a .env file in the root directory and add the following:

MONGO_URI=mongodb://localhost:27017/alerting-system
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-email-password
## 4. Start the Server

npm start
The server will run at http://localhost:4000.
