
/* DOM Elements*/
 const searchBtn = document.querySelector(".search-Btn");
 const searchInput = document.querySelector(".search-text");
 const coursesTitle = document.querySelector(".category-title");
 const coursesDes = document.querySelector(".category-des");
 const exploreBtn = document.querySelector(".Explore");
 const bestSeller = document.createElement("div");
 const allCards = document.querySelector(".Courses-Cards");
const card = document.querySelector('.card');
const temp = document.querySelector('#Courses-Cards');

 bestSeller.classList.add("seller");
 bestSeller.textContent="Best Seller";

const categories =['python','excel','web','javascript','data','aws','drawing'];
let current_category="python";
let current_courses={};
let courses = [];


/*Functions*/

/* Creating Rating stars*/
const createRatingStars = (rating) => {
    let RatingStars = document.createElement('span');
    RatingStars.classList.add('star');
    let rate=Math.round(rating * 10) / 10;
    let fullNo = parseInt(rate);
    //console.log(fullNo);
   
    let halfNo = rate - fullNo >= 0.4 ? 1 : 0;
    //console.log(halfNo);
    let emptyNo = 5 - fullNo - halfNo;
    for (let i = 0; i < fullNo; i++) {
        let fullStar = document.createElement('i');
        fullStar.classList.add('fa-solid');
        fullStar.classList.add('fa-star');
        RatingStars.appendChild(fullStar);
    }
    let halfStar = document.createElement('i');
    halfStar.classList.add('fa-regular');
    halfStar.classList.add('fa-star-half-stroke');
    halfNo === 1 ? RatingStars.appendChild(halfStar) : halfStar.remove();
    for (let i = 0; i < emptyNo; i++) {
        let emptyStar = document.createElement('i');
        emptyStar.classList.add('fa-regular');
        emptyStar.classList.add('fa-star');
        RatingStars.appendChild(emptyStar);
    }

    return RatingStars;
};

/*Creating Rating section in the card*/

const createRating = (rating) => {
    let ratingCont = document.createElement('div');
    let rate = document.createElement('span');
    ratingCont.classList.add('rating');
    rate.classList.add('rate');
    rate.textContent = Math.round(rating * 10) / 10;
    let stars = createRatingStars(rating);
    ratingCont.appendChild(rate);
    ratingCont.appendChild(stars);

    
    return ratingCont;
};

/*Creating Price Section in the card*/

const createPrice = (price) => {
    let coursePrice = document.createElement('div');
    coursePrice.classList.add('price');
    coursePrice.textContent = `E£${price.toString()}`;
    return coursePrice;
};

 /*Search Filtering*/

 const filterCourses = (e) =>{
  
    e.preventDefault();
    let searchWord = searchInput.value.toUpperCase();
   
    let card  = allCards.getElementsByTagName('h3');
    let discard = allCards.getElementsByClassName('card');
   console.log(discard);
    for(let i=0;i<card.length;++i)
    {      
        let match =card[i].textContent;
        console.log(match);
       // let match = allCards[i].querySelector('.title1');
        if(match){
           
            if(match.toUpperCase().indexOf(searchWord) > -1){
                discard[i].style.display ="";
            }
            else{
                discard[i].style.display="none";
            }
        }
    }
   
  

 }



/* Fetching Courses data from a fake API*/

const fetchCourses = async ()=>{
    
    try{let response = await fetch('http://localhost:8080/body/');
    let json = await response.json();
   
   if(!response.ok){
    throw new Error(`Failed to fetch courses data: ${response.status}`);
   }


   return json;
   }
catch(e){
    console.log(e);
}

}


 /*Rendering the data fetched from the API on the courses section using DOM manipulation*/

 function fill_Tabs(){

    fetchCourses().then(
        courseCard => {

            current_courses = courseCard[current_category];
           // console.log(current_courses);
            let course_name = current_courses.title.slice(15);
            coursesTitle.innerText = current_courses.header;
            coursesDes.innerText= current_courses.description;
            exploreBtn.innerText = `Explore ${course_name}`;
           // console.log(course_name);

           let data=current_courses.courses;
           courses = data.map((data) => {

                const tempCopy = temp.content.cloneNode(true).children[0];
                let cardImage = tempCopy.querySelector(".course-img img");
                let cardTitle = tempCopy.querySelector(".title1");
                let cardAuthor = tempCopy.querySelector(".author");
                cardImage.src = data.image;
                cardTitle.innerText=data.title;
                cardAuthor.innerText = data.instructors;
               
                let rating = createRating(data.rating);
                tempCopy.appendChild(rating);
                
                let price = createPrice(data.price);
                tempCopy.appendChild(price);

                if(data.bestseller)
                  tempCopy.appendChild(bestSeller);

                allCards.append(tempCopy);
              })
           
        }

        
     )
 }

 //display_courses(current_category);
 fill_Tabs();


 /* Event Listeners*/

 /* Navigation  between Tabs  */
for(const category of categories)
{
    const selectedTab = document.getElementById(category);
    if(selectedTab)
    {
        selectedTab.addEventListener("click", ()=> {
            allCards.innerHTML="";
            current_category = category;
            fill_Tabs();
        });
    }
  
}


/* Search Bar */
 searchBtn.addEventListener("click", filterCourses);
