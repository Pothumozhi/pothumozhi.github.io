function checkFields(){
	var translation = document.getElementById("translationsuggestion");
	var englishword = document.getElementById("wordsuggestion");
	var description = document.getElementById("descriptionsuggestion");
	var requiredlist = [englishword,translation,description];
	for(var field of requiredlist){
		if(!field.value){
			return null;
		}
	}
	return true;
}
function closeSuggestion(){
	var fields = document.querySelectorAll(".collector");
	for(var field of fields){
		field.value = null;
		document.getElementById("overlay1").style.display = "none";
	}
}
function showSuggestion(){
	document.getElementById("overlay1").style.display = "flex";
}
function uploadToCloud(){
	var translation = document.getElementById("translationsuggestion");
	var englishword = document.getElementById("wordsuggestion");
	var description = document.getElementById("descriptionsuggestion");
	var requiredlist = [englishword,translation,description];
	for(var field of requiredlist){
		if(!field.value){
			field.parentElement.classList.add("nullerror");
			field.focus();
			return null;
		}
	}
	var radio;
	var element = document.getElementById("suggestionform");
	for(var i of element.querySelectorAll('input[type="radio"]')){
		if(i.checked){
			radio = i.value;
		}
	}
	var objectToReturn = {englishword:englishword.value,description:description.value, translation:translation.value, type:radio,upvote:0};
	return objectToReturn;
}
function fieldChecker(element){
	if(element.value.replace(/\s/g, "")==""||!element.value){
		element.parentElement.classList.add("nullerror")
	}else{
		element.parentElement.classList.remove("nullerror")
	}
	if(checkFields()){
		document.getElementById("submit").removeAttribute("disabled")
	}else{
		document.getElementById("submit").setAttribute("disabled","")
	}
}
