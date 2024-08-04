# Todo Application
This is a React Native application for managing a to-do list. It allows users to add, edit, delete, and drag-and-drop tasks. The application uses AsyncStorage to persist data across app restarts.

## Features
Add Tasks: Add new tasks to your to-do list.
Edit Tasks: Modify existing tasks.
Delete Tasks: Remove tasks from the list.
Drag and Drop: Reorder tasks by dragging and dropping.
Search Tasks: Filter tasks by their title.
Completion Status: Mark tasks as completed or pending.
## Technologies
React Native: Framework for building native apps using React.
AsyncStorage: For persistent storage of tasks.
DraggableFlatList: For drag-and-drop functionality.
Tailwind CSS: For styling (via twrnc).
## Setup
### Clone the repository:

`git clone https://github.com/Abdo-Ahmed-Mostafa/Todo-App-Expo.git`

`cd todo-app`

### Install dependencies: 
`npm install`

### Start the development server:
`npx expo start`
## Usage
### Adding a Task:

Enter the task title in the "Add a Task" input field.

Press the "Add" button to save the task.

Editing a Task:

Press and hold on a task to enable dragging.

Tap the "pencil" icon to edit the task.

Modify the title and press "Save" to update.

### Deleting a Task:

Tap the "trash can" icon to remove the task from the list.
### Reordering Tasks:

Press and hold on a task to drag and reorder.
### Searching Tasks:

Enter keywords in the "Search Tasks" input field to filter tasks by title.

### File Structure
TodoScreen.js: Main component that manages the to-do list functionality.

Fallback.js: Component displayed when there are no tasks to show.

App.js: Entry point of the application.

Contributing

Fork the repository.

Acknowledgements

React Native: For the framework used to build the app.

AsyncStorage: For local storage.
DraggableFlatList: For drag-and-drop functionality.
