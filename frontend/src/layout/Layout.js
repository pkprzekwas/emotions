
import React from 'react'
import Header from'./Header'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import {routes} from '../routes/routes'

export default class Layout extends React.Component {
	constructor(args) {
		super(args)

	}


	render() {
		return (
			<div>
				<Router>
					<div>
						<Header/>

						{routes}
					</div>
				</Router>
			</div>
		)
	}
}
