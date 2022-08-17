const form = document.querySelector("form");
const section = document.querySelector("section");

async function imageGetter(w, h, cb) {
  try {
    let response = await fetch(`https://picsum.photos/${w}/${h}`);
    if (cb) {
      cb(response.url);
    }
  } catch (err) {
    console.error(err);
  }
}

function imagePrinter(url) {
  section.innerHTML = `<img src="${url}" alt="random image" />`;

  form.querySelector("#one").value = null;
  form.querySelector("#two").value = null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueOne = parseInt(form.querySelector("#one").value);
  const valueTwo = parseInt(form.querySelector("#two").value);

  if (
    valueOne < 100 ||
    valueOne > 300 ||
    valueTwo < 100 ||
    valueTwo > 300 ||
    isNaN(valueOne) ||
    isNaN(valueTwo)
  ) {
    section.innerHTML = `<h2>At least one of numbers is out of 100 to 300 range...</h2>`;

    form.querySelector("#one").value = null;
    form.querySelector("#two").value = null;
  } else {
    imageGetter(valueOne, valueTwo, imagePrinter);
  }
});
