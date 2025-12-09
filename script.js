// Array que armazena todas as tarefas
let tasks = [];

// Função chamada ao adicionar uma nova tarefa
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim(); // Remove espaços extras

    // Impede adicionar tarefas vazias
    if (text === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    // Cria um objeto representando a tarefa
    const task = {
        id: Date.now(),       // ID único baseado no horário atual
        text: text,           // Texto da tarefa
        completed: false      // Estado inicial: não concluída
    };

    // Adiciona a tarefa ao array
    tasks.push(task);

    // Limpa o campo de input
    input.value = '';

    // Atualiza a lista na tela
    renderTasks();
}

// Alterna o status da tarefa (concluída ↔ não concluída)
function toggleTask(id) {
    const task = tasks.find(t => t.id === id); // Localiza a tarefa pelo ID
    if (task) {
        task.completed = !task.completed; // Inverte o estado
        renderTasks();                    // Re-renderiza a lista
    }
}

// Remove uma tarefa pelo ID
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id); // Remove a tarefa do array
    renderTasks();                          // Atualiza a exibição
}

// Atualiza a lista de tarefas na interface
function renderTasks() {
    const taskList = document.getElementById('taskList');

    // Caso não existam tarefas, exibe mensagem de vazio
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                Nenhuma tarefa adicionada ainda.<br>
                Comece adicionando uma nova tarefa! 🏁
            </div>`;
    } else {
        // Gera o HTML das tarefas
        taskList.innerHTML = tasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    Excluir
                </button>
            </li>
        `).join('');
    }

    // Atualiza as estatísticas
    updateStats();
}

// Atualiza os números de total, concluídas e pendentes
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Renderiza a tela ao carregar
renderTasks();
