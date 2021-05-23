import { Redirect, Route } from "react-router"
import useAuth from "../auth/useAuth"

// const user = null

// const user = { id: 123, username: "Poker" }

const PrivareRoute = ({ component: Component, ...rest }) => {
	const { user } = useAuth()
	return (
		<Route {...rest}>{user ? <Component /> : <Redirect to='/login' />}</Route>
	)
}

export default PrivareRoute
