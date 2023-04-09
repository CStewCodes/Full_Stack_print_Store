fetch("https://print-store-backend.onrender.com/customers")
  .then((response) => response.json())
  .then((result) => console.log(result));

const textInput = document.querySelector("#text-search");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
  let textValue = textInput.value;
  fetch(`https://print-store-backend.onrender.com/customers/${textValue}`)
    .then((response) => response.json())
    .then((result) => {
      let newDiv = document.createElement("div");
      newDiv.innerText = result;
      document.body.append(newDiv);
      console.log(result);
    });
});

