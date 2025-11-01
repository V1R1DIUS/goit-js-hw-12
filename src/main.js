import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term.",
      position: "topRight",
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: "No results",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

createGallery(data.hits);

// показуємо кнопку тільки якщо є ще результати
if (data.totalHits > currentPage * 15) {
  showLoadMoreButton();
} else {
  hideLoadMoreButton();
}

  } catch (error) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    console.error(error);
  }
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    createGallery(data.hits);

    const cardHeight = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    const totalLoaded = currentPage * 15;
    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "End of results",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  }
});
