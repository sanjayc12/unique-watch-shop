# ChronoLux Watch Shop E-commerce

A premium watch shop e-commerce platform built with Spring Boot, React, and MySQL.

## Project Structure
- `backend/`: Spring Boot (Java 21)
- `frontend/`: React (Vite)

## Prerequisites
- Java 21+
- Node.js 18+
- MySQL Server

## Setup Instructions

### 1. Database Setup
- Create a database named `watch_shop_db` in your MySQL server.
- Update `backend/src/main/resources/application.properties` with your MySQL username and password.

### 2. Run Backend
```bash
cd backend
mvn spring-boot:run
```
The backend will automatically seed initial watch data on the first run.

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- Premium UI with glassmorphism and modern aesthetics.
- Responsive product grid.
- Dynamic cart management.
- Backend REST API for product management.
- Automatic database seeding.
