import React from "react"
import AuthProvider from "./auth/AuthProvider"
import AppRouter from "./routers/AppRouter"

const App = () => {
	return (
		<div>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</div>
	)
}

export default App

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NAVBAR
/* 
	Para poder marcar las pestañas activas de nuestro nav, declaramos los estilos de la clase por ej '.active'}
en el index.css. Pero no deberemos usar el clasico componente Link de react router sino NavLink.
		Para evitar que rutas como "/" permanezcan con esta clase (ya que van a matchear siempre), vamos a usar
(como en Route) el parametro exact.
	Tener en cuenta si queremos mantener el estilo en el nav al estar en rutas derivadas por ej '/contact/:id'.
	En caso de querer mantener el estilo dejamos el componente tal cual, en caso de no querer mantenerlo 
usaremos tambien el parametro exact
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PARAMETROS EN RUTAS
/* 
al usar la sintaxis de :, le especificamos a la ruta que esa será una veriable
<Route path='/contact/:id' component={ContactPage} />

	Cuando en el navegador ingresemos a esa ruta se renderizará el componente especificado.
	Para poder usar esa informacion desde el componente deberemos importar el hook provisto por react-router-dom
llamado useParams().
	Esto nos devolverá un objeto con los distintos parametros que pudiera tener la url. Decimos distintos 
parametros porque podriamos tener una ruta como /:username/:category/:posts...

	- VER: pages/ProfilePage.jsx

	--URL: /profile/Poker
	-----------------------------------------
	const params = useParams()
	// => {username: "Poker"}
	-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PARAMETROS TIPO QUERY
/* 
	Cuando estemos en la ruta deseada, querremos pasarle un parametro o más mediante una query.
	Supongamos que nuestro componente maneja varias pestañas por lo que puede tener varios parámetros a recibir
por ej: /categories?tab=cocina -- /categories?tab=baño -- /categories?tab=dormitorio -- etc.
	Un ejemplo muy comun lo encontramos en paginas donde tienen paginacion y necesitan (o asi decidieron 
indicarla a traves de la url ej: /categories?skip=0&limit=10 (skip 0 limit 10, seria algo traer los elementos del 0 al 9, o skip 10 limit 10, seria traer los elementos del 10 en adelante hasta un maximo de :limit (10 en este caso)). 
		Estos son parámetros que no afectan el direccionamiento por lo que si pretendemos ir a 
/contact?skip=0&limit=10 y no hemos especificado la necesidad de esos parametros en la ruta nos llevará igualmente a contact.
		Para acceder a estos parametros usaremos otro hook useLocation(). Este hook nos devolverá un objeto del
que podremos extraer la informacion desde la key 'search'.

		OBJETO DEVUELTO:
		{
			hash: ""
			pathname: "/categories"
			search: "?skip=0&limit=10"
			state: undefined
		}

	Vemos que podemos obtener la query pero sería mucho mas util poder acceder a esos parámetros para poder
utilizarlos sin la necesidad de hacer magia con .slice(), .split(), etc...
	Usaremos una instancia del objeto URLSearchParams()  y le pasaremos como parametro el string de una query}
por ej:
	URLSearchParams("?skip=0&limit=10"), y en este momento es en el que vemos que ese parametro realmente ya lo 
tenemos en el objeto devuelto por el hook useLocation() asi que usaremos eso para darselo de parametro.
	Ahora nuestra variable se convierte en una instancia del objeto URLSearchParams y nos va a permitir extraer 
los valores de este query string. En nuestro ejemplo el objeto está vacio (nosé si en algun momento devuelve propiedades) sin embargo si vemos los metodos que posee veremos que hay muchas utilidades entre ellos get(), set(), delete(), forEach() (que nos adelanta que la query es iterable). Por el momento nos centraremos en get() que es el que nos va a permitir acceder a los valores de la query.
	Hemos de ser cuidadosos con este tipo de parametros ya que el usuario puede o no enviarlos, en caso de que 
no los envie esos valores no existiran y posiblemente nostros estemos esperandolos para trabajar con ellos, por ejemplo haciendo una consulta a una API que traiga los registros correspondientes a estos valores de paginacion, por lo que es buena practica darle un valor en caso de que ese parametro no exista.
	Algo muy comun es querer modificar el valor de estos parametros desde el propio componente por ejemplo un }
boton "next page". Para poder modificar estos valores vamos a usar el metodo set que vimos en los metodos del objeto URLSearchParams() (en nuestra instancia 'query'). Este metodo recibirá 2 parametros el primero es el parametro al que queremos acceder y el segundo su valor. Para que esto se ejecute de forma correcta necesitaremos hacerle una actualizacion a la url.
	Para actualizar la url vamos a usar otro hook llamado useHistory() que nos permitirá (entre otras cosas)
navegar entre distintas rutas, usando el metodo push() de este objeto. Podremos pasarle como parametro un objeto con las mismas propuedades que vimos que nos devolvio el hook useLocation(), es decir pathname, search, state, hash. Lo que cambiaremos sera la propiedad search ya que es la que contiene la informacion que perseguimos cambiar y el resto de propiedades del objeto no las pisaremos.
	Esta pripiedad recordemos que ya la habiamos obtenido

- VER: pages/Categories.jsx

--URL: /categories

-----------------------------------------
	const location = useLocation()
	const history = useHistory()
	const query = new URLSearchParams(location.search)
	const skip = parseInt(query.get("skip")) || 0
	const limit = parseInt(query.get("limit")) || 15
	return (
		<div>
			<h1>Categories</h1>
			<p>skip: {skip}</p>
			<p>limit: {limit}</p>
			<button
				onClick={() => {
					query.set("skip", skip + limit)
					history.push({search: query.toString()})
				}}
			>
				Next
			</button>
		</div>
	)
-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTENTICACION
/* 
	Creamos algunas rutas por ej: Login, register y dashboard y payments que pretendemos que sean privadas para 
usuarios autenticados.

	Para esto vamos a usar una tecnica especificada en la documentacionpropia de ract-router-dom que nos dice
que podemos crear un componente particular basado en la ruta pero que sea para rutas privadas.
	Este componente será una Route y como todao Route va a recibir algunos parámetros como si es exacta o no,
el path, y el componente a renderizar como parámetros basicos.

-----------------------------------------
const PrivareRoute = (props) => {
	return (
		<Route exact={props.exact} path={props.path} component={props.component} />
	)
}
-----------------------------------------

Pero como dijimos, estas propiedades podrian considerarse basicas pero podriamos estar recibiendo más 
propiedades por lo que sería buena idea usar destructuring 

-----------------------------------------
<Route {...props} />
-----------------------------------------

	Hasta este punto nuestro componente no tiene mucho sentido, y es cuando entra la parte importante en donde
tenemos que comprobar la autenticacion. Normalmente es un proceso en el que se envia una peticion a una API, verificar si el token que tiene es valido o si las credenciales que tiene son validas para generar un token entre otras formas de autenticacion, pero que nos permita verificar que el usuario existe, en ese caso guardar estos datos en un estado.
	El final de este proceso sería tener un usuario que: o sea nulo o tenga informacion

-----------------------------------------
const user = null
ó
const user = {id: 123, username: 'Poker', ...}
-----------------------------------------

	Una vez que entendemos el concepto de que puede o no existir un usuario y que nuestra ruta es privada 
y unicamente debe mostrarse cuando sí exista un usario, rapidamente podemos adivinar que necesitaremos discriminar informacion para poder hacer un renderizado condicional: En caso de que el usuario exista mostrar esto, si no existe redirigir por ejemplo a la pagina de login.
	Vamos a destructurar de las props del componente a renderizar ya que si el usuario no existe no debemos 
pasarlo como parámetro a la ruta y el resto de parametros pueden permanecer agrupados de momento. Para poder utilizar el component destructurado de los parametros necesitaremos darle un alias para que React entienda que nos referimos a un componente, debido a que la proppiedad nos llega en lower case y para trabajar con componentes estos deben tener su primer letra en mayuscula. 

-----------------------------------------
const PrivareRoute = ({component: Component, ...rest}) => {
	return (
		<Route {...rest}>
			<Component />
		</Route>
	)
}
-----------------------------------------

	Utilizando el metodo Redirect de react-router-dom nos ayudaremos para hacer un ternario que nos permita en 
caso de que exista el usuario mostar el componente y en caso contraio hacer un redireccionamiento a otra ruta para que pueda loguearse o registrarse.
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTH PROVIDER
// en esta parte vamos a usar conceptos sobre Context en los que no voy a profundizar.
/* 



-----------------------------------------

-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/* 



-----------------------------------------

-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/* 



-----------------------------------------

-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/* 



-----------------------------------------

-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/* 



-----------------------------------------

-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/* 



-----------------------------------------

-----------------------------------------
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/* 



-----------------------------------------

-----------------------------------------
*/

// https://www.youtube.com/watch?v=oDQAzTJrbSI&t
