export function renderCurrentYear() {
  const date = new Date();
  const currentYear = date.getFullYear();
  document.querySelector("#current-year").innerText = currentYear;
}

export function hidePreLoader() {
  window.addEventListener("load", () => {
    document.querySelector("#pre-loader").style.display = "none";
  });
}

export function chkInternetConn() {
  const icnWrapper = document.querySelector("#icn-wrapper");
  const icnText = document.querySelector("#icn-text");

  window.addEventListener("offline", () => {
    if (icnWrapper.classList.contains("d-none")) {
      icnWrapper.classList.remove("d-none");
      icnText.textContent = "You are offline";
      setTimeout(() => {
        icnWrapper.classList.add("d-none");
      }, 5000);
    }
  });
  window.addEventListener("online", () => {
    if (icnWrapper.classList.contains("d-none")) {
      icnWrapper.classList.remove("d-none");
      icnText.textContent = "You are back online";
      setTimeout(() => {
        icnWrapper.classList.add("d-none");
      }, 5000);
    }
  });
}
