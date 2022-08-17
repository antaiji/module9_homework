let form = document.querySelector("form");
let section = document.querySelector("section");

function useRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (cb) {
        cb(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };

  xhr.send();
}

function galleryCreator(images) {
  section.innerHTML = null;
  images.forEach((image) => {
    let img = `<img src="${image.download_url}" alt="picture" width='320'; />`;
    section.innerHTML += img;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let value = document.querySelector("input").value;

  if (value < 1 || value > 10) {
    section.innerHTML = `
     <h3>Your number is out of 1 to 10 range. Please try again.</h3>
    `;
  } else {
    useRequest(`https://picsum.photos/v2/list?limit=${value}`, galleryCreator);
  }

  document.querySelector("input").value = null;
});
