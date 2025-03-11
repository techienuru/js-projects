"use strict";

import { showPopular } from "./api.js";
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

// Displaying Popular Movies
showPopular();
