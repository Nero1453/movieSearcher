let movieNameRef = document.getElementById('search-input');
let searchBtnRef = document.getElementById('search-btn');
let result = document.getElementById('result');

let getMovieName = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;    

    // if is empty, return
    if (movieName.lenght <= 0) {
        result.innerHTML = '<h3 class="error-msg">Enter movie name...</h3>';
    }

    // imputs isn't empty, fetch API
    else{
        fetch(url).then((response) => response.json()).then((data) => {
            if (data.Response == 'True') {
                result.innerHTML = `
                <div class="movie-info">
                <img src=${data.Poster} class="img-movie">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre-info">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
                <h3>PLot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            `;
            }
            // if movie isn't found
            else{
                result.innerHTML = `<h3 class="error-msg">${data.Error}</h3>`;
            }
        })
        // if error occurs
        .catch(() => {
            result.innerHTML = '<h3 class="error-msg">Error Occurred</h3>';
        });
    }
}

searchBtnRef.addEventListener('click', getMovieName);
window,addEventListener('load', getMovieName);