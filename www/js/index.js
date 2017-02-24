// Initialiser l'application : ajout des listeners
function initialize() {
  chercherCitation();
}

// Lancer l'application
initialize();

// Afficher la deuxième page
function chercherCitation() {
	// Requête HTTP pour récupérer la météo
	var url = "http://api.icndb.com/jokes/random";
	var requete = new XMLHttpRequest();
	requete.open('GET', url, true);
	requete.send();

	// Créer l'élément qui affiche la météo
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
