# Promptpedia

Welcome to Promptpedia, a creative platform for discovering, creating, and sharing AI prompts. This web application leverages Next.js for its frontend, MongoDB for data storage, the GeminiAI API for tag generation, and Tailwind CSS for styling.

## Table of Contents
- [Website](#website-link)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Website Link
https://promptpedia404.vercel.app/ 

## Features

### 1. Profile
- View all your posts.
- Edit or delete your posts.

### 2. Feed
- View all posts from the community.

### 3. Search
- Search by content, tag, or username.
- Filter posts by tags.

### 4. GeminiAI Integration
- Generate creative prompts and tags for your posts.

### 5. Other Profiles
- View other users' profiles.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Gemini AI API](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/promptpedia.git
   cd promptpedia
2. Install dependencies:
   ```bash
   npm install
3. Configuration
   ```env
    GOOGLE_ID=YOUR_GOOGLE_ID  
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET  
    MONGODB_URI=YOUR_MONGODB_URI  

    NEXTAUTH_URL=YOUR_NEXTAUTH_URL  
    NEXTAUTH_URL_INTERNAL=YOUR_NEXTAUTH_URL_INTERNAL  
    NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET  
4.  Usage: 
    ```bash
    npm run dev
5.  View:
Open your browser and navigate to http://localhost:3000.