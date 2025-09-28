// ========================================
// SISTEMA DE GERENCIAMENTO PESSOAL
// ========================================

// 1. ESTRUTURAS DE DADOS (Arrays para armazenar informações)
let tasks = []; // Array para armazenar todas as tarefas
let expenses = []; // Array para armazenar todos os gastos

// 2. SELETORES DOS ELEMENTOS HTML
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskFilter = document.getElementById('taskFilter');
const categoryFilter = document.getElementById('categoryFilter');

const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalExpenses = document.getElementById('totalExpenses');
const expenseCount = document.getElementById('expenseCount');

// 3. FUNÇÕES PARA GERENCIAR DADOS NO LOCALSTORAGE
function saveData() {
    // Salva os dados no navegador (persistência local)
    localStorage.setItem('personalTasks', JSON.stringify(tasks));
    localStorage.setItem('personalExpenses', JSON.stringify(expenses));
    console.log('Dados salvos no localStorage!');
}

function loadData() {
    // Carrega os dados salvos quando a página é aberta
    const savedTasks = localStorage.getItem('personalTasks');
    const savedExpenses = localStorage.getItem('personalExpenses');
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        console.log('Tarefas carregadas:', tasks.length);
    }
    
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        console.log('Gastos carregados:', expenses.length);
    }
}

// 4. FUNÇÕES PARA GERENCIAR TAREFAS
function addTask(title, category) {
    // Cria um novo objeto tarefa
    const newTask = {
        id: Date.now(), // ID único usando timestamp
        title: title,
        category: category,
        completed: false,
        createdAt: new Date().toLocaleString('pt-BR')
    };
    
    // Adiciona ao array de tarefas
    tasks.push(newTask);
    
    // Salva no localStorage e atualiza a tela
    saveData();
    renderTasks();
    
    console.log('Nova tarefa adicionada:', newTask);
}

function toggleTask(id) {
    // Encontra a tarefa pelo ID e inverte o status
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveData();
        renderTasks();
        console.log('Tarefa alterada:', task);
    }
}

function deleteTask(id) {
    // Remove a tarefa do array
    tasks = tasks.filter(task => task.id !== id);
    saveData();
    renderTasks();
    console.log('Tarefa removida, ID:', id);
}

function renderTasks() {
    // Obtém os filtros atuais
    const statusFilter = taskFilter.value;
    const catFilter = categoryFilter.value;
    
    // Filtra as tarefas baseado nos filtros selecionados
    let filteredTasks = tasks.filter(task => {
        const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'completed' && task.completed) ||
                            (statusFilter === 'pending' && !task.completed);
                            
        const matchesCategory = catFilter === 'all' || task.category === catFilter;
        
        return matchesStatus && matchesCategory;
    });

    // Limpa a lista atual
    taskList.innerHTML = '';

    // Se não há tarefas, mostra estado vazio
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>Nenhuma tarefa encontrada.</p>
                <small>Adicione uma nova tarefa ou altere os filtros!</small>
            </div>
        `;
        return;
    }

    // Renderiza cada tarefa
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <div class="task-content">
                <h4>${task.title}</h4>
                <div class="task-meta">
                    <span class="task-category">${getCategoryName(task.category)}</span>
                    <span><i class="fas fa-clock"></i> ${task.createdAt}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn btn-small btn-success" onclick="toggleTask(${task.id})" title="${task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}">
                    <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteTask(${task.id})" title="Excluir tarefa">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        taskList.appendChild(taskElement);
    });
}

// 5. FUNÇÕES PARA GERENCIAR GASTOS
function addExpense(description, value, category) {
    const newExpense = {
        id: Date.now(),
        description: description,
        value: parseFloat(value),
        category: category,
        createdAt: new Date().toLocaleString('pt-BR')
    };
    
    expenses.push(newExpense);
    saveData();
    renderExpenses();
    updateFinancialSummary();
    
    console.log('Novo gasto adicionado:', newExpense);
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveData();
    renderExpenses();
    updateFinancialSummary();
    console.log('Gasto removido, ID:', id);
}

function renderExpenses() {
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        expenseList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>Nenhum gasto registrado ainda.</p>
                <small>Adicione seu primeiro gasto acima!</small>
            </div>
        `;
        return;
    }

    // Ordena gastos por data (mais recentes primeiro)
    const sortedExpenses = expenses.sort((a, b) => b.id - a.id);

    sortedExpenses.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        
        expenseElement.innerHTML = `
            <div class="expense-info">
                <h4>${expense.description}</h4>
                <small><i class="fas fa-tag"></i> ${getCategoryName(expense.category)} • ${expense.createdAt}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="expense-value">R$ ${expense.value.toFixed(2).replace('.', ',')}</span>
                <button class="btn btn-small btn-danger" onclick="deleteExpense(${expense.id})" title="Excluir gasto">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        expenseList.appendChild(expenseElement);
    });
}

function updateFinancialSummary() {
    // Calcula o total de gastos
    const total = expenses.reduce((sum, expense) => sum + expense.value, 0);
    
    // Atualiza os elementos na tela
    totalExpenses.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    expenseCount.textContent = expenses.length;
}

// 6. FUNÇÕES AUXILIARES
function getCategoryName(category) {
    const categories = {
        // Tarefas
        'pessoal': 'Pessoal',
        'trabalho': 'Trabalho', 
        'estudos': 'Estudos',
        'saude': 'Saúde',
        // Gastos
        'alimentacao': 'Alimentação',
        'transporte': 'Transporte',
        'lazer': 'Lazer',
        'outros': 'Outros'
    };
    
    return categories[category] || category;
}

// 7. EVENT LISTENERS (Escutadores de Eventos)

// Formulário de Tarefas
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o formulário de recarregar a página
    
    // Obtém os valores dos campos
    const title = document.getElementById('taskTitle').value.trim();
    const category = document.getElementById('taskCategory').value;
    
    // Validação básica
    if (!title || !category) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Adiciona a tarefa
    addTask(title, category);
    
    // Limpa o formulário
    taskForm.reset();
});

// Formulário de Gastos  
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('expenseDescription').value.trim();
    const value = document.getElementById('expenseValue').value;
    const category = document.getElementById('expenseCategory').value;
    
    if (!description || !value || !category || value <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }
    
    addExpense(description, value, category);
    expenseForm.reset();
});

// Filtros de Tarefas
taskFilter.addEventListener('change', renderTasks);
categoryFilter.addEventListener('change', renderTasks);

// 8. INICIALIZAÇÃO DA APLICAÇÃO
function initApp() {
    console.log('🚀 Inicializando Sistema de Gerenciamento Pessoal...');
    
    // Carrega dados salvos
    loadData();
    
    // Renderiza as telas
    renderTasks();
    renderExpenses();
    updateFinancialSummary();
    
    console.log('✅ Sistema inicializado com sucesso!');
    console.log(`📋 ${tasks.length} tarefas carregadas`);
    console.log(`💰 ${expenses.length} gastos carregados`);
}

// Executa quando a página termina de carregar
document.addEventListener('DOMContentLoaded', initApp);

console.log('Sistema de Gerenciamento Pessoal carregado! 🎉');