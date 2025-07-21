//la clase modelo de un todo
import { Todo } from "../todos/models/todo.models";

//objetos de filtro
export const Filters = {
	All: 'all',
	Complete: 'completed',
	Pending: 'pending'
};

// Estado inicial de la aplicación
const state = {

	todos:[
		new Todo('Aprender JavaScript'),
		new Todo('Aprender ReactJS.js'),
		new Todo('Aprender Laravel in Banckend'),
		new Todo('Aprender React Native'),
		new Todo('Aprender Taurin Desktop')
	],
	filter: Filters.All // all | active | completed
	
};

//inicializa el store
const iniStore = () => {

	//console.log('Store initialized');
	//localStorage
	loadStore();
};

//cargar
const loadStore = () => {

	//verificar
	if ( !localStorage.getItem('state') ) return;
	
	//destructuring de los que obtengo de localStorage
	/*
	Si no existe 'todos', usa array vacío
  	Si no existe 'filter', usa Filters.All
	*/
	const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );

	//actualizamos el objeto en su propiedad con las variables destructuradas
	state.todos = todos;
	state.filter = filter;

};

//save in localStorage
const saveStateToLocalStorage = () => {

	//obtenemmos el localStorage es nativo
	localStorage.setItem('state', JSON.stringify( state ));
};

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {

	//verificas
	if ( !description )
	{
		throw new Error('Description is required');
	}

	state.todos.push(new Todo(description));

	saveStateToLocalStorage();
};

/**
 * 
 */
const getTodos = ( filter = Filters.All) => {

	switch ( filter) 
	{
		case Filters.All:
			//obtenemos una copia
			return [...state.todos];

		case Filters.Complete:
			/* ejemplo original usando filter
				return state.todos.filter(function(todo) {
					if (todo.done === true) {
						return true; // Incluir este elemento
					} else {
						return false; // Excluir este elemento
					}
				});
			*/
			return state.todos.filter( todo => todo.done === true );

		case Filters.Pending:
			return state.todos.filter( todo => todo.done === false );

		default:
			throw new Error(`Thue option ${filter} is not valid.`);		
	}
};

/**
 * 
 * @param {String} todoId 
 */
//es para marcar el false o true
const toggleTodo = ( todoId ) => {

	//recorremos el array original y obtenemos uno nuevo
	state.todos = state.todos.map( todo => {

		//comparamos con el idseleccionado
		/*
		-return { ...todo, done: !todo.done } retorna un nuevo objeto con la propiedad done modificada.
		-Los "dos elementos" que ves (...todo y done: !todo.done) son partes del mismo objeto, no objetos separados.

		¿Qué hace exactamente !todo.done?
		Si todo.done es true, !todo.done devuelve false
		Si todo.done es false, !todo.done devuelve true
		*/
		return todo.id === todoId ? { ...todo, done: !todo.done } : todo;
	});

	saveStateToLocalStorage();
	
};

/**
 * 
 * @param {String} todoId es el identificador
 */
const deleteTodo = ( todoId ) => {

	 state.todos = state.todos.filter( todo => todo.id !== todoId );

	 saveStateToLocalStorage();
};


const deleteCompleted = () => {

	state.todos = state.todos.filter( todo => todo.done === false );

	saveStateToLocalStorage();
};

/**
 * 
 * @param {Filters} newFilter 
 */
//argumento por defecto newFilter = Filters.all
const setFilter = ( newFilter = Filters.All ) => {

	//validar si existe la propiedad
	console.log(newFilter);
	state.filter = newFilter;

	saveStateToLocalStorage();
};

/**
 * Obtiene el filtro actual
 */
const getCurrentFilter = () => {

	return state.filter;
};

//exporta el store
export default {
	addTodo,
	deleteCompleted,
	deleteTodo,
	getCurrentFilter,
	getTodos,
	iniStore,
	loadStore,
	setFilter,
	toggleTodo
}
