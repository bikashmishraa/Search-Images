const accessKey="r8KGkmkNlG7PbXAaEATaxX3Lx3eQVibS6FHhssVyFY0"; 

const formEl=document.querySelector("form");
const inputEl=document.getElementById("search-input");
const searchResults=document.querySelector(".search-results");
const showMore=document.getElementById("show-more-button");

let inputData="";
let page=1;

async function searchImages(){
    inputData=inputEl.value;
    const url= `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const responsve = await fetch(url);
    const data= await responsve.json();

    const results=data.results;

    if(page===1){
        searchResults.innerHTML="";
    }

    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image=document.createElement("img");
        image.src = result.urls.small;
        image.alt=result.alt_description;
        const imagelink=document.createElement("a");
        imagelink.href=result.links.html;
        imagelink.target="_blank";
        imagelink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchResults.appendChild(imageWrapper);

    });
    page++;
    if(page>1){
        showMore.style.display="block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
})
showMore.addEventListener("click",()=>{
    searchImages();
})

const toggle=document.getElementById("toogleDark");
const body=document.querySelector("body");
const footer=document.querySelector(".copyright");
body.style.backgroundColor="Black";
body.style.color="white";

toggle.addEventListener("click",function(){
    this.classList.toggle("bi-moon")
    if(this.classList.toggle("bi-moon-full")){
        body.style.backgroundColor="White";
        body.style.color="Black";
        body.style.transition="0.9s";
        footer.style.backgroundColor="white";
        footer.style.boxShadow="none";
    }
    else{
        body.style.backgroundColor="Black";
        body.style.color="white";
        body.style.transition="0.9s";
        footer.style.backgroundColor="";
    }
})