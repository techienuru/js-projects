const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2RhYTExNGNjYWZiMTMwZGI3M2RjZTFiY2E1MzA4NyIsIm5iZiI6MTc0MTM0NTI0NS41NjMsInN1YiI6IjY3Y2FkMWRkNTQ3ODNjYWFhM2FmZGYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0SR01EI4kgF0LS2jXftX3L_WZjGnIMOlHA9gr2Q8oXk"
  }
};

async function getPopular() {
  const result = await fetch(
    "https://api.themoviedb.org/3/movie/popular?append_to_response=videos,credits",
    options
  );
  const moviesObj = await result.json();
  return moviesObj.results;
}

export async function showPopular() {
  const moviesArr = await getPopular();

  const movieRow = document.querySelector("#movies-row");

  let movieCardHTML = "";

  moviesArr.forEach((movie) => {
    movieCardHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card p-0">
            <div class="card-header p-0">
                <a href="./movie-details.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Movie Image" class="img-fluid" />
                </a>
            </div>
            <div class="card-body text-center p-2">
                <h5>${movie.title}</h5>
                <p>Release: ${movie.release_date}</p>
            </div>
            </div>
        </div>
    `;
  });

  movieRow.innerHTML = movieCardHTML;
}

function getURLID() {
  const url = new URL(window.location.href);
  const searchURLID = url.searchParams.get("id");
  return searchURLID;
}

async function getMovieDetails() {
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${getURLID()}?append_to_response=videos,credits`,
    options
  );
  const movieObj = await result.json();
  return movieObj;
}

function getMovieGenres(movieGenres) {
  let genriesHTML = "";

  for (let i = 0; i < movieGenres.length; i++) {
    const movieGenre = movieGenres[i];

    if (i === movieGenres.length - 1) {
      genriesHTML += `
        <span class="movie-genre-type">${movieGenre.name}.</span>
    `;
    } else {
      genriesHTML += `
        <span class="movie-genre-type">${movieGenre.name} |</span>
    `;
    }
  }

  return genriesHTML;
}

function getPrdctnCompanies(prdctnCompanies) {
  let prdctnCompaniesHTML = "";

  for (let i = 0; i < prdctnCompanies.length; i++) {
    const prdctnCompany = prdctnCompanies[i];

    if (i === prdctnCompanies.length - 1) {
      prdctnCompaniesHTML += `
        <span class="movie-genre-type">${prdctnCompany.name}.</span>
    `;
    } else {
      prdctnCompaniesHTML += `
        <span class="movie-genre-type">${prdctnCompany.name} |</span>
    `;
    }
  }

  return prdctnCompaniesHTML;
}

export async function showMovieDetails() {
  const movieObj = await getMovieDetails();

  let movieDetailsHTML = `
    <div class="d-flex justify-content-center align-items-center">
        <img
            src="https://image.tmdb.org/t/p/w500/${movieObj.poster_path}"
            alt="Movie Image"
            width="500"
            height="200"
            class="img-fluid"
        />
    </div>
    <div class="movie-details-wrapper my-5">
        <h5 class="movie-title text-center fw-bold my-3">
            ${movieObj.title}
        </h5>
        <p class="movie-star">
            <i class="fas fa-star me-1"></i>
            ${movieObj.vote_average} / 10
        </p>
        <p class="movie-release-date">
            <span class="fw-bold">Release date:</span>
            ${movieObj.release_date}
        </p>
        <p class="movie-details">
            ${movieObj.overview}
        </p>
        <p class="movie-genre">
            <span class="movie-genre-header fw-bold">Genre:</span>
            ${getMovieGenres(movieObj.genres)}
        </p>
        <a href="${
          movieObj.homepage
        }" class="movie-site-link btn"> Visit Movie Homepage </a>
        <h5 class="text-center fw-bold my-3">MOVIE INFO</h5>
        <p class="movie-revenue">
            <span class="revenue-title">Revenue: </span>
            <span class="revenue-text">
                $${movieObj.revenue.toLocaleString()}
            </span>
        </p>
        <p class="movie-runtime">
            <span class="runtime-title">Runtime: </span>
            <span class="runtime-text">
                ${movieObj.runtime} minutes
            </span>
        </p>
        <p class="movie-status">
            <span class="status-title">Status: </span>
            <span class="status-text">${movieObj.status}</span>
        </p>
        <p class="movie-prdtn-company">
            <span class="prdtn-company-title">Production Companies:</span>
            <span class="prdtn-company-text">
                ${getPrdctnCompanies(movieObj.production_companies)}
            </span>
        </p>
    </div>
  `;

  document.querySelector("#mv-details-wrapper").innerHTML = movieDetailsHTML;
}

async function getRecommMovies() {
  const result = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?append_to_response=videos,credits",
    options
  );
  const moviesObj = await result.json();
  return moviesObj.results;
}
export async function showRecommMovies() {
  const moviesArr = await getRecommMovies();
  console.log(moviesArr);

  const movieRow = document.querySelector("#suggested-movies-row");

  let movieCardHTML = "";

  moviesArr.forEach((movie) => {
    movieCardHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card p-0">
            <div class="card-header p-0">
                <a href="./movie-details.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Movie Image" class="img-fluid" />
                </a>
            </div>
            <div class="card-body text-center p-2">
                <h5>${movie.title}</h5>
                <p>Release: ${movie.release_date}</p>
            </div>
            </div>
        </div>
    `;
  });

  movieRow.innerHTML = movieCardHTML;
}
