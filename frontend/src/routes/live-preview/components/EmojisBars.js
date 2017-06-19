import React from 'react'

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
];

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
);

export default EmojisBars
