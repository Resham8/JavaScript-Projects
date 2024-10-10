const catButton = document.getElementById('catButton');
const catImage = document.getElementById('catImage');
const catContainer = document.getElementById('catContainer');

async function getRandomCat() {
    const url = 'https://api.thecatapi.com/v1/images/search';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const imageUrl = data[0].url; 
        displayCat(imageUrl);
    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
}


function displayCat(imageUrl) {
    catImage.src = imageUrl;
    catImage.style.display = 'block'; 
}

catButton.addEventListener('click', getRandomCat);
