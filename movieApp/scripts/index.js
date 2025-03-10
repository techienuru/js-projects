// async function fetchMovie() {
//   let result = await fetch(
//     "https://api.themoviedb.org/3/movie?api_key=57daa114ccafb130db73dce1bca53087"
//   );

//   let data = await result.json();
//   console.log(data);
// }

async function fetchMovie() {
  let result = await fetch(
    "https://api.themoviedb.org/3/movie/19167api_key=57daa114ccafb130db73dce1bca53087"
  );

  let data = await result.json();
  console.log(data);
}

fetchMovie();

// "https://api.themoviedb.org/3/movie/popular?page=3&api_key=57daa114ccafb130db73dce1bca53087"

/*
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2RhYTExNGNjYWZiMTMwZGI3M2RjZTFiY2E1MzA4NyIsIm5iZiI6MTc0MTM0NTI0NS41NjMsInN1YiI6IjY3Y2FkMWRkNTQ3ODNjYWFhM2FmZGYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0SR01EI4kgF0LS2jXftX3L_WZjGnIMOlHA9gr2Q8oXk"
  }
};

let result = await fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=57daa114ccafb130db73dce1bca53087",
  options
);

let data = await result.json();
console.log(data);
*/
