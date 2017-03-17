// Déclarer en global les tableaux des id des gifs
var idGifChuck = [];
var idGifChat = [];

// Déclarer en global les variables qui serviront à ne pas afficher deux fois de suite le même gif
var idGifChuckPrecedent = '';
var idGifChatPrecedent = '';

// Lancer l'application
initialisation();

// Initialiser l'application
function initialisation() {
	// Ajouter des listeners aux boutons
	document.getElementById('boutonChuckChat').addEventListener('click', allerPageChat);
  document.getElementById('boutonChatChuck').addEventListener('click', allerPageChuck);
  document.getElementById('boutonActualiserChuck').addEventListener('click', actualiserPageChuck);
	document.getElementById('boutonActualiserChat').addEventListener('click', actualiserPageChat);

	// Remplir le tableau des id de gifs de Chuck Norris
	idGifChuck = [
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

	// Remplir le tableau des id de gifs de chats
	idGifChat = [
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

	// Aller à la page Chuck
  allerPageChuck();
}

// Afficher la page des chats
function allerPageChat() {
	// Cacher bloc Chuck et afficher bloc chat
	document.getElementById('contenuPageChuck').style.display = "none";
	document.getElementById('contenuPageChat').style.display = "block";

	// Effectuer les requêtes pour la page chat et mettre à jour la page
	afficherPage('chat');
}

// Afficher la page de Chuck
function allerPageChuck() {
	// Cacher bloc chat et afficher bloc Chuck
	document.getElementById('contenuPageChat').style.display = "none";
	document.getElementById('contenuPageChuck').style.display = "block";

	// Effectuer les requêtes pour la page Chuck et mettre à jour la page
	afficherPage('chuck');
}

// Actualiser la page Chuck : relancer les requêtes et les afficher
function actualiserPageChuck() {
		afficherPage('chuck');
}

// Actualiser la page Chuck : relancer les requêtes et les afficher
function actualiserPageChat() {
		afficherPage('chat');
}

// Effectuer les requêtes vers les API selon la page à afficher
function afficherPage(type) {
	chercherCitation(type);
	chercherGif(type);
}

// Récupérer une citation
function chercherCitation(type) {
	// Requête HTTP pour récupérer la citation
	if (type == 'chuck')
		var url = "http://api.icndb.com/jokes/random";
	else if (type == 'chat')
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

				if (type == 'chuck')
					document.getElementById('citationChuck').innerHTML = citation.value.joke;
				else if (type == 'chat')
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

				if (type == 'chuck')
					document.getElementById('gifChuck').src = gif.data.images.fixed_height.url;
				else if (type == 'chat')
					document.getElementById('gifChat').src = gif.data.images.fixed_height.url;
			}
		}
	}
}

// Retourne un id de gif aléatoire différent du précédent
function idGifAleatoire(type) {
	if (type == 'chuck') {
		// Génère un index aléatoire entre 0 et la taille du tableau des id, différent de l'id précédent
		do {
			var index = Math.floor(Math.random() * idGifChuck.length);
		} while (index == idGifChuckPrecedent);

		// Mettre à jour l'id précédent
		idGifChuckPrecedent = index;

		// Retourne l'id à l'index généré
		return idGifChuck[index];
	}
	else if (type == 'chat') {
		// Génère un index aléatoire entre 0 et la taille du tableau des id, différent de l'id précédent
		do {
			var index = Math.floor(Math.random() * idGifChat.length);
		} while (index == idGifChatPrecedent);

		// Mettre à jour l'id précédent
		idGifChatPrecedent = index;

		// Retourne l'id à l'index généré
		return idGifChat[index];
	}
}
