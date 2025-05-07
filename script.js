const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const tasksLeft = document.getElementById('tasksLeft');

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function addTask() {
            const text = taskInput.value.trim();
            if (text !== '') {
                tasks.push({ text, completed: false });
                saveTasks();
                renderTasks();
                taskInput.value = '';
            }
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'todo-item';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', () => {
                    tasks[index].completed = checkbox.checked;
                    saveTasks();
                    updateStats();
                });
                const checkboxContainer = document.createElement('div');
                checkboxContainer.className = 'checkbox-container';
                checkboxContainer.appendChild(checkbox);

                const textSpan = document.createElement('span');
                textSpan.className = `todo-text ${task.completed ? 'completed' : ''}`;
                textSpan.textContent = task.text;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Удалить';
                deleteBtn.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                    updateStats();
                });

                li.appendChild(checkboxContainer);
                li.appendChild(textSpan);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
            updateStats();
        }

        function updateStats() {
            const activeTasks = tasks.filter(task => !task.completed).length;
            tasksLeft.textContent = activeTasks;
        }

        function clearCompleted() {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderTasks();
            updateStats();
        });