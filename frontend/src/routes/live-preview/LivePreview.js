import React from 'react'
import './LivePreview.scss'
import { affdex } from '../../modules/affdex/affdex'
import  cameraImage  from '../../modules/affdex/camera.jpg'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
var io2 = require('socket.io-client');

const initialState = {
	preview: false,
	activeResultsPage: 0,
	stream: false,
	emotions: {
		anger: 0.5,
		contempt: 0.5,
		disgust: 0.5,
		engagement: 0.5,
		fear: 0.5,
		joy: 0.5,
		sadness: 0.5,
		surprise: 0.5,
		valence: 0.5
	},
	emojis: {
		relaxed: 0.5,
		smiley: 0.5,
		laughing: 0.5,
		kissing: 0.5,
		disappointed: 0.5,
		rage: 0.5,
		smirk: 0.5,
		wink: 0.5,
		stuckOutTongueWinkingEye: 0.5,
		stuckOutTongue: 0.5,
		flushed: 0.5,
		scream: 0.5,
		dominantEmoji: "😐"
	},
	appearance: {
		gender: "-",
		glasses: "-",
		age: "-",
		ethnicity: "-"
	},
}

export class LivePreview extends React.Component {
	constructor(args) {
		super(args)
		this.state = initialState
		this.socket = false
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
		}
	}

	startStream = () => {
		this.setState({
			stream:{
				run: true,
				id: new Date().getTime()
			}
		})
		this.socket = io2.connect('localhost:8080');
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
			<div className="row">
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
								<button href="#" className="btn btn-warning" onClick={this.stopStream}>Stop Stream</button>:
								<button href="#" className="btn btn-success" onClick={this.startStream}>Start Stream</button>
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

const emotions = [
	{type: 'contempt', color: 'danger'},
	{type: 'fear', color: 'info'},
	{type: 'engagement', color: 'default'},
	{type: 'sadness', color: 'info'},
	{type: 'disgust', color: 'default'},
	{type: 'valence', color: 'danger'},
	{type: 'joy', color: 'success'},
	{type: 'anger', color: 'warning'},
	{type: 'surprise', color: 'success'}
]

const EmotionsBars = (props) => (
	<div className="row">
		<br/>
		<h3 className="text-center">Emotions</h3>
		<hr/>
		{
			emotions.map((emotion) => (
				<div key={emotion.type}>
					<div className="col-sm-12 col-md-5">
						<p className="text-muted"><strong>{emotion.type} :</strong></p>
					</div>
					<div className="col-sm-12 col-md-7">
						<div className="progress progress-striped active">
							<div className={"progress-bar progress-bar-" + emotion.color}
									 style={{width: props.emotionsValues[emotion.type] * 10 + "%"}}></div>
						</div>
					</div>
				</div>
			))
		}
	</div>
)



const emojis = [
	{type: 'relaxed', color: 'default', label: "relaxed"},
	{type: 'smiley', color: 'info', label: "smiley"},
	{type: 'laughing', color: 'success', label: "laughing"},
	{type: 'kissing', color: 'warning', label: "kissing"},
	{type: 'disappointed', color: 'danger', label: "disappointed"},
	{type: 'rage', color: 'default', label: "rage"},
	{type: 'smirk', color: 'info', label: "smirk"},
	{type: 'wink', color: 'success', label: "wink"},
	{type: 'stuckOutTongueWinkingEye', color: 'warning', label: "Tongue & Eye"},
	{type: 'stuckOutTongue', color: 'danger', label: "Tongue"},
	{type: 'flushed', color: 'default', label: "flushed"},
	{type: 'scream', color: 'info', label: "scream"},
]

const EmojisBars = (props) => (
	<div className="row">
		<br/>
		<h3 className="text-center">Emojis </h3>
		<hr/>
		<h1 className="text-center emoji">{props.emojisValues.dominantEmoji}</h1>
		{
			emojis.map((emoji) => {
				if (emoji.type != "dominantEmoji") {
					return (
						<div key={emoji.type}>
							<div className="col-sm-12 col-md-5">
								<p className="text-muted"><strong>{emoji.label} :</strong></p>
							</div>
							<div className="col-sm-12 col-md-7">
								<div className="progress progress-striped active">
									<div className={"progress-bar progress-bar-" + emoji.color}
											 style={{width: props.emojisValues[emoji.type] * 10 + "%"}}></div>
								</div>
							</div>
						</div>
					)
				}
				else{
					return null
				}
			})
		}
	</div>
)



const appearance = [
	{type: 'gender'},
	{type: 'glasses'},
	{type: 'age'},
	{type: 'ethnicity'},
]

const UserInfo = (props) => (
	<div className="row">
		<br/>
		<h3 className="text-center">User Info</h3>
		<hr/>
		{
			appearance.map((feature) => (
				<div key={feature.type}>
					<div className="col-sm-12 col-md-5">
						<p className="text-muted"><strong>{feature.type} :</strong></p>
					</div>
					<div className="col-sm-12 col-md-7">
						<p className="text-primary"><strong>{props.appearanceValues[feature.type]}</strong></p>
					</div>
				</div>
			))
		}
	</div>
)


export default LivePreview
