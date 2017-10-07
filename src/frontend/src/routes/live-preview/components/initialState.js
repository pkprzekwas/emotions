
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
};

export default initialState
