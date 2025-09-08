const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const fallingBg = document.getElementById("falling-bg");

const newFlag = (element) => {
  let currency = element.value;
  let country = countryList[currency].code;
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

for (let select of dropDowns) {
  for (let currency in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currency;
    newOption.innerText = currency;
    if (select.name === "from" && currency === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currency === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    newFlag(e.target);
  });
}

newFlag(fromCurr);
newFlag(toCurr);

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  btn.disabled = true;
  btn.innerText = "Converting.....";
  updateMsg();
});

const updateMsg = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}/${fromCurr.value}`;
  let response = await fetch(url);
  let data = await response.json();

  let rate = data.rates[toCurr.value];
  let finalAmt = (amtVal * rate).toFixed(2);

  console.log(finalAmt);
  msg.innerHTML = `<u>${amtVal}</u> ${
    countryList[fromCurr.value].name
  } <br>↟↡ <br><u>${finalAmt}</u> ${countryList[toCurr.value].name}`;

  btn.disabled = false;
  btn.innerText = "click here to convert";
};

function createCoin() {
  const coin = document.createElement("span");
  coin.innerText = "⚪";
  coin.className = "money";
  coin.style.left = Math.random() * 100 + "vw";
  fallingBg.appendChild(coin);
  setTimeout(() => {
    coin.remove();
  }, 6000);
}

setInterval(createCoin, 200);
window.addEventListener("load", () => {
  updateMsg();
});
