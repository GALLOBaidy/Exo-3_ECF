//On récupère nos éléments HTML qu'on stocke dans des variable
let btnSearch = document.getElementById("btn");
let search = document.getElementById("search");
let titre = document.getElementById("titre");
let capture = document.getElementById("capture");
let famille = document.getElementById("famille");
let description = document.getElementById("description");
let img = document.getElementById("image");
//On récupère la base de l'API
const API_BASE = "https://pokeapi.co/api/v2/pokemon-species/";
search.addEventListener("input", () => {
  // Supprime tous les caractères non numériques
  search.value = numberInput.value.replace(/\D/g, "");
});
//On crée un écouteur d'événement sur le bouton recherhcer
btnSearch.addEventListener("click", () => {
  const query = search.value.trim();
  //On vérifie si la saisie est valide
  if (!query || query < 1 || query > 893) {
    titre.innerText = "";
    capture.innerText = "";
    description.innerText = "";
    famille.innerText = "";
    img.innerText = "";
    //Renvoie une alerte si ce n'est pas le cas
    return alert("Saisir une valeur valide");
  }
  //Une constante qui concatene le début de l'API et la valeur saisie
  const endpoint = `${API_BASE}${query}`;
//on transforme notre API en Json
  fetch(endpoint)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      show(data); //on affiche notre fonction
    })
    .catch(console.error);
});

//On crée notre fonction qui récupère nos éléments
function show(pokemons) {

  let nom = pokemons.name;
  let id = pokemons.id;
  let captures = pokemons.capture_rate;
  let family = pokemons.genera[3].genus;
  let des //= pokemons.flavor_text_entries[16].flavor_text;
//   let des2 = pokemons.flavor_text_entries[24].flavor_text;

  //On récupére toutes les descriptions en français qu'on ajoute dans un tableau; pour afficher le tableau
    let descriptions = [];
    for( let i=0; i< pokemons.flavor_text_entries.length; i++){
      if (pokemons.flavor_text_entries[i].language.name == "fr") {
          des = pokemons.flavor_text_entries[i].flavor_text;
          descriptions.push(des);
      }
    }

  //On ajoute les éléments récupérer dans le HTML 
  titre.innerText = "#" + id + " " + nom;
  capture.innerText = "Taux de capture : " + captures + "%";
  famille.innerText = "Famille : " + family;
  description.innerText = descriptions //+ "<br>" + des2;
}


