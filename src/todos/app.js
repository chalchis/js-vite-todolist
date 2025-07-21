//importar template HTML
import templateHtml from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

//objeto de ids
const elementIDs = {
	TodoListHtml: '.todo-list',
	NewtodoInput: '#new-todo-input',
	ClearComplete: '.clear-completed',
	TodoFilters: '.filters',
	PendingCountLabel: '#pending-count'
};

/**
 * 
 * @param {*} elementId 
 */
//ejecutar App
export const App = ( elementId ) => {

	//mostrar todos los TODOS
	const displayTodos = () => {

		const todos = todoStore.getTodos( todoStore.getCurrentFilter() );

		//id desde un objeto - esta enviando .todo-list
		renderTodos( elementIDs.TodoListHtml, todos );

		updatePendingCount();

	};

	//----------------------------------------

	//saber el numero de pendientes
	const updatePendingCount = () => {

		renderPending(elementIDs.PendingCountLabel);
	
	};

	//----------------------------------------

	//Inicia App() con función autoejecutable
	(() => {
		
		const app = document.createElement('div');
		app.innerHTML = templateHtml;
		document.querySelector( elementId ).append( app );

		//funcion
		displayTodos();

		//referencias HTML de los elementos
		const newDescriptionInput = document.querySelector( elementIDs.NewtodoInput );
		const todoListLi = document.querySelector( elementIDs.TodoListHtml );
		const clearTodoButton = document.querySelector( elementIDs.ClearComplete );
		const todoFilterLi = document.querySelector( elementIDs.TodoFilters );

		//EVENTOS----------------------------------------------------

		//agregar un evento
		newDescriptionInput.addEventListener('keyup', (event) => {
			
			if ( event.keyCode !== 13 ) return
			
			const inputValue = event.target.value.trim(); // Elimina espacios en blanco al inicio/final
			
			if ( inputValue.length === 0 ) return

			//llamar funcion
			todoStore.addTodo(inputValue);

			//vaciar el input
			event.target.value = '';

			//funcion
			displayTodos();
			
		});

		//click li
		todoListLi.addEventListener('click', (event) => {
			
			// Verificar si el clic fue en un <li> o en un elemento dentro de él
    		const elementLi = event.target.closest('li');
			
			//no existe
			if ( !elementLi ) return;

			//si es diferemte al boton con la clase destroy
			if ( !event.target.matches('.destroy') ) 
			{
				//aplicar el toogle
				todoStore.toggleTodo(elementLi.dataset.id);

				displayTodos();
			}

		});

		//click all boton destroyer
		todoListLi.addEventListener('click', (event) => {

			// Verificar si el clic fue en un <li> o en un elemento dentro de él
    		const elementLi = event.target.closest('li');

			/*
			-Verifica si el elemento clickeado (event.target) tiene la clase CSS 'destroy'.
			-Asigna true o false a la variable isDestroyer dependiendo del resultado.
			*/
			const isDestroyerElement = event.target.className === 'destroy';

			//verificar
			if ( !elementLi || !isDestroyerElement ) return;

			//destruir
			todoStore.deleteTodo(elementLi.dataset.id);

			displayTodos();

		});

		//clear complete
		clearTodoButton.addEventListener('click', (event) => {
			
			//elemento Es diferente de event.target, que apunta al elemento que originó el evento (útil cuando hay propagación de eventos).
			const elementHtml = event.currentTarget;

			//si no existe
			if ( !elementHtml ) return;

			//limpiar todo el todo
			todoStore.deleteCompleted();

			displayTodos();

		});

		//al hacer click en alguna opcion de filtrados disponibles
		todoFilterLi.addEventListener('click', (event) => {

			// Prevenir el comportamiento por defecto del enlace (opcional)
  			event.preventDefault();

			// 1. Verificar que el click fue en un enlace con la clase css .filtro
			const clickedFilter = event.target.closest('a.filtro');

			//verifica
			if (!clickedFilter) return;

			// 2. Quitar la clase 'selected' de TODOS los filtros
			// document.querySelectorAll('.filters a.filtro').forEach(selectedFilter => {
			// 	selectedFilter.classList.remove('selected');
			// });

			// Remueve 'selected' del anterior (si existe)
    		document.querySelector('.filters a.filtro.selected')?.classList.remove('selected');

			// 3. Agregar la clase solo al filtro clickeado
  			clickedFilter.classList.add('selected');

			// 4. Obtener el valor del atributo data-filtre
  			const filterValue = clickedFilter.dataset.filtre;

			// Switch para manejar los diferentes casos
			switch(filterValue) 
			{
				case 'all':
				console.log('Mostrando TODOS los items');
				todoStore.setFilter(Filters.All); // Ejemplo: Obtener todos
				break;
				
				case 'pending':
				console.log('Mostrando solo PENDIENTES');
				todoStore.setFilter(Filters.Pending);
				break;
				
				case 'completed':
				console.log('Mostrando solo COMPLETADOS');
				todoStore.setFilter(Filters.Complete);
				break;	
			}

			displayTodos();
			
		});

	})();	

};