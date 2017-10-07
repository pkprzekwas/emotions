import { Route } from 'react-router-dom'
import React from "react"

import LivePreview from './live-preview/LivePreview'
import History from './history/History'

export const routesArray = [
	{
		name: "live-preview",
		title: "Live Preview",
		icon: "fa-heartbeat",
		path: "/",
		component: LivePreview
	},
	{
		name: "history",
		title: "History",
		icon: "fa-home",
		path: "/history",
		component: History
	}
]

export const routes = routesArray.map( route => <Route exact path={route.path} component={route.component} key={route.name}/>)
