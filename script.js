let app_ID="3ef1ffa1";
let apiKEY="01ed32d7f78bfefa03baad0adeeda865";
let url= "https://api.edamam.com";
let arr=[];

async function loadRecipies(){
  let input=document.getElementById("searchInput").value;
  let response=await fetch(`${url}/search?app_id=${app_ID}&app_key=${apiKEY}&q=${input}&from=0&to=100`);
  let data=await response.json();

  console.log(data);
  searchResult(data);
}

function searchResult(data){
let html=" ";

  for(let item of data.hits){
    meal={
      "id" : arr.length+1,
      "name" : item.recipe.label,
      "image" : item.recipe.image,
      "type" : item.recipe.mealType,
      "servings" : item.recipe.yield,
      "nutrition" : item.recipe.totalNutrients,
      "health" : item.recipe.healthLabels,
      "ingredients" : item.recipe.ingredientLines,
      "directions" : item.recipe.url
    };
    
    meal.nutrition.FAT.quantity=Math.floor(meal.nutrition.FAT.quantity);
    meal.nutrition.SUGAR.quantity=Math.floor(meal.nutrition.SUGAR.quantity);
    meal.nutrition.CHOLE.quantity=Math.floor(meal.nutrition.CHOLE.quantity);
    meal.nutrition.NA.quantity=Math.floor(meal.nutrition.NA.quantity);
    meal.nutrition.CA.quantity=Math.floor(meal.nutrition.CA.quantity);
    

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
  let tag='';
  html=`<div id="recipe">
        <article class="details">
            <img src="${arr[id].image}">
            <h1>${arr[id].name}</h1>
            <p>Yield: ${arr[id].servings}</p>
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
            <div class="tags">
              <p></p>
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

  for(let item of arr[id].health){
    tag+=`#${item}  `
  }        

  document.querySelector("#overlay").innerHTML=html;
  document.querySelector("#ingredients").innerHTML=ingredients;
  document.querySelector("#nutritionValues").innerHTML=nutrition;
  document.querySelector(".tags").innerHTML=tag;
}


async function breakfastRecipies(){
  let input=document.getElementById("searchInput").value;
  let response=await fetch(`${url}/search?app_id=${app_ID}&app_key=${apiKEY}&q=${input}&from=0&to=100&mealType=breakfast`);
  let data=await response.json();

  searchResult(data); 
}

async function lunchRecipies(){
  let input=document.getElementById("searchInput").value;
  let response=await fetch(`${url}/search?app_id=${app_ID}&app_key=${apiKEY}&q=${input}&from=0&to=100&mealType=lunch`);
  let data=await response.json();

  searchResult(data); 
}

async function dinnerRecipies(){
  let input=document.getElementById("searchInput").value;
  let response=await fetch(`${url}/search?app_id=${app_ID}&app_key=${apiKEY}&q=${input}&from=0&to=100&mealType=dinner`);
  let data=await response.json();

  searchResult(data); 
}

async function filterRecipies(){
  let input=document.getElementById("searchInput").value;
  let filter=document.getElementById("filter").value;
  let response=await fetch(`${url}/search?app_id=${app_ID}&app_key=${apiKEY}&q=${input}&from=0&to=100&health=${filter}`);
  let data=await response.json();

  searchResult(data); 
}

function captureFormDetails(){
  alert("Your feedback was submitted.");
}

function viewRecipe(data){   
    recipeInfo(data);
    document.getElementById("overlay").style.display = "block";
}
function hideRecipe() {
    document.getElementById("overlay").style.display = "none";
}


function playSlideshow(){
  let slideIndex = 0;
  showSlides(slideIndex);
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


