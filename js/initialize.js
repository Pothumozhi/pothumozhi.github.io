var parsedRequest;
var alltranslations;
var tmp = window.sessionStorage;
function appendTranslations(){
	document.children[0].setAttribute("darkmode",getCookie("darktheme"))
	alltranslations = document.getElementById("alltranslations")
	var jsonRequest = new XMLHttpRequest()
	document.firstChild
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
				addChild(item,jsonParsed[item].translation,jsonParsed[item].wordtype,jsonParsed[item]["description"])
			}
		}
	}
}
function changeAttribute(item,attribute,value){
	item.setAttribute(attribute,value)
	console.log("hello")
}
function appendChildren(request){
	for(var i in request){
		var wordtype = request[i].wordtype||""
		addChild(i,request[i].translation,request[i].wordtype,request[i]["description"])
	}
	selectMe(alltranslations.children[0].children[0])
    selectLanguage(document.querySelector('li'))
}
function addChild(englishword,translation,wordtype,description){
	alltranslations.insertAdjacentHTML("beforeend",'<div class="itemadjuster">\n<div class="itemrect" selected="false" onclick=selectMe(this) description="'+description+'">\n<div style="align-self:flex-start;height:0;"><div class="wordtype" wordtype='+wordtype+'>'+wordtype+'</div></div>\n<p class="itemnameen">'+englishword+'</p>\n<p class="itemnamell">'+translation+'</p>\n<button class="speakbutton" type="button">\nപറയൂ\n<img class="speakicon" src="src/speaker-disabled.svg" alt="ഹ" width="12" height="12">\n</button>\n</div>\n</div>')
}
function toggleDark(){
	var toggleTo = !(document.children[0].getAttribute("darkmode")=="true");
	document.children[0].setAttribute('darkmode',toggleTo)
	setCookie("darktheme",document.children[0].getAttribute("darkmode"))
}
function setCookie(cookieName, value){
	document.cookie = cookieName+"="+value+";SameSite=None;Secure;"
}
function getCookie(cookieName){
  var name = cookieName +"="
  var decoded = decodeURIComponent(document.cookie).split(";")
  for(var i = 0; i <decoded.length; i++) {
    var c = decoded[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}
function convertToValid(sentance){
	var spaceremoved = sentance.replace(/\s/g, "")
	return spaceremoved;
}
function checkIsMalayalam(sentance){
  for(var i=0;i<sentance.length;i++){
    var charcode = sentance.charCodeAt(i)
    if(!((charcode>3328&&charcode<3455)||charcode==32||(charcode>8192&&charcode<8303))){
      console.log(sentance.charCodeAt(i))
      return false
    }
  }
  return true
}
function createNotification(notify, color){
	var notificationdiv = document.createElement('div')
	notificationdiv.style = "position:fixed;left:50%;transform:translateX(-50%);bottom:10px;border-radius:10px;color:"+color+";background:var(--body-background);box-shadow:0 0 5px var(--shadow);z-index:14;padding:10px 20px;-moz-box-sizing: border-box;box-sizing: border-box;text-align: justify;text-justify: inter-word;"
	notificationdiv.innerHTML = notify;
	document.body.appendChild(notificationdiv)
	setTimeout(function(){
		document.body.removeChild(notificationdiv)
	},5000)
}
function checkIsEnglish(sentance){
	for(var i=0;i<sentance.length;i++){
		var charcode = sentance.charCodeAt(i)
		if(!(charcode>=0&&charcode<=127)){
			console.error(sentance.charAt(i))
			return false;
		}
	}
	return true;
}
