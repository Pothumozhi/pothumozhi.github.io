var previouse;
var previousLl;
function selectMe(item){
	item.setAttribute("selected","true");
	if(previouse){
		previouse.setAttribute("selected","false")
	}
	previouse = item;
	let engword = document.getElementById("englishword")
	let meaning = document.getElementById("meaning")
	let description = document.getElementById("description")
	engword.innerHTML = item.querySelector('p[class="itemnameen"]').innerHTML
	meaning.innerHTML = item.querySelector('p[class="itemnamell"]').innerHTML
	description.innerHTML = item.getAttribute("description")||"null"
}

function selectLanguage(item){
	item.setAttribute("selected","true");
	if(previouse){
		previouse.setAttribute("selected","false")
	}
	previouse = item;
	let engword = document.getElementById("englishword")
	let meaning = document.getElementById("meaning")
	let description = document.getElementById("description")
	engword.innerHTML = item.getAttribute("itemnameen")
	meaning.innerHTML = item.innerHTML
	description.innerHTML = item.getAttribute("description")||"null"
}
