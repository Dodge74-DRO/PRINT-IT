const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	},
]
// ****************************************************************************
var NbreImages=slides.length
var ImageEnCours=0  //pour rafraichissement puce puis prend la valeur de ImageAffiche
var ImageAffiche=0   //image suivante à afficher 
const Banner = document.querySelector('#banner');
const BannerImage = document.querySelector('.banner-img');
const TexteImage = document.querySelector('#banner p');
const PucesImage = document.querySelector('#banner .dots');
const ConstSlideDelai = 3000; // 3 secondes
// ****************************************************************************
// CREATION FLECHE GAUCHE avec appenChild
	let ArrowLeft = document.createElement("div")
	let NewImageLeft = document.createElement("img")
	ArrowLeft.className="arrow arrow_left"
	NewImageLeft.src ="assets/images/arrow_left.png"
	NewImageLeft.alt= "image flèche gauche"
	ArrowLeft.appendChild(NewImageLeft)
	Banner.appendChild(ArrowLeft)
// CREATION FLECHE DROITE  avec appenChild
	let ArrowRight = document.createElement("div")
	let NewImageRight = document.createElement("img")
	ArrowRight.className="arrow arrow_right"
	NewImageRight.src ="assets/images/arrow_right.png"
	NewImageRight.alt= "image flèche droite"
	ArrowRight.appendChild(NewImageRight)
	Banner.appendChild(ArrowRight)
// ****************************************************************************
// créer les puces selon le nombre d'images avec innerHTML ********************
PucesImage.innerHTML =`<div class="dot dot_selected"></div>`; // 1ère puce = sélectionnée
for (let i = 1; i<NbreImages; i++){ // puces suivantes
	PucesImage.innerHTML +=`<div class="dot"></div>`;  // puces suivanntes non sélectionnées
}
// récupérer liste des puces **************************************************
	let ListePuces=document.querySelectorAll("#banner .dots div")
//	console.log(ListePuces.length)
//	for (let i=0; i < ListPuces.length;i++){
//		console.log(ListePuces[i])
//	}
// ****************************************************************************
// Flèche Gauche UP ***********************************************************
ArrowLeft.addEventListener('click', () => {
    ImageAffiche--;
	MajSlide();
});
// ****************************************************************************
// Flèche Droite DOWN *********************************************************
ArrowRight.addEventListener('click', () => {
    ImageAffiche++;
	MajSlide();
});
// ****************************************************************************
// Affichage image selon puce choisie *****************************************
	for(let i=0;i<NbreImages;i++)	{
		ListePuces[i].addEventListener("click",()=>{
			ImageAffiche=i;
			MajSlide()})
	};
// ****************************************************************************
// Affichage image suivante et changer la puce ********************************
function MajSlide() {
//** vérifier les limites
	if (ImageAffiche<0)ImageAffiche=NbreImages-1;
	if (ImageAffiche>=NbreImages)ImageAffiche=0;
//** afficher la nouvelle image
    let imagePath = `assets/images/slideshow/${slides[ImageAffiche].image}`;
    BannerImage.src = imagePath;
    BannerImage.alt = `Slide ${ImageAffiche + 1}`;
//** Mettre à jour le texte
    const Texte = slides[ImageAffiche].tagLine;
    TexteImage.innerHTML = Texte;
//** mettre à jour les puces
	ListePuces[ImageEnCours].classList.remove("dot_selected")
	ListePuces[ImageAffiche].classList.add("dot_selected")
	ImageEnCours=ImageAffiche
}	
// ****************************************************************************
// slide auto selon délais ***************************************************
let SlideAutoDelai = setInterval(SlideAuto, ConstSlideDelai);

function SlideAuto() {
	ImageAffiche++
	MajSlide();
}
// Mettre en pause si survol du slide *****************************************
  Banner.addEventListener('mouseover', () => {
    clearInterval(SlideAutoDelai);
});
// Reprendre si on quitte le survol du slide **********************************
  Banner.addEventListener('mouseout', () => {
    SlideAutoDelai = setInterval(SlideAuto,  ConstSlideDelai);
});
// ****************************************************************************

