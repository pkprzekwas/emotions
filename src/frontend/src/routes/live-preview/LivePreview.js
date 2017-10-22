import React from 'react'
import './LivePreview.scss'
import { affdex } from '../../modules/affdex/affdex'
import  cameraImage  from '../../modules/affdex/camera.jpg'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
var io2 = require('socket.io-client');


import initialState from './components/initialState'
import EmotionsBars from './components/EmotionsBars'
import EmojisBars from './components/EmojisBars'
import UserInfo from './components/UserInfo'

export class LivePreview extends React.Component {
	constructor(args) {
		super(args);
		this.state = initialState;
		this.socket = false;
	}

	componentDidMount() {
		let divRoot = document.getElementById("affdex_elements");

		let width = divRoot.width;
		let height = divRoot.height;
		let processFPS = 5;
		let faceMode = affdex.FaceDetectorMode.LARGE_FACES;

		this.detector = new affdex.CameraDetector(divRoot, width, height, processFPS);
		this.detector.detectAllEmotions();
		this.detector.detectAllExpressions();
		this.detector.detectAllEmojis();
		this.detector.detectAllAppearance();


		this.detector.addEventListener("onImageResultsSuccess", (faces, img, timestamp) => {
			if (faces.length > 0 && this.state.preview) {

				this.setState({
					emotions: faces[0].emotions,
					emojis: faces[0].emojis,
					appearance: faces[0].appearance
				});

				if(this.state.stream){
					this.socket.emit('emotion-stream', {
						id: this.state.stream.id,
						payload: {
							emotions: faces[0].emotions,
							emojis: faces[0].emojis,
							appearance: faces[0].appearance
						}
					});

				}

				this.featurePoints = faces[0].featurePoints;
				this.element = document.getElementById('face_video_canvas');
				this.contxt = this.element.getContext('2d');
				this.hRatio = this.contxt.canvas.width / img.width;
				this.vRatio = this.contxt.canvas.height / img.height;
				this.ratio = Math.min(this.hRatio, this.vRatio);

				this.contxt.strokeStyle = "#cb4b16";
				this.contxt.lineWidth = 5;
				for (var id in this.featurePoints) {
					this.contxt.beginPath();
					this.contxt.arc(this.featurePoints[id].x, this.featurePoints[id].y, 2, 0, 2 * Math.PI);
					this.contxt.stroke();
				}
			}
		});


	}

	startPreview = () => {
		if (this.detector && !this.detector.isRunning) {
			this.detector.start();
			this.setState({preview: true})
		}
	}

	stopPreview = () => {
		if (this.detector && this.detector.isRunning) {
			this.detector.stop();
			this.setState({preview: false})
			this.stopStream()
		}
	}

	startStream = () => {
		let id = new Date().getTime()
		this.setState({
			stream:{
				run: true,
				id
			}
		});
		if(!this.state.preview){
			this.startPreview()
		}
		this.socket = io2('http://192.168.56.101:8080');
		this.socket.emit("new-stream", id)
	};

	stopStream = () => {
		this.socket.emit("end-stream", {id: this.state.stream.id})
		this.setState({stream: false})
		this.socket.disconnect()
		}

	switchResultsPage = (change) => {
		let maxPage = 2
		if (this.state.activeResultsPage + change > maxPage) {
			this.setState({activeResultsPage: 0})
		}
		else if (this.state.activeResultsPage + change < 0) {
			this.setState({activeResultsPage: maxPage})
		}
		else {
			this.setState({activeResultsPage: this.state.activeResultsPage + change})
		}
	}

	getResultPageComponent = () => {
		switch (this.state.activeResultsPage) {
			case 0:
				return <EmotionsBars key={1} emotionsValues={this.state.emotions}/>
			case 1:
				return <EmojisBars key={2} emojisValues={this.state.emojis}/>
			case 2:
				return <UserInfo appearanceValues={this.state.appearance} key={3}/>
		}
	}

	render() {
		return (
			<div className="row content">
				<h1 className="text-center">Live Preview</h1>
				<hr/>
				<div className="col-md-7">
					<div className="text-center webcam-preview-container">
						<div id="affdex_elements"></div>

						{this.state.preview ? null : <img src={cameraImage}/>}
						{this.state.preview ? null :
							<button className="btn btn-info" onClick={this.startPreview}>Connect Camera</button>}
					</div>
					<div className=" webcam-preview-controller">
						<div className="form-horizontal well">
							{ this.state.stream ?
								<button href="#" className="btn btn-warning" onClick={this.stopStream}>Stop WTF</button>:
								<button href="#" className="btn btn-success" onClick={this.startStream}>Start WTF</button>
							}
							<button href="#" className="btn btn-warning" onClick={this.stopPreview}>Stop</button>
						</div>
					</div>
				</div>
				<div className="col-md-5 webcam-preview-controller">
					<div className="row well results">
						<div className="results-nav text-center">
							<div className="col-xs-6"><i className="fa fa-arrow-circle-o-left fa-2x" aria-hidden="true"
																					 onClick={() => this.switchResultsPage(-1)}/></div>
							<div className="col-xs-6"><i className="fa fa-arrow-circle-o-right fa-2x" aria-hidden="true"
																					 onClick={() => this.switchResultsPage(1)}/></div>
						</div>

						<CSSTransitionGroup
							transitionName='results-transitions'
							transitionEnterTimeout={600}
							transitionLeave={false}>
							{this.getResultPageComponent()}
						</CSSTransitionGroup>

					</div>
				</div>
			</div>
		)
	}
}

export default LivePreview
