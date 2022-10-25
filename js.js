// nombre de partie choisis 
//partie choisis resultat 
function valider_parties (){
  if(localStorage.getItem("partie") == "3" && etatJeu.scoreJ1 == 3 || etatJeu.scoreJ2 == 3)
  return document.location.href="index.html"; 
  if(localStorage.getItem("partie") == "5" && etatJeu.scoreJ1 == 5 || etatJeu.scoreJ2 == 5)
  return document.location.href="index.html";
  if(localStorage.getItem("partie") == "10" && etatJeu.scoreJ1 == 10 || etatJeu.scoreJ2 == 10)
  
  return document.location.href="index.html";
}
//Afficher pseudo joueur 
const local = JSON.parse(localStorage.getItem("user"));
if(local != null)
{
  h1vs.textContent = `${local.joueurun} VS ${local.joueurdeux} !`
}
//Choix pseudo joueur
bouton_jouer.onclick = function() {
    const user = {
    joueurun: joueurun.value,
    joueurdeux: joueurdeux.value,
};
localStorage.setItem("partie",choix_nbr_parties.value)
localStorage.setItem("user",JSON.stringify(user))

//Interdire pseudo vide
let premier_pseudo = document.getElementById("joueurun").value;
let deuxieme_pseudo = document.getElementById("joueurdeux").value;
let partie = document.getElementById("choix_nbr_parties").value;
console.log(partie)
if (premier_pseudo === "" || premier_pseudo === null || deuxieme_pseudo === "" || deuxieme_pseudo === null){
    alert("Veuillez confirmez vos paramètres")
  return false    
}
};

//clear cache
function fd() {
  localStorage.clear();
  document.location.reload();
};
//Déclaration pr le jeu
let cases = [...document.getElementsByClassName("cases")];
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let égalité = document.getElementById("égalité");
let joueur = document.getElementById("joueur");
let etatJeu = {
  joueurEnCours: 1,
  scoreJ1: 0,
  scoreJ2: 0,
  égalité: 0,
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  c8: 0,
  c9: 0,
};
  j1.textContent = `${local.joueurun}`;
  j2.textContent = `${local.joueurdeux}`;
  joueur.textContent = `${local.joueurun}`;

const resetetatJeu = function() {
  joueurEnCours = 1;
  etatJeu.c1 = 0;
  etatJeu.c2 = 0;
  etatJeu.c3 = 0;
  etatJeu.c4 = 0;
  etatJeu.c5 = 0;
  etatJeu.c6 = 0;
  etatJeu.c7 = 0;
  etatJeu.c8 = 0;
  etatJeu.c9 = 0;
  nombreClics = 10;
  c1.style.backgroundColor = 'white';
  c2.style.backgroundColor = 'white';
  c3.style.backgroundColor = 'white';
  c4.style.backgroundColor = 'white';
  c5.style.backgroundColor = 'white';
  c6.style.backgroundColor = 'white';
  c7.style.backgroundColor = 'white';
  c8.style.backgroundColor = 'white';
  c9.style.backgroundColor = 'white';
};
  
const verifierVictoire = function()  {
  if (//victoire
    (etatJeu.c1 == etatJeu.c2 && etatJeu.c2 == etatJeu.c3 && etatJeu.c1 > 0) ||
    (etatJeu.c1 == etatJeu.c4 && etatJeu.c4 == etatJeu.c7 && etatJeu.c1 > 0) ||
    (etatJeu.c1 == etatJeu.c5 && etatJeu.c5 == etatJeu.c9 && etatJeu.c1 > 0) ||
    (etatJeu.c3 == etatJeu.c5 && etatJeu.c5 == etatJeu.c7 && etatJeu.c7 > 0) ||
    (etatJeu.c2 == etatJeu.c5 && etatJeu.c5 == etatJeu.c8 && etatJeu.c2 > 0) ||
    (etatJeu.c3 == etatJeu.c6 && etatJeu.c6 == etatJeu.c9 && etatJeu.c3 > 0) ||
    (etatJeu.c4 == etatJeu.c5 && etatJeu.c5 == etatJeu.c6 && etatJeu.c4 > 0) ||
    (etatJeu.c7 == etatJeu.c8 && etatJeu.c8 == etatJeu.c9 && etatJeu.c7 > 0)
  ) {
    return true;
  } else if (//égalité
    etatJeu.c1 !== 0 &&
    etatJeu.c2 !== 0 &&
    etatJeu.c3 !== 0 &&
    etatJeu.c4 !== 0 &&
    etatJeu.c5 !== 0 &&
    etatJeu.c6 !== 0 &&
    etatJeu.c7 !== 0 &&
    etatJeu.c8 !== 0 &&
    etatJeu.c9 !== 0
  ) {//si rien jeu
      return null;
  } else {
      return false;
  }
};
const jouerCase = function(e)  {
  let idCase = e.target.id;
  
    // si case déjà jouée on ne fait rien
  if (etatJeu[idCase] !== 0) return;
  
  etatJeu[idCase] = etatJeu.joueurEnCours;
  
  let isVctoire = verifierVictoire();

  if (isVctoire === true) {
    //victoire
  alert("Le gagnant est " + joueur.textContent);

  if (etatJeu.joueurEnCours == 1) {
      etatJeu.scoreJ1++;
      score1.textContent = etatJeu.scoreJ1;
  }
  else {
    etatJeu.scoreJ2++;
    score2.textContent = etatJeu.scoreJ2;
  }
  resetetatJeu();
  valider_parties ();
  cases.forEach((c) => (c.textContent = ""));
} 
  else if (isVctoire === null) {//égalité
    alert("Match nul !");
    etatJeu.égalité++;
    égalité.textContent = etatJeu.égalité;
    resetetatJeu();
    cases.forEach((c) => (c.textContent = ""));
  } 
  else if (isVctoire === false) { // sinon on continue le jeu
    if (etatJeu.joueurEnCours == 1) {
      etatJeu.joueurEnCours = 2;
      e.target.textContent = "X";
      joueur.textContent = `${local.joueurdeux}`;
    } 
    else{
      etatJeu.joueurEnCours = 1;
      e.target.textContent = "O";
      joueur.textContent = `${local.joueurun}`;
    }
  }
};
  cases.forEach(function(el)  {
    el.addEventListener("click", jouerCase);
  });
//changement de couleur
function couleur1(){
  c1.style.backgroundColor = 'green';}
function couleur2(){
  c2.style.backgroundColor = 'red';}
function couleur3(){
  c3.style.backgroundColor = 'yellow';}
function couleur4(){
  c4.style.backgroundColor = 'cyan';}
function couleur5(){
  c5.style.backgroundColor = 'purple';}
function couleur6(){
  c6.style.backgroundColor = 'pink';}
function couleur7(){
  c7.style.backgroundColor = 'orange';}
function couleur8(){
  c8.style.backgroundColor = 'grey';}
function couleur9(){
  c9.style.backgroundColor = 'blue';
};
  
//fleche menu
function return_menu(){
    window.location.href = "index.html";
}

//Compteurs coups
let nombreClics = 9;
function comptage() {
  nombreClics--;
  document.getElementById("nombreClics").textContent   = "Il reste " + nombreClics +" coups";
}
document.getElementById("morpionbloc").addEventListener("click", comptage);
