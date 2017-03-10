// Lancer l'application
initialize();

// Initialiser l'application : afficher une citation et un gif au hasard et mettre des listeners sur les boutons
function initialize() {
  chercherCitation("chuck");
	chercherGif("chuck");

	document.getElementById('boutonChuckChat').addEventListener('click', allerPageChat);
  document.getElementById('boutonChatChuck').addEventListener('click', allerPageChuck);
  //document.getElementById('boutonActualiser').addEventListener('click', actualiser);
}

// Afficher la page des chats
function allerPageChat() {
	// Cacher page Chuck et afficher page chat
	document.getElementById('contenuPageChuck').style.display = "none";
	document.getElementById('contenuPageChat').style.display = "block";

	// Afficher une citation et un gif au hasard
	chercherCitation("chat");
	chercherGif("chat");
}

// Afficher la page de Chuck
function allerPageChuck() {
	// Cacher page chat et afficher page Chuck
	document.getElementById('contenuPageChat').style.display = "none";
	document.getElementById('contenuPageChuck').style.display = "block";

	// Afficher une citation et un gif au hasard
	chercherCitation("chuck");
	chercherGif("chuck");
}

// Récupérer une citation
function chercherCitation(type) {
	// Requête HTTP pour récupérer la citation
	if (type == "chuck")
		var url = "http://api.icndb.com/jokes/random";
	else if (type == "chat")
		var url = "http://quotes.rest/qod.json?category=inspire";

	var requete = new XMLHttpRequest();

	// Envoi de la requête
	requete.open('GET', url, true);
	requete.send();

	// Modifier le texte pour afficher la citation quand la requête revient
	requete.onreadystatechange = function (aEvt) {
		if (requete.readyState == 4) {
			if (requete.status == 200) {
				var reponse = requete.responseText;
				var citation = JSON.parse(reponse);

				if (type == "chuck")
					document.getElementById('citationChuck').innerHTML = citation.value.joke;
				else if (type == "chat")
					document.getElementById('citationChat').innerHTML = citation.contents.quotes[0].quote;
			}
		}
	}
}

// Récupérer un gif
function chercherGif(type) {
	// Requête HTTP pour récupérer le gif
	var apiKey = "dc6zaTOxFJmzC";
	var id = idGifAleatoire(type);
	var url = "http://api.giphy.com/v1/gifs/" + id + "?api_key=" + apiKey;
	var requete = new XMLHttpRequest();

	// Envoi de la requête
	requete.open('GET', url, true);
	requete.send();

	// Modifier l'image pour afficher l'image quand la requête revient
	requete.onreadystatechange = function (aEvt) {
		if (requete.readyState == 4) {
			if (requete.status == 200) {
				var reponse = requete.responseText;
				var gif = JSON.parse(reponse);

				if (type == "chuck")
					document.getElementById('gifChuck').src = gif.data.images.fixed_height.url;
				else if (type == "chat")
					document.getElementById('gifChat').src = gif.data.images.fixed_height.url;
			}
		}
	}
}

// Retourne un id de gif aléatoire
function idGifAleatoire(type) {
	if (type == "chuck") {
		// Tableau des id de gifs de Chuck Norris
		var idGifChuck = [
			"RMQ7kUUhfcYj6",
			"7qZ3ZX1Gu3TZm",
			"wQvFuXLMOtw8o",
			"ylp4hl9xEaWyc",
			"VDX3bYZTc4ROg",
			"cY0bN5cDAzyjm",
			"uUfbtweIW3A7S",
			"WILokrHw5V8By",
			"PcVGf1Wg7peh2",
			"Bid9Pf0d4re6c",
			"ZWyNa2Lll2tBS",
			"UUERCo8UPauDS"
		];

		// Génère un index aléatoire entre 0 et la taille du tableau des id
		var index = Math.floor(Math.random() * idGifChuck.length);

		// Retourne l'id à l'index généré
		return idGifChuck[index];
	}
	else if (type == "chat") {
		// Tableau des id de gifs de chats
		var idGifChat = [
			"13CoXDiaCcCoyk",
			"JIX9t2j0ZTN9S",
			"yFQ0ywscgobJK",
			"Alfb46lOc1kVG",
			"uTCAwWNtz7U2c",
			"ND6xkVPaj8tHO",
			"8u9PS5l5znIbe",
			"TKfywHrPHpJiE",
			"17Q92poP1qJwI",
			"INUsrrxQW4et2",
			"SgZtvjwcfq0ww",
			"OmK8lulOMQ9XO"
		];

		// Génère un index aléatoire entre 0 et la taille du tableau des id
		var index = Math.floor(Math.random() * idGifChat.length);

		// Retourne l'id à l'index généré
		return idGifChat[index];
	}
}
