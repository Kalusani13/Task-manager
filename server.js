const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory task storage
let tasks = [
    { id: 1, title: 'Learn Git', completed: false },
    { id: 2, title: 'Learn Docker', completed: false }
];

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json({ task: newTask });
});
// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted', task: deletedTask[0] });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Task Manager API running on http://localhost:${PORT}`);
});
