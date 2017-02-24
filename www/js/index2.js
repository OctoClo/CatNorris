// Initialiser l'application : ajout des listeners
function initialize() {
	document.getElementById('boutonChuckChat').addEventListener('click', allerPageChat);
  document.getElementById('boutonChatChuck').addEventListener('click', allerPageChuck);
  document.getElementById('boutonActualiser').addEventListener('click', actualiser);

}

// Lancer l'application
initialize();

// Afficher la deuxième page
function allerPageChat() {
	// Cacher bloc page 1 et afficher bloc page 2
	document.getElementById('contenuPageChuck').style.display = "none";
	document.getElementById('contenuPageChat').style.display = "block";

	// Requête HTTP pour récupérer la météo
	var ville = document.getElementById('ville').value;
	var clefAPITP = "01a963dca20d19ec3480492d1848b739"
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=" + clefAPITP;
	var requete = new XMLHttpRequest();
	requete.open('GET', url, true);
	requete.send();

	// Créer l'élément qui affiche la météo
	requete.onreadystatechange = function (aEvt) {
		if (requete.readyState == 4) {
			if (requete.status == 200) {
				var reponse = requete.responseText;
				var meteo = JSON.parse(reponse);

				document.getElementById('texte').innerHTML = "Météo de la ville " + ville + " : " + meteo.weather[0].description;
			}
		}
	}
}

// Afficher la première page
function allerPageChuck() {
	// Affiche bloc page 1 et cacher bloc page 2
	document.getElementById('contenuPageChuck').style.display = "block";
	document.getElementById('contenuPageChat').style.display = "none";
}

function chercherCitation(type) {
  if (type == "chuck") {

  }
  else if (type == "chat") {

  }
  // Appeler le webservice pour les ci
}
