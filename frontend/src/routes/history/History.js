import React from 'react'
import './History.scss'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
var io2 = require('socket.io-client');
import moment from "moment";
import "moment-timezone";

export class History extends React.Component {
	constructor(args) {
		super(args);
		this.socket = false;
		this.state = {
			streams: []
		}
	}

	componentDidMount() {
		$.get("/api/streams", streams => {
			this.setState({streams})
		});
	}

	downloadLog = stream => {
		window.open("/api/stream/" + stream, '_blank');
	}

	render() {
		return (
			<div className="row content">
				<h1 className="text-center">History</h1>
				<hr/>
				<table className="table table-striped table-hover ">
					<thead>
					<tr>
						<th>#</th>
						<th>id</th>
						<th>Time</th>
					</tr>
					</thead>
					<tbody>
					{this.state.streams.map((stream, i) => {
						return (
						<tr key={i + 1}>
							<td>{i}</td>
							<td>{stream}</td>
							<td>{moment.unix(stream/1000).format("llll")}</td>
							<td><i onClick={() => this.downloadLog(stream)} className="fa fa-file-text-o"/></td>
							<td><i onClick={() => alert("Teraz studenty kodują!!!!!!")}  className="fa fa-line-chart"/></td>
						</tr>
						)
					})}
					</tbody>
				</table>


			</div>
		)
	}
}

export default History
