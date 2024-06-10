# Web Application for Audio Transcription, Summarization, and Text-to-Speech

## Introduction

This web application allows users to upload audio files, transcribe them, summarize the transcriptions and convert summaries to speech.

## Features

- **Upload Audio File**: Users can upload audio files for processing.
- **Transcribe Audio**: Converts audio content into text.
- **Summarize Transcription**: Summarizes the textual content from transcriptions.
- **Text-to-Speech**: Converts text summaries into audible speech.

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **APIs**: OpenAI API
- **File Upload Handling**: `express-fileupload`
- **Path Management**: `path` module
- **Database**: SQLite for lightweight storage
- **Asynchronous Handling**: `async`/await

## Decisions and Rationale

### Technology Choices

- **React for Frontend**: Facilitates dynamic and responsive UI development.
- **Node.js and Express for Backend**: Provides a scalable and performant environment.
- **OpenAI API**: Ensures high-quality transcription, summarization, and text-to-speech.
- **SQLite**: Chosen for its simplicity and ease of use for lightweight data storage.

## Implementation

### File Upload Handling

- Used `express-fileupload` for efficient file management.
- Users can upload audio files which are then stored in a designated directory for processing.

### File Upload for Transcription

- The user uploads a file, which is then moved to the server's upload directory.
- The file path is used to transcribe the audio using the OpenAI API.

### Asynchronous Processing

- Employed `async`/await for non-blocking operations, ensuring smooth and efficient handling of requests.

### API Calls

- Handled in the backend to keep the frontend clean and focused on the user interface.

### Caching

- Implemented a basic caching mechanism using SQLite to store frequently accessed data, reducing the number of API calls.
- Plans to upgrade to a proper caching solution like Redis for enhanced performance.

### Saving Request and Response

- Requests and responses are saved to the SQLite database for logging, tracking, and potential reuse.
- Plans to extend this to all endpoints

### API Key Validation

- API keys are set and checked in the backend to ensure secure access to the services.

### Return ArrayBuffer for Text-to-Speech

- The generated speech is returned as an ArrayBuffer, enabling efficient handling of binary audio data.

### Modular Architecture

- Frontend components are modularized for better maintainability and reusability.
- Backend is organized into modular folders: routes, services, and repositories, enhancing code organization and separation of concerns.

## Potential Improvements

### Subtitles Implementation

- **Current State**: None
- **Approach**: Use Web Speech API to generate real-time subtitles. Synchronize the transcription output with the audio playback to display subtitles accurately.

### Styling

- **Current State**: None
- **Improvements**: Implement a more sophisticated design using CSS frameworks like Tailwind CSS or styled-components for React.

### Caching

- **Current State**: Basic caching using SQLite.
- **Improvements**: Implement Redis for better performance and scalability.

### Logging

- **Current State**: Logging request/response implemented for summarize endpoints.
- **Improvements**: Extend logging to all endpoints to capture detailed logs for all operations, aiding in debugging and monitoring.

### API Abstraction

- **Current State**: API calls are directly made in the components.
- **Improvements**: Create a dedicated API file to manage backend calls, improving code organization and maintainability.

### Testing

- **Approach**: None
- **Benefits**: Implement unit and integration tests using Jest and React Testing Library for frontend, and Mocha/Chai for backend.
