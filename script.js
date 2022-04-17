let url= "https://api.edamam.com/";

async function loadRecipies(){
  let app_ID="3ef1ffa1";
  let apiKEY="01ed32d7f78bfefa03baad0adeeda865";
  let response=await fetch(`${url}search?app_id=${app_ID}&app_key=${apiKEY}&q=pizza`);
  let data=await response.json();

  console.log(data);
  renderData(data);
}

function renderData(data){
let html=`<article class="card" onclick="viewRecipe()">
<img src=${data.hits[1].recipe.image}>
<p class="title">${data.hits[1].recipe.label}</p>
</article>`

  document.querySelector("#randomCards").innerHTML=html;

}

function viewRecipe(){
    document.getElementById("overlay").style.display = "block";
}
function hideRecipe() {
    document.getElementById("overlay").style.display = "none";
}

let slideIndex = 0;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
 
  if (n > slides.length){
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000);  
}
