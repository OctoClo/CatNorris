// Lancer l'application
initialize();

// Initialiser l'application : afficher une citation
function initialize() {
  chercherCitation();
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
