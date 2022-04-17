let url= "https://api.edamam.com/";
let arr=[];

async function loadRecipies(){
  let input=document.getElementById("searchInput").value;
  let app_ID="3ef1ffa1";
  let apiKEY="01ed32d7f78bfefa03baad0adeeda865";
  let response=await fetch(`${url}search?app_id=${app_ID}&app_key=${apiKEY}&q=${input}`);
  let data=await response.json();

  console.log(data);
  searchResult(data);
}

function searchResult(data){
let html=" ";

  for(let item of data.hits){
    // let index=arr.length +1;
    meal={
      "id" : arr.length+1,
      "name" : item.recipe.label,
      "image" : item.recipe.image,
      "type" : item.recipe.mealType,
      "servings" : item.recipe.yield,
      "nutrition" : item.recipe.totalNutrients,
      "ingredients" : item.recipe.ingredientLines,
      "directions" : item.recipe.url
    };

    html+=`<article class="card" onclick="viewRecipe(${meal.id})">
            <img src=${item.recipe.image}>
            <p class="title">${item.recipe.label}</p>
          </article>`
    
    arr.push(meal);
  }
  
  document.querySelector("#displayCards").innerHTML=html; 
}

function recipeInfo(id){
  id=id-1;
  let html="";
  let ingredients="";
  
  html=`<div id="recipe">
        <article class="details">
            <img src="${arr[id].image}">
            <h1>${arr[id].name}</h1>
            <div class="nutrition">
              <h3>nutrition</h3>
              <p id=nutritionValues>
               
              </p>
            </div>
            <h2>Ingredients</h2>           
            <div id="ingredients">
                <ul>
                </ul>
            </div>
            <div class="directions">
                <h2>Directions</h2>
                <a href="${arr[id].directions}"><button>Get Directions</button>
            </div>
        </article>
        </div>`
  
  for(let item of arr[id].ingredients){
    ingredients+=`<li>${item}</li>`
  }
                
  nutrition=`Fat: ${arr[id].nutrition.FAT.quantity} ${arr[id].nutrition.FAT.unit}<br>
            Sugar: ${arr[id].nutrition.SUGAR.quantity} ${arr[id].nutrition.SUGAR.unit}<br>
            Cholesterol: ${arr[id].nutrition.CHOLE.quantity} ${arr[id].nutrition.CHOLE.unit}<br>
            Sodium: ${arr[id].nutrition.NA.quantity} ${arr[id].nutrition.NA.unit}<br>
            Calcium: ${arr[id].nutrition.CA.quantity} ${arr[id].nutrition.CA.unit}`

  document.querySelector("#overlay").innerHTML=html;
  document.querySelector("#ingredients").innerHTML=ingredients;
  document.querySelector("#nutritionValues").innerHTML=nutrition;
}

function lunchRecipies(){
  // searchResult("lunch");
}

function viewRecipe(data){   
    recipeInfo(data);
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


