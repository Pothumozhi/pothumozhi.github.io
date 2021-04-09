var parsedRequest;
var alltranslations;
function appendTranslations(){
	alltranslations = document.getElementById("alltranslations")
	var jsonRequest = new XMLHttpRequest()
    jsonRequest.open("GET","https://raw.githubusercontent.com/NewtronReal/pothumozhi/main/translations.json",true)
    jsonRequest.onload = () => {
        parsedRequest = JSON.parse(jsonRequest.responseText)
        appendChildren(parsedRequest)
    }
    jsonRequest.send()
}
function appendChildren(request){
	for(var i in request){
		console.log(i)
		alltranslations.insertAdjacentHTML("beforeend",'<div class="itemrect" selected="false">\n<p class="itemnameen" description="'+request[i]["description"]+'">'+i+'</p>\n<p class="itemnamell">'+request[i].translation+'</p>\n<button class="speakbutton" type="button">\nപറയൂ\n<img class="speakicon" src="src/speaker-disabled.svg" alt="ഹ" width="12" height="12">\n</button>\n</div>')
	}
}
