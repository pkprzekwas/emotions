import React from 'react'

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
];

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
);

export default EmotionsBars
