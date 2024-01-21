# Code Test

## A backend for a simple note taking app. It a simple CRUD application, capable of creating, fetching, editing, and deleting a note. The data storage is an in-app memory with the new notes saved into an array. Hence, data is emptied after every restart of the server.

## Requirements

1. Typescript: 5.3.3 sdsd
2. nodejs: 16.14.0
3. npm: 8.3.1

## Setup

1. Clone repo
2. Run "npm install"
3. Run "npm run start" to start application

## How to use

1. Create new note with POST request at /notes. Pass JSON object with values title and body as body. Example {"title": "Title", "body": "Body"}.
2. Get all notes with GET request at /notes.
3. Get one note with GET request at /notes/:noteid. noteid is the id property of the note from getting all notes. Refer to number 2 of this list.
4. Edit a note with PUT request at /notes/:noteid. Pass JSON object with values title and body as body. Example {"title": "Title", "body": "Body"}
5. Delete a note with DELETE request at /notes/:noteid.
