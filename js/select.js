var previouse;
var previousLl;
function selectMe(item){
	if(item != previouse){
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
		document.documentElement.scrollTop = 0;
	}
}

function sayHello(){
	console.log('hello world')
}

function selectLanguage(item){
	if(item!=previousLl){
		item.setAttribute("selected","true");
		if(previousLl){
			previousLl.setAttribute("selected","false")
		}
		previousLl = item;
		let engword = document.getElementById("englishword")
		let meaning = document.getElementById("meaning")
		let description = document.getElementById("description")
		engword.innerHTML = item.getAttribute("itemnameen")
		meaning.innerHTML = item.innerHTML
		description.innerHTML = item.getAttribute("description")||"null"
	}
}
