let url= "https://api.edamam.com/";

async function loadRecipies(){
  let app_ID="3ef1ffa1";
  let apiKEY="01ed32d7f78bfefa03baad0adeeda865";
  let response=await fetch(`${url}search?app_id=${app_ID}&app_key=${apiKEY}&q=pizza`);
  let data=await response.json();

  console.log(data);
  searchResult(data);
}

function searchResult(data){
let html=" ";
  for(let item of data.hits){
    html+=`<article class="card" onclick="viewRecipe()">
            <img src=${item.recipe.image}>
            <p class="title">${item.recipe.label}</p>
          </article>`
    recipeInfo(item);
  }
  document.querySelector("#randomCards").innerHTML=html;
}

function recipeInfo(data){
  let details=`<article class="details">
                <img src=${data.recipe.image}>
                <h1>${data.recipe.label}</h1>
                <div class="nutrition">
                    <h3>nutrition</h3>
                    <p>Calories: 20g</p>
                    <p>Carbohydrates: 100g</p>
                </div>           
                <div class="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        <li>Bread</li>
                        <li>Cheese</li>
                    </ul>
                </div>
                <div class="directions">
                    <h2>Directions</h2>
                    <ol>
                        <li>Cut Slices of cheese.</li>
                        <li>Place slices of cheese between bread slices.</li>
                    </ol>
                </div>
              </article>`


  console.log(data);
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
