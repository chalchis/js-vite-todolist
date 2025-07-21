import todoStore, { Filters } from "../../store/todo.store";

/**
 * 
 * @param {String} elementId 
 */
export const renderPending = ( elementId ) => {

	//elemento relacionado HTML
	const elemtHtml = document.querySelector( elementId );

	//verificamos si existe
	if ( !elemtHtml ) throw new Error(`El elemento ${elementId} not found`); 

	//hacemos uso de la funcion en store
	elemtHtml.innerHTML = todoStore.getTodos( Filters.Pending ).length;
	
};