//css
import './style.css';
import { App } from './todos/app';
import todoStore from './store/todo.store';

// Inicializa el store
todoStore.iniStore();

// Inicia la aplicación
App('#app');