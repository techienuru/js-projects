import { showMovieDetails, showRecommMovies } from "./api.js";
import {
  chkInternetConn,
  hidePreLoader,
  renderCurrentYear
} from "./functions.js";

// Hides Preloader after page HTML has loaded
hidePreLoader();

// Event Listener for Online and Offline
chkInternetConn();

// Displaying Current Year in Footer
renderCurrentYear();

// Navigate Back to Previous Page
document.querySelector("#b2-prev-page").addEventListener("click", () => {
  window.history.back();
});

// Navigate Back to Movies Page
document.querySelector("#b2-home-page").addEventListener("click", () => {
  window.location.assign("index.html");
});

// Displaying Movie Details
showMovieDetails();

// Displaying Recommended Movie
showRecommMovies();
