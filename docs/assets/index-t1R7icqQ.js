(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function u(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=u(o);fetch(o.href,n)}})();const v=`<section class="todoapp">\r
	<header class="header">\r
		<h1>Tareas</h1>\r
		<input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
	</header>\r
	\r
	<!-- This section should be hidden by default and shown when there are todos -->\r
	<section class="main">\r
		<input id="toggle-all" class="toggle-all" type="checkbox">\r
		<label for="toggle-all">Mark all as complete</label>\r
		<ul class="todo-list">\r
			<!-- These are here just to show the structure of the list items -->\r
			<!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
			<!-- <li class="completed" data-id="abc">\r
				<div class="view">\r
					<input class="toggle" type="checkbox" checked>\r
					<label>Probar JavaScript</label>\r
					<button class="destroy"></button>\r
				</div>\r
				<input class="edit" value="Create a TodoMVC template">\r
			</li>  -->\r
			<!-- <li>\r
				<div class="view">\r
					<input class="toggle" type="checkbox">\r
					<label>Comprar un unicornio</label>\r
					<button class="destroy"></button>\r
				</div>\r
				<input class="edit" value="Rule the web">\r
			</li> -->\r
		</ul>\r
	</section>\r
\r
	<!-- This footer should hidden by default and shown when there are todos -->\r
	<footer class="footer">\r
		<!-- This should be "0 items left" by default -->\r
		<span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
		<!-- Remove this if you don't implement routing selected-->\r
		<ul class="filters">\r
			<li>\r
				<a class="filtro selected" data-filtre="all" href="#/">Todos</a>\r
			</li>\r
			<li>\r
				<a class="filtro" data-filtre="pending" href="#">Pendientes</a>\r
			</li>\r
			<li>\r
				<a class="filtro" data-filtre="completed" href="#">Completados</a>\r
			</li>\r
		</ul>\r
		<!-- Hidden if no completed items are left ↓ -->\r
		<button class="clear-completed">Limpiar</button>\r
	</footer>\r
</section>\r
\r
\r
<footer class="info">\r
	<p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
	<!-- Change this out with your name and url ↓ -->\r
	<p>Creado por <a href="http://todomvc.com">ti</a></p>\r
	<p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,s=[];for(let t=0;t<256;++t)s.push((t+256).toString(16).slice(1));function S(t,e=0){return(s[t[e+0]]+s[t[e+1]]+s[t[e+2]]+s[t[e+3]]+"-"+s[t[e+4]]+s[t[e+5]]+"-"+s[t[e+6]]+s[t[e+7]]+"-"+s[t[e+8]]+s[t[e+9]]+"-"+s[t[e+10]]+s[t[e+11]]+s[t[e+12]]+s[t[e+13]]+s[t[e+14]]+s[t[e+15]]).toLowerCase()}let y;const C=new Uint8Array(16);function E(){if(!y){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");y=crypto.getRandomValues.bind(crypto)}return y(C)}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:A};function P(t,e,u){if(w.randomUUID&&!t)return w.randomUUID();t=t||{};const r=t.random??t.rng?.()??E();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=r[6]&15|64,r[8]=r[8]&63|128,S(r)}class h{constructor(e){this.id=P(),this.description=e,this.done=!1,this.createdAt=new Date}}const a={All:"all",Complete:"completed",Pending:"pending"},l={todos:[new h("Aprender JavaScript"),new h("Aprender ReactJS.js"),new h("Aprender Laravel in Banckend"),new h("Aprender React Native"),new h("Aprender Taurin Desktop")],filter:a.All},D=()=>{T()},T=()=>{if(!localStorage.getItem("state"))return;const{todos:t=[],filter:e=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=t,l.filter=e},g=()=>{localStorage.setItem("state",JSON.stringify(l))},k=t=>{if(!t)throw new Error("Description is required");l.todos.push(new h(t)),g()},H=(t=a.All)=>{switch(t){case a.All:return[...l.todos];case a.Complete:return l.todos.filter(e=>e.done===!0);case a.Pending:return l.todos.filter(e=>e.done===!1);default:throw new Error(`Thue option ${t} is not valid.`)}},M=t=>{l.todos=l.todos.map(e=>e.id===t?{...e,done:!e.done}:e),g()},I=t=>{l.todos=l.todos.filter(e=>e.id!==t),g()},O=()=>{l.todos=l.todos.filter(t=>t.done===!1),g()},q=(t=a.All)=>{console.log(t),l.filter=t,g()},F=()=>l.filter,c={addTodo:k,deleteCompleted:O,deleteTodo:I,getCurrentFilter:F,getTodos:H,iniStore:D,loadStore:T,setFilter:q,toggleTodo:M},N=t=>{if(!t)throw new Error("Todo objet is required");const{id:e,description:u,done:r}=t,o=`
		<div class="view">
			<input class="toggle" type="checkbox" ${r?"checked":""}>
			<label>${u}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",e),r&&n.classList.add("completed"),n};let p;const U=(t,e=[])=>{if((!p||!document.body.contains(p))&&(p=document.querySelector(t),!p))throw new Error(`Element with selector "${t}" not found in DOM`);p.innerHTML="";for(const u of e)p.append(N(u))},x=t=>{const e=document.querySelector(t);if(!e)throw new Error(`El elemento ${t} not found`);e.innerHTML=c.getTodos(a.Pending).length},m={TodoListHtml:".todo-list",NewtodoInput:"#new-todo-input",ClearComplete:".clear-completed",TodoFilters:".filters",PendingCountLabel:"#pending-count"},V=t=>{const e=()=>{const r=c.getTodos(c.getCurrentFilter());U(m.TodoListHtml,r),u()},u=()=>{x(m.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=v,document.querySelector(t).append(r),e();const o=document.querySelector(m.NewtodoInput),n=document.querySelector(m.TodoListHtml),f=document.querySelector(m.ClearComplete),L=document.querySelector(m.TodoFilters);o.addEventListener("keyup",i=>{if(i.keyCode!==13)return;const d=i.target.value.trim();d.length!==0&&(c.addTodo(d),i.target.value="",e())}),n.addEventListener("click",i=>{const d=i.target.closest("li");d&&(i.target.matches(".destroy")||(c.toggleTodo(d.dataset.id),e()))}),n.addEventListener("click",i=>{const d=i.target.closest("li"),b=i.target.className==="destroy";!d||!b||(c.deleteTodo(d.dataset.id),e())}),f.addEventListener("click",i=>{i.currentTarget&&(c.deleteCompleted(),e())}),L.addEventListener("click",i=>{i.preventDefault();const d=i.target.closest("a.filtro");if(!d)return;switch(document.querySelector(".filters a.filtro.selected")?.classList.remove("selected"),d.classList.add("selected"),d.dataset.filtre){case"all":console.log("Mostrando TODOS los items"),c.setFilter(a.All);break;case"pending":console.log("Mostrando solo PENDIENTES"),c.setFilter(a.Pending);break;case"completed":console.log("Mostrando solo COMPLETADOS"),c.setFilter(a.Complete);break}e()})})()};c.iniStore();V("#app");
