fetch("http://127.0.0.1:3000/customers")
  .then((response) => response.json())
  .then((result) => console.log(result));

const textInput = document.querySelector("#text-search");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
  let textValue = textInput.value;
  fetch(`http://127.0.0.1:3000/customers/${textValue}`)
    .then((response) => response.json())
    .then((result) => {
      let newDiv = document.createElement("div");
      newDiv.innerText = result;
      document.body.append(newDiv);
      console.log(result);
    });
});

