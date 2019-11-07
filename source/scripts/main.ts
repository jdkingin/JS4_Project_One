let readMore = document.getElementById("rdMore");
let dots = document.getElementById("dots");
let moreText = document.getElementById("moreText");

readMore.addEventListener('click', event => 
{
    if(dots.style.display === "none")
    {
        dots.style.display = "inline";
        readMore.innerHTML = "Read More";
        moreText.style.display ="none";
    }
    else
    {
        dots.style.display = "none";
        readMore.innerHTML = "Read Less";
        moreText.style.display ="inline";
    }
});