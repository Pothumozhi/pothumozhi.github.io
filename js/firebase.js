var firebaseConfig = {
    apiKey: "AIzaSyBJyE0odFhZUWA7pSJwL5OMQ6VuHDOCyzs",
    authDomain: "pothumozhi.firebaseapp.com",
    projectId: "pothumozhi",
    storageBucket: "pothumozhi.appspot.com",
    messagingSenderId: "708959878261",
    appId: "1:708959878261:web:d097312878e10714450c3c"
};


firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore()

const db = firestore.collection("userrequests")

function suggestNew(object){
	if(convertToValid(object.englishword)==""){
		createNotification("ഇംഗ്ലിഷ് വാക്ക് ശൂന്യമാകരുത്...","#ff7a7a")
		console.error("NullErrorNo:01::| Englishword is null")
		return false;
	}
	if(convertToValid(object.translation)==""){
		createNotification("മലയാള പരിഭാഷ ശൂന്യമാകരുത്...","#ff7a7a")
		console.error("NullErrorNo:02::| Translation is null")
		return false;
	}
	if(convertToValid(object.description)==""){
		createNotification("വിവരണം ശൂന്യമാകരുത്...","#ff7a7a")
		console.error("NullErrorNo:03::| Description is null")
		return false;
	}
	if(!checkIsMalayalam(object.translation)){
		createNotification("മലയാളമല്ലാതെ മറ്റക്ഷരങ്ങളോ പ്രത്യേക പദങ്ങളോ ഉപയോഗിക്കരുത്...","#ff7a7a")
		console.error("LanguageErrorNo:01::| Not Malayalam or Special characters are being used")
		return false;
	}
	if(!checkIsEnglish(object.englishword)){
		createNotification("ഇംഗ്ലീഷല്ലാതെ മറ്റക്ഷരങ്ങള്‍ ഉപയോഗിക്കരുത്...","#ff7a7a")
		console.error("LanguageErrorNo:02::| Not English")
		return false;
	}
	var docname = convertToValid(object.englishword).toLowerCase()+convertToValid(object.translation)+object.type
	checkDocExists(docname).then(function(value){
		console.log(value)
		if(value){
			createNotification("ഇതേ പരിഭാഷ ആരോ അയച്ചിട്ടുണ്ട്. പദതാളില്‍ നിന്നും പരിഭാഷ ഉയര്‍ത്തുകയോ താഴ്ത്തുകയോ തിരുത്തലുകള്‍ ഉപദേശിക്കുകയോ ചെയ്യൂ...","#00FF00")
			console.error("ExistErrorNo:01::| Same suggestion exist try to edit existing suggestion.")
			return false;
		}
		db.doc(docname).set({
			englishword:object.englishword, translation:object.translation, description:object.description, type:object.type, upvote:0,edits:[]
		}).then(function(){
			createNotification("ഉപദേശം അയച്ചിട്ടുണ്ട്. നന്ദി..","#00FF00")
			closeSuggestion();
		})
	})
}

async function checkDocExists(data){
	var thinglist = []
	const returnthing = await db.get().then(function(value){
		var someid = false;
		value.forEach(function(doc){
			if(doc.id == data){
				someid = true;
				return;
			}
		})
		return someid;
	})
	return returnthing;
}

function addEdit(descriptionSuggestion, docid){
	return db.doc(docid).update({
		edits:firebase.firestore.FieldValue.arrayUnion({description:descriptionSuggestion,upvote:0})
	})
}
