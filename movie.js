import movieList from './movieList.js';
// apiKey = f8ae5e8a;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");

searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query) {
        moviesContainer.innerHTML = ""; 
        fetchMovies(query, false);
    }
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            moviesContainer.innerHTML = "";
            fetchMovies(query, false);
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const randomMovies = getRandomElements(movieList, 15); 
    randomMovies.forEach(movieTitle => {
        fetchMovies(movieTitle, true); 
    });
});

function getRandomElements(array, number) {
    const shuffled = array.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, number); 
}

async function fetchMovies(query, displayOnlyFirst) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=f8ae5e8a`);
        const data = await response.json();

        if (data.Response === "True" && data.Search.length > 0) {
            if (displayOnlyFirst) {
                displayMovies([data.Search[0]]);
            } else {
                displayMovies(data.Search);
            }
        } else {
            moviesContainer.innerHTML = `<p>No results found for "${query}"</p>`; 
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        moviesContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`; 
    }
}

function displayMovies(movies) {
    movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>  
        `;

        moviesContainer.appendChild(movieElement);
    });
}
