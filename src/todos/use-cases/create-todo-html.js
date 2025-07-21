import { Todo } from "../models/todo.models";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {

	//verificamos
	if ( !todo ) throw new Error('Todo objet is required');

	//Destructuring
	const { id, description, done } = todo;

	//usamos las variables Destructuring 
	const html = `
		<div class="view">
			<input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
			<label>${description}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	`;

	//Crear el elemento li
	const liElement = document.createElement('li');

	//crear el contenido en el elemento
	liElement.innerHTML = html;

	//agregar atributo
	liElement.setAttribute('data-id', id);

	// Aplicar clase completed 
	if ( done ) liElement.classList.add('completed');	

	// Aplicar clase completed si todo está marcado como completed
	//done ? liElement.classList.add('completed') : liElement.classList.remove('completed');
	
	return liElement;
};