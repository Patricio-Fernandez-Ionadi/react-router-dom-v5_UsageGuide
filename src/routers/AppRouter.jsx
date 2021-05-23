import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "../components/Navbar"

// ----------------------------------
import AboutPage from "../pages/AboutPage"
import CategoriesPage from "../pages/CategoriesPage"
import ContactPage from "../pages/ContactPage"
import HomePage from "../pages/HomePage"
import NotFoundPage from "../pages/NotFoundPage"
import ProfilePage from "../pages/ProfilePage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"

import PrivateRoute from "./PrivateRoute"
import DashboardPage from "../pages/DashboardPage"
import PaymentsPage from "../pages/PaymentsPage"
// ----------------------------------

const AppRouter = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/about' component={AboutPage} />
				<Route exact path='/contact' component={ContactPage} />
				<Route exact path='/' component={HomePage} />

				{/* PARAMETROS EN RUTAS */}
				<Route exact path='/profile/:username' component={ProfilePage} />

				{/* PARAMETROS TIPO QUERY */}
				<Route exact path='/categories' component={CategoriesPage} />

				{/* AUTENTICACION */}
				<Route exact path='/login' component={LoginPage} />
				<Route exact path='/register' component={RegisterPage} />

				<PrivateRoute exact path='/dashboard' component={DashboardPage} />
				<PrivateRoute exact path='/payments' component={PaymentsPage} />

				<Route path='*' component={NotFoundPage} />
			</Switch>
		</Router>
	)
}

export default AppRouter
