// Todo List Application with localStorage backend
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;
        
        // DOM elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        
        // Stats elements
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.pendingTasksEl = document.getElementById('pendingTasks');
        
        this.init();
    }
    
    init() {
        this.loadTodos();
        this.bindEvents();
        this.render();
        this.updateStats();
    }
    
    // Event listeners
    bindEvents() {
        // Add todo
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Clear buttons
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
    }
    
    // localStorage backend methods
    loadTodos() {
        const stored = localStorage.getItem('todos');
        this.todos = stored ? JSON.parse(stored) : [];
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    // Todo operations
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.saveTodos();
        this.todoInput.value = '';
        this.render();
        this.updateStats();
        this.showSuccessAnimation();
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
        this.updateStats();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }
    
    editTodo(id, newText) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
        }
        this.editingId = null;
    }
    
    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
        this.updateStats();
    }
    
    clearAll() {
        if (confirm('Are you sure you want to delete all tasks?')) {
            this.todos = [];
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }
    
    // Filter methods
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }
    
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            default:
                return this.todos;
        }
    }
    
    // Render methods
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.showEmptyState();
        } else {
            this.hideEmptyState();
            this.renderTodoList(filteredTodos);
        }
    }
    
    renderTodoList(todos) {
        this.todoList.innerHTML = todos.map(todo => this.createTodoHTML(todo)).join('');
        
        // Add event listeners to todo items
        todos.forEach(todo => {
            this.addTodoEventListeners(todo.id);
        });
    }
    
    createTodoHTML(todo) {
        const isEditing = this.editingId === todo.id;
        
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <div class="todo-text">
                    ${isEditing ? 
                        `<input type="text" class="edit-input" value="${todo.text}" maxlength="100">` : 
                        `<span>${this.escapeHtml(todo.text)}</span>`
                    }
                </div>
                <div class="todo-actions">
                    <button class="edit-btn" title="Edit task">
                        <i class="fas ${isEditing ? 'fa-save' : 'fa-edit'}"></i>
                    </button>
                    <button class="delete-btn" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    addTodoEventListeners(todoId) {
        const todoItem = document.querySelector(`[data-id="${todoId}"]`);
        if (!todoItem) return;
        
        // Checkbox toggle
        const checkbox = todoItem.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => this.toggleTodo(todoId));
        
        // Edit button
        const editBtn = todoItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => this.handleEdit(todoId));
        
        // Delete button
        const deleteBtn = todoItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTodo(todoId));
        
        // Edit input (if editing)
        const editInput = todoItem.querySelector('.edit-input');
        if (editInput) {
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.editTodo(todoId, editInput.value);
                }
            });
            editInput.addEventListener('blur', () => {
                this.editTodo(todoId, editInput.value);
            });
            editInput.focus();
        }
    }
    
    handleEdit(todoId) {
        if (this.editingId === todoId) {
            // Save the edit
            const editInput = document.querySelector(`[data-id="${todoId}"] .edit-input`);
            if (editInput) {
                this.editTodo(todoId, editInput.value);
            }
        } else {
            // Start editing
            this.editingId = todoId;
            this.render();
        }
    }
    
    // UI helper methods
    showEmptyState() {
        this.todoList.style.display = 'none';
        this.emptyState.style.display = 'block';
    }
    
    hideEmptyState() {
        this.todoList.style.display = 'block';
        this.emptyState.style.display = 'none';
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        
        this.totalTasksEl.textContent = total;
        this.completedTasksEl.textContent = completed;
        this.pendingTasksEl.textContent = pending;
    }
    
    showSuccessAnimation() {
        this.addBtn.classList.add('success');
        setTimeout(() => {
            this.addBtn.classList.remove('success');
        }, 500);
    }
    
    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Add some sample data for demonstration (optional)
function addSampleData() {
    const sampleTodos = [
        { id: 1, text: "Complete project documentation", completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: "Review code changes", completed: true, createdAt: new Date().toISOString() },
        { id: 3, text: "Prepare presentation slides", completed: false, createdAt: new Date().toISOString() },
        { id: 4, text: "Send meeting invitations", completed: false, createdAt: new Date().toISOString() }
    ];
    
    if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify(sampleTodos));
    }
}

// Uncomment the line below to add sample data on first load
// addSampleData();
