// Lancer l'application
initialize();

// Initialiser l'application : afficher une citation et un gif au hasard
function initialize() {
  chercherCitation();
	chercherGif();
}

// Récupérer une citation
function chercherCitation() {
	// Requête HTTP pour récupérer la citation
	var url = "http://api.icndb.com/jokes/random";
	var requete = new XMLHttpRequest();

	// Envoi de la requête
	requete.open('GET', url, true);
	requete.send();

	// Modifier le texte pour afficher la citation quand la requête revient
	requete.onreadystatechange = function (aEvt) {
		if (requete.readyState == 4) {
			if (requete.status == 200) {
				var reponse = requete.responseText;
				var blague = JSON.parse(reponse);

				document.getElementById('citation').innerHTML = blague.value.joke;
			}
		}
	}
}

// Récupérer un gif
function chercherGif() {
	// Requête HTTP pour récupérer le gif
	var apiKey = "dc6zaTOxFJmzC";
	var id = idGifAleatoire();
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

				document.getElementById('gif').src = gif.data.images.fixed_height.url;
			}
		}
	}
}

// Retourne un id de gif aléatoire
function idGifAleatoire() {
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
