'use strict';

let todoData = [];

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

const saveData = () => {
		localStorage.setItem('todoData', JSON.stringify(todoData));
		if (todoData.length === 0) {
			localStorage.removeItem('todoData');
		}
	},
	getData = () => {
		todoData = localStorage.todoData ? JSON.parse(localStorage.getItem('todoData')) : [];
	},
	render = () => {
		saveData();
		todoList.textContent = '';
		todoCompleted.textContent = '';

		todoData.forEach((item, index) => {
			const li = document.createElement('li');
			li.classList.add('todo-item');
			li.innerHTML =
				`
					<span class="text-todo">${item.value}</span>
					<div class="todo-buttons">
						<button class="todo-remove"></button>
						<button class="todo-complete"></button>
					</div>
				`;
			if (item.completed) {
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}

			const btnTodoComplete = li.querySelector('.todo-complete');
			btnTodoComplete.addEventListener('click', () => {
				item.completed = !item.completed;
				render();
			});

			const btnTodoRemove = li.querySelector('.todo-remove');
			btnTodoRemove.addEventListener('click', () => {
				todoData.splice(index, 1);
				render();
			});
		});
	};

todoControl.addEventListener('submit', e => {
	e.preventDefault();
	if (headerInput.value.trim() !== '') {
		const newTodo = {
			value: headerInput.value,
			completed: false
		};

		todoData.push(newTodo);
		headerInput.value = '';
		render();
	} else {
		return;
	}
});

getData();
render();
