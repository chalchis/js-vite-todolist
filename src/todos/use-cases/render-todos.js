import { Todo } from "../models/todo.models";
import { createTodoHTML } from "./";

/*
Para evitar hacer muchas búsquedas en el DOM (que son costosas), 
se almacena el elemento en una variable.
*/
let elementHtml;

/**
 * 
 * @param {String} elementSelector elemento html como contenedor 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementSelector, todos = [] ) => {

	//verificamos si ya fue asignada es más robusta (incluye chequeo de DOM)
	if (!elementHtml || !document.body.contains(elementHtml))
	{
		//seleccionar elemento
		//para no estar haciendo demasaiados querySelector lo alamanceno en un variable asignado el nombre del elemento html
		elementHtml = document.querySelector( elementSelector );

		//aqui rectificamos si existe al realizar el querySelector
		if (!elementHtml) 
		{
			throw new Error(`Element with selector "${elementSelector}" not found in DOM`);
		}
	}

	//Limpiar contenedor antes de agregar nuevos items (evita duplicados)
	elementHtml.innerHTML = '';	
	
	//iterar todos for of es ideal para objetos
	for (const todo of todos) 
	{
		//console.log(`${todo.description}`);
		elementHtml.append( createTodoHTML( todo ) );
	}
};