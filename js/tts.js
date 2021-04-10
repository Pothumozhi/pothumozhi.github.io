var prevaudio;
function playAudio(item){
	if(prevaudio){
		prevaudio.pause()
		document.body.removeChild(prevaudio);
	}
	var meaning = document.getElementById("meaning").innerHTML;
	var description = document.getElementById("description").innerHTML;
	var audio = document.createElement("audio")
	audio.src = "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=1000&client=tw-ob&tl=ml-IN&q="+meaning.replace(" ", "%20")+description.replace(" ","%20");
	document.body.appendChild(audio)
	prevaudio=audio;
	audio.play()
	audio.onended = () => {
		document.body.removeChild(audio)
		prevaudio = null;
	}
}
