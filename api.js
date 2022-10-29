window.onload = function(){
	var url = "http://localhost:8000/api/v1/titles/";
	var url_best_movies = "http://localhost:8000/api/v1/titles/?imdb_score_min=9&sort_by=-imdb_score,-votes";
	meilleurFilm(url);
	meilleursFilms(2);
	categoriesFilms(2, "Action", "id_action")
	categoriesFilms(2, "Comedy", "id_comedy")
	categoriesFilms(2, "Drama", "id_drama")

}


// Fonction pour le meilleur film
async function meilleurFilm(url) {
	// Recuperation des données des meilleurs films par API
	let best_url = url + "?imdb_score_min=9&sort_by=-imdb_score,-votes";
	let data = await get_data(best_url);
	// Eviter les erreurs avec les quotes <'> dans le chaines de caractères
	var title = data.results[0].title.toString().replace("'" , "&#39");
	var genres = data.results[0].genres.toString().replace("'", "&#39");
	var writers = data.results[0].writers.toString().replace("'", "&#39");
	var actors = data.results[0].actors.toString().replace("'", "&#39");
	// le meilleur films
	var script_html = `<div id="image" , class="card" value='<img src="${data.results[0].image_url}" ; alt="${title}"/><br><b>Titre:</b> ${title}<br><b>Genre:</b> ${genres}<br><b>Date de sortie:</b> ${data.results[0].year}<br><b>Votes:</b> ${data.results[0].votes}<br><b>Score Imdb:</b> ${data.results[0].imdb_score}<br><b>Réalisateur:</b> ${writers}<br><b>Les acteurs:</b> ${actors}'>
						   <img src="${data.results[0].image_url}" ; style="max-width:100%;height:auto; alt="${data.results[0].title}" onclick = "myfunctionModal('image')"/>
						   <div id="infoBest">
						   <b>Titre:</b> ${title}<br>
						   <b>Genre:</b> ${genres}<br>
						   <b>Date de sortie:</b> ${data.results[0].year}<br>
						   <!--<b>Resumé:</b> <i>Ce thriller médical vaut bien cette sortie, tant par l'intrigue que par les performances. Ce récit non linéaire tient le spectateur en haleine. L'équipe a soutenu que des recherches approfondies avaient été menées sur ce thriller médical, inspiré de plusieurs histoires vécues. Avec : Arjun Sarja, Shaam, Manisha Koirala, Seetha, AMR Ramesh, Neha Saxena entre autres réalisateur SK Basheed producteur Sk. Karumunnisa Music Ilaiyaraaja</i><br>-->
						   <b>Score Imdb:</b> ${data.results[0].imdb_score}<br>
						   <b>Réalisateur:</b> ${writers}<br>
						   <b>Les acteurs:</b> ${actors}
						  <br >
						  <br >
						  <a href="#" class="button">Play</a> <a href="#" class="button">info</a>
						  </div>
                       </div>`;
	var ele = document.getElementById("theBest");
	ele.innerHTML += script_html;
} 


// fonction fetch data
function get_data(url) {

    return fetch(url)
        .then(data => data.json())
        .catch(error => alert("Erreur : " + error));
};


// Pour obtenir le modal
var modal = document.getElementById("myModal");

// Pour obtenir l'élément <span> qui ferme le modal
var span = document.getElementsByClassName("close")[0];

// Fonction modal pour onclick
function myfunctionModal(id){
	var divValue = document.getElementById(id).getAttribute('value');
	var displayInfo = document.getElementById("displayInfo");
    console.log(divValue);
	displayInfo.innerHTML = "";
	displayInfo.innerHTML += divValue;
	modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur <span> (x), fermez le modal
span.onclick = function() {
  modal.style.display = "none";
}

// Lorsque l'utilisateur clique n'importe où en dehors du modal, fermez-le
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Fonction pour les meilleurs films
async function meilleursFilms(page) {
 
	var num_movies = 0Fonction pour les catégories de films
	for (var i = 1; i <= page; i++ ) {
		
		// Recuperation des données des meilleurs films par API et trier par ordre des plus aimés
		var best_url = "http://localhost:8000/api/v1/titles/?imdb_score_min=9.3&page=" + i + "&sort_by=-imdb_score,-votes";
		var data = await get_data(best_url);
		
		// ajout des films (meilleurs) au DOM HTML
		for (var j = 1; j <= Object.keys(data).length; j++ ) {
			num_movies += 1
			var title = data.results[j].title.toString().replace("'" , "&#39");
			var genres = data.results[j].genres.toString().replace("'", "&#39");
			var writers = data.results[j].writers.toString().replace("'", "&#39");
			var actors = data.results[j].actors.toString().replace("'", "&#39");
			if (num_movies === 8) { break; }
			var script_html = `<li class="carousel-item"> 
								  <div id="A${data.results[j].id}" , class="card" value='<img src="${data.results[j].image_url}" ; alt="${title}"/><br><b>Titre:</b> ${title}<br><b>Genre:</b> ${genres}<br><b>Date de sortie:</b> ${data.results[j].year}<br><b>Votes:</b> ${data.results[j].votes}<br><b>Score Imdb:</b> ${data.results[j].imdb_score}<br><b>Réalisateur:</b> ${writers}<br><b>Les acteurs:</b> ${actors}'>
								  <img src="${data.results[j].image_url}" ; class="best_class"; style="max-width:100%;height:auto; alt="${title}" onclick = "myfunctionModal('A${data.results[j].id}')"/>
								  </div>
							  </li>`;
			var ele = document.getElementById("best_movies");
			ele.innerHTML += script_html;
		}
	}
	
}

// Fonction pour les catégories de films
async function categoriesFilms(page, genres_movies, id_element) {
 
	var num_movies = 0
	for (var i = 1; i <= page; i++ ) {
		// Recuperation des données des meilleurs films par categories avec API
		var url_movies_by_genre = "http://localhost:8000/api/v1/titles/?genre=" + genres_movies + "&page=" + i + "&sort_by=-imdb_score";
		var data = await get_data(url_movies_by_genre);
		// ajout des films au DOM HTML
		for (var j = 0; j <= Object.keys(data).length; j++ ) {
			num_movies += 1
			var title = data.results[j].title.toString().replace("'" , "&#39");
			var genres = data.results[j].genres.toString().replace("'", "&#39");
			var writers = data.results[j].writers.toString().replace("'", "&#39");
			var actors = data.results[j].actors.toString().replace("'", "&#39");
			if (num_movies === 8) { break; }
			var script_html = `<li class="carousel-item"> 
								  <div id="B${data.results[j].id}" , class="card" value='<img src="${data.results[j].image_url}" ; alt="${title}"/><br><b>Titre:</b> ${title}<br><b>Genre:</b> ${genres}<br><b>Date de sortie:</b> ${data.results[j].year}<br><b>Votes:</b> ${data.results[j].votes}<br><b>Score Imdb:</b> ${data.results[j].imdb_score}<br><b>Réalisateur:</b> ${writers}<br><b>Les acteurs:</b> ${actors}'>
								  <img src="${data.results[j].image_url}" ; class="best_class"; style="max-width:100%;height:auto; alt="${title}" onclick = "myfunctionModal('B${data.results[j].id}')"/>
								  </div>
							  </li>`;
			var ele = document.getElementById(id_element);
			ele.innerHTML += script_html;
		}
	}
}
