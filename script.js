
/* DOM Elements*/
 const searchBtn = document.querySelector(".search-Btn");
 const searchInput = document.querySelector(".search-text");
 const allCards = document.querySelector(".Courses-Cards");
 const card = document.querySelectorAll(".card");
 const cardImage = document.querySelectorAll(".course-img img");
 const cardTitle = document.querySelectorAll(".title1");
 const cardAuthor = document.querySelectorAll(".author");
 const cardRate = document.querySelectorAll(".rate");
 const cardReview = document.querySelectorAll(".reviews-numb");
 const cardPrice = document.querySelectorAll(".price");
 const bestSeller = document.createElement("div");
 bestSeller.classList.add("seller");
 bestSeller.textContent="Best Seller";


/* Fetching Courses data from a fake API*/

const fetchCourses = async ()=>{
    
    try{let response = await fetch('http://localhost:8080/courses');
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

 fetchCourses().then(
    courseCard => {
        for (let x in courseCard)
        {
            cardImage[x].src  = courseCard[x].image;
            cardTitle[x].textContent = courseCard[x].title;
            cardAuthor[x].textContent = courseCard[x].author;
            cardRate[x].textContent = courseCard[x].rate;
            cardReview[x].textContent = `(${courseCard[x].reviews})`;
            cardPrice[x].textContent = "E£"+ courseCard[x].price;
           if(courseCard[x].bestseller)
            card[x].appendChild(bestSeller);
     

        }
    }
 )


 const filterCourses = (e) =>{
  
    e.preventDefault();
    let searchWord = searchInput.value.toUpperCase();
    console.log(searchWord);
    for(let i=0;i<cardTitle.length;++i)
    {
        let match = card[i];

        if(match){
            let textValue = match.textContent ; 
            if(textValue.toUpperCase().indexOf(searchWord) > -1){
                card[i].style.display ="";
            }
            else{
                card[i].style.display="none";
            }
        }
    }

 }
 

 searchBtn.addEventListener("click", filterCourses);
