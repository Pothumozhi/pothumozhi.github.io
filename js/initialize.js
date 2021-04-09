var parsedRequest;
var alltranslations;
var tmp = window.sessionStorage;
function appendTranslations(){
	alltranslations = document.getElementById("alltranslations")
	var jsonRequest = new XMLHttpRequest()
    jsonRequest.open("GET","https://raw.githubusercontent.com/NewtronReal/pothumozhi/main/translations.json",true)
    jsonRequest.onload = () => {
        parsedRequest = JSON.parse(jsonRequest.responseText)
        tmp.setItem("tmpData",jsonRequest.responseText)
        appendChildren(parsedRequest)
    }
    jsonRequest.send()
}
function filter(text){
	var children = alltranslations.querySelectorAll("div.itemadjuster")
	var words = text.split(" ")
	alltranslations.textContent = ""
	var jsonParsed = JSON.parse(tmp.getItem("tmpData"))
	for(var item in jsonParsed){
		for(var word of words){
			if(item.toLowerCase().includes(word.toLowerCase())||jsonParsed[item].translation.toLowerCase().includes(word.toLowerCase())){
				alltranslations.insertAdjacentHTML("beforeend",'<div class="itemadjuster">\n<div class="itemrect" selected="false" onclick=selectMe(this) description="'+jsonParsed[item]["description"]+'">\n<p class="itemnameen">'+item+'</p>\n<p class="itemnamell">'+jsonParsed[item].translation+'</p>\n<button class="speakbutton" type="button">\nപറയൂ\n<img class="speakicon" src="src/speaker-disabled.svg" alt="ഹ" width="12" height="12">\n</button>\n</div>\n</div>')
			}
		}
	}
}
function appendChildren(request){
	for(var i in request){
		alltranslations.insertAdjacentHTML("beforeend",'<div class="itemadjuster">\n<div class="itemrect" selected="false" onclick=selectMe(this) description="'+request[i]["description"]+'">\n<p class="itemnameen">'+i+'</p>\n<p class="itemnamell">'+request[i].translation+'</p>\n<button class="speakbutton" type="button">\nപറയൂ\n<img class="speakicon" src="src/speaker-disabled.svg" alt="ഹ" width="12" height="12">\n</button>\n</div>\n</div>')
	}
}
