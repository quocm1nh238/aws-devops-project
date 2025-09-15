// DevOps Todo App - JavaScript Functions
let tasks = [];
let currentFilter = 'all';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application with sample data
function initializeApp() {
    // Add sample DevOps tasks for demonstration
    const sampleTasks = [
        { 
            id: 1, 
            text: "Set up CI/CD pipeline for production deployment", 
            priority: "high", 
            completed: false 
        },
        { 
            id: 2, 
            text: "Monitor server performance and optimize resources", 
            priority: "medium", 
            completed: false 
        },
        { 
            id: 3, 
            text: "Update documentation for deployment process", 
            priority: "low", 
            completed: true 
        },
        { 
            id: 4, 
            text: "Configure load balancer for high availability", 
            priority: "high", 
            completed: false 
        },
        { 
            id: 5, 
            text: "Implement automated testing in staging environment", 
            priority: "medium", 
            completed: false 
        }
    ];
    
    tasks = sampleTasks;
    renderTasks();
    updateStats();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Allow adding task with Enter key
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

// Add new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        priority: prioritySelect.value,
        completed: false
    };
    
    tasks.unshift(newTask); // Add to beginning of array
    
    // Reset form
    taskInput.value = '';
    prioritySelect.value = 'low';
    
    // Update UI
    renderTasks();
    updateStats();
}

// Toggle task completion status
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    updateStats();
}

// Delete a task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        updateStats();
    }
}

// Filter tasks by category
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update filter button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    event.target.classList.add('active');
    
    renderTasks();
}

// Get filtered tasks based on current filter
function getFilteredTasks() {
    switch (currentFilter) {
        case 'pending':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'high':
            return tasks.filter(task => task.priority === 'high');
        default:
            return tasks;
    }
}

// Render tasks to the DOM
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    
    const filteredTasks = getFilteredTasks();
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state and render tasks
    emptyState.style.display = 'none';
    
    tasksList.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
}

// Create HTML for a single task
function createTaskHTML(task) {
    return `
        <div class="task-item ${task.priority} ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <div class="task-text">${escapeHtml(task.text)}</div>
            <div class="task-priority priority-${task.priority}">${task.priority}</div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update task statistics
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    // Update DOM elements
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
}

// Export functions for potential future use
window.TodoApp = {
    addTask,
    toggleTask,
    deleteTask,
    filterTasks,
    tasks: () => tasks
};