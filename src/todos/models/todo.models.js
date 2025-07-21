//importar crear ids
import { v4 as uuid } from 'uuid';

//clase modelo de un todo
export class Todo
{
	/**
	 * 
	 * @param {string} description 
	 */
	constructor( description)
	{
		this.id = uuid();
		this.description = description;
		this.done = false;
		this.createdAt = new Date();
	}
}