import React from "react"
import { useLocation, useHistory } from "react-router"

const CategoriesPage = () => {
	const location = useLocation()
	const history = useHistory()

	const query = new URLSearchParams(location.search)

	// const skip = query.get("skip") || 0
	// const limit = query.get("limit") || 15
	// console.log("skip", skip, typeof skip)     ||        OJO QUE SON
	// console.log("limit", limit, typeof limit)  ||   VALORES DE TIPO STRING

	const skip = parseInt(query.get("skip")) || 0
	const limit = parseInt(query.get("limit")) || 15

	return (
		<div>
			<h1>CATEGORIES</h1>
			<p>skip: {skip}</p>
			<p>limit: {limit}</p>
			<button
				onClick={() => {
					// console.log("next")
					query.set("skip", skip + limit)
					// query.set("limit", 200)
					history.push({
						search: query.toString(),
					})
				}}
			>
				Next
			</button>
		</div>
	)
}

export default CategoriesPage
