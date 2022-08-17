const form = document.querySelector(".request__form");
const gallery = document.querySelector(".gallery");

function clearForm() {
  form.querySelector("#one").value = null;
  form.querySelector("#two").value = null;
}

async function imageGetter(page, limit, cb) {
  try {
    let response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
    let images = await response.json();

    if (cb) {
      cb(images);
    }
  } catch (err) {
    console.error(err);
  }
}

function galleryMaker(images) {
  images.forEach((image) => {
    let imageDiv = `
      <div class="gallery__item">
        <img class="gallery__img" src="${image.download_url}" alt="picture" />
      </div>
    `;
    gallery.innerHTML += imageDiv;

    localStorage.setItem("localImages", JSON.stringify(images));
  });
}

function initGalleryMaker() {
  const images = JSON.parse(localStorage.getItem("localImages"));

  if (images) {
    galleryMaker(images);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueOne = parseInt(form.querySelector("#one").value);
  const valueTwo = parseInt(form.querySelector("#two").value);

  if (
    (isNaN(valueOne) || valueOne < 1 || valueOne > 10) &&
    (isNaN(valueTwo) || valueTwo < 1 || valueTwo > 10)
  ) {
    gallery.innerHTML = `<h2 class="request__error">Page number and limit is out of 1 to 10 range...</h2>`;
    clearForm();
  } else if (valueOne < 1 || valueOne > 10 || isNaN(valueOne)) {
    gallery.innerHTML = `<h2 class="request__error">Page number is out of 1 to 10 range...</h2>`;
    clearForm();
  } else if (valueTwo < 1 || valueTwo > 10 || isNaN(valueTwo)) {
    gallery.innerHTML = `<h2 class="request__error">Limit is out of 1 to 10 range...</h2>`;
    clearForm();
  } else {
    imageGetter(valueOne, valueTwo, galleryMaker);

    clearForm();
    gallery.innerHTML = null;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  initGalleryMaker();
});
