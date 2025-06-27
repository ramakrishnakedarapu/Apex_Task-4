// Show selected section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Get all buttons with class 'nav-link' and find the one that matches the section
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.textContent.toLowerCase().includes(sectionId)) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');
}

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// ----- TODO APP FUNCTIONALITY -----
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Render todos based on current filter
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });
    
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between bg-white p-3 rounded-lg shadow ${todo.completed ? 'opacity-70' : ''}`;
        
        li.innerHTML = `
            <div class="flex items-center">
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''} 
                    onchange="toggleTodo(${index})"
                    class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                >
                <span class="ml-3 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}">
                    ${todo.text}
                </span>
            </div>
            <button 
                onclick="removeTodo(${index})"
                class="text-red-500 hover:text-red-700"
            >
                <i class="fas fa-times"></i>
            </button>
        `;
        
        todoList.appendChild(li);
    });
    
    // Update counters
    document.getElementById('total-todos').textContent = todos.length;
    document.getElementById('completed-todos').textContent = todos.filter(todo => todo.completed).length;
    
    // Save todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (text) {
        todos.push({
            text,
            completed: false
        });
        
        input.value = '';
        renderTodos();
    }
}

// Toggle todo completion status
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Remove todo
function removeTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Clear completed todos
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
}

// Filter todos
function filterTodos(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(filter)) {
            btn.classList.add('active');
        }
    });
    
    renderTodos();
}

// Handle Enter key in todo input
document.getElementById('todo-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// ----- PRODUCTS FUNCTIONALITY -----
const products = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 99.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Smart Watch', category: 'electronics', price: 199.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Running Shoes', category: 'clothing', price: 79.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'JavaScript: The Good Parts', category: 'books', price: 29.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 5, name: 'Bluetooth Speaker', category: 'electronics', price: 59.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 6, name: 'Cotton T-Shirt', category: 'clothing', price: 19.99, rating: 4.0, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 7, name: 'Python Crash Course', category: 'books', price: 24.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1672922310200-fff31138251e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHl0aG9uJTIwcHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D' },
    { id: 8, name: 'Desk Lamp', category: 'electronics', price: 34.99, rating: 4.1, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFtcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 9, name: 'Denim Jeans', category: 'clothing', price: 49.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 10, name: 'Clean Code', category: 'books', price: 35.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' }
];

let currentCategoryFilter = 'all';
let currentPriceFilter = 100;
let currentSort = 'default';

// Render products based on filters and sorting
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    let filteredProducts = [...products];
    
    // Apply category filter
    if (currentCategoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === currentCategoryFilter
        );
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(
        product => product.price <= currentPriceFilter
    );
    
    // Apply sorting
    if (currentSort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    
    // Update product count
    document.getElementById('product-count').textContent = filteredProducts.length;
    
    // Render products
    filteredProducts.forEach(product => {
        const starRating = Array(5).fill('').map((_, i) => 
            i < Math.floor(product.rating) ? 
            '<i class="fas fa-star text-yellow-400"></i>' : 
            (i < product.rating ? '<i class="fas fa-star-half-alt text-yellow-400"></i>' : '<i class="far fa-star text-yellow-400"></i>')
        ).join('');
        
        const productCard = `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-1">${product.name}</h3>
                    <div class="flex items-center mb-2">
                        ${starRating}
                        <span class="text-gray-600 ml-1">(${product.rating})</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-gray-800">$${product.price.toFixed(2)}</span>
                        <span class="text-xs px-2 py-1 rounded-full bg-gray-100">
                            ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                    </div>
                    <button 
                        onclick="addToCart(${product.id})" 
                        class="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    currentCategoryFilter = category;
    
    // Update active filter button
    document.querySelectorAll('#products-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category)) {
            btn.classList.add('active');
        }
    });
    
    renderProducts();
}

// Apply price filter
function applyPriceFilter() {
    currentPriceFilter = document.getElementById('price-range').value;
    renderProducts();
}

// Sort products
function sortProducts(sort) {
    currentSort = sort;
    renderProducts();
}

// Add to cart (placeholder function)
function addToCart(productId) {
    alert(`Product with ID ${productId} added to cart!`);
}

// ----- CONTACT FORM FUNCTIONALITY -----
function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Here you would normally send the form data to a server
    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    showSection('portfolio');
    renderTodos();
    renderProducts();
    
    // Initialize price range filter
    document.getElementById('price-range').addEventListener('input', function() {
        document.querySelector('#products-section .flex.justify-between span:first-child').textContent = '$0';
        document.querySelector('#products-section .flex.justify-between span:last-child').textContent = `$${this.value}`;
    });
});