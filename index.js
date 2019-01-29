const express = require('express')
const app = express()

app.use(express.static('public'))
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var CombinedStream = require('combined-stream');
var speechToText = new SpeechToTextV1({
  "username": "3ed26b04-5428-4a2c-9a73-1c45908eeeeb",
  "password": "nYpYg2Y3v4NQ"
});

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/upload', upload.single('file'), function (req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log(req.file);
	console.log(req.body);

  	var combinedStream = CombinedStream.create();
  	combinedStream.append(fs.createReadStream('./uploads/'+req.file.filename));

	var recognizeParams = {
	  audio: combinedStream,
	  'content_type': 'audio/wav',
	  timestamps: true,
	  // 'word_alternatives_threshold': 0.9,
	  // keywords: ['this', 'is', 'Dan'],
	  // 'keywords_threshold': 0.5
	};

	speechToText.recognize(recognizeParams, function(error, speechRecognitionResults) {
	  if (error) {
	    res.json(error);
	  } else {
  		res.json(speechRecognitionResults);
	  }
	});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))