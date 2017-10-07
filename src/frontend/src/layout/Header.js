import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {routesArray} from '../routes/routes'
import PropTypes from 'prop-types';




export default class Header extends React.Component {
	constructor(args) {
		super(args)
	}

	getMenuItems = (routesArray) => {
		return routesArray.map(route =>
				<LiLink exact to={route.path} route={route} key={route.name}/>
		)
	}

	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
										data-target="#bs-example-navbar-collapse-2">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
						</button>
						<a className="navbar-brand" href="/"><i className="fa fa-heart" aria-hidden="true"></i> Emotions</a>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
						<ul className="nav navbar-nav">
							{this.getMenuItems(routesArray)}
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li><a href="#"></a></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}


class LiLink extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		var isActive = this.context.router.route.location.pathname === this.props.to;
		var className = isActive ? 'active' : '';

		return(
			<li className={className}>
				<NavLink to={this.props.to}>
					<i className={`fa ${this.props.route.icon}`} aria-hidden="true"/> {this.props.route.title}
				</NavLink>
			</li>
		);
	}
}

LiLink.contextTypes = {
	router: PropTypes.object
};
//
// class NavLink extends React.Component {
// 	render() {
// 		//let isActive = this.context.router.isActive(this.props.to, true);
// 		//let className = isActive ? "active" : "";
//
// 		return (
// 			<li className={""}>
// 				<Link {...this.props}/>
// 			</li>
// 		);
// 	}
// }
//
// NavLink.contextTypes = {
// 	router: PropTypes.object
// };

// Header.contextTypes = {
// 	router: React.PropTypes.object,
// 	location: React.PropTypes.object
// }
