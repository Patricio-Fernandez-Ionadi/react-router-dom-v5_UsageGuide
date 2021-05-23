import { NavLink } from "react-router-dom"
const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink exact to='/' activeclass='active'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeclass='active'>
						Contact
					</NavLink>
				</li>
				<li>
					<NavLink to='/about' activeclass='active'>
						About
					</NavLink>
				</li>
				<li>
					<NavLink to='/categories' activeclass='active'>
						Categories
					</NavLink>
				</li>
				<li>
					<NavLink to='/login' activeclass='active'>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to='/register' activeclass='active'>
						Register
					</NavLink>
				</li>
				<li>
					<NavLink to='/dashboard' activeclass='active'>
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to='/payments' activeclass='active'>
						Payments
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
