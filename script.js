const input = document.querySelector("input");
const btn = document.querySelector(".btn");
const main = document.querySelector(".main-info");

async function getWeatherData(search) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=68413e3f1da04d00aa430927230405&q=${search}`
  );
  const data = await response.json();
  return data.current;
}

function displayWeatherData(data) {
  const h1 = document.createElement("h1");
  h1.textContent = input.value.toUpperCase();

  const container = document.createElement("div");
  container.classList.add("container");

  const tempc = document.createElement("p");
  tempc.textContent = `Temprature: ${data.temp_c}°C`;

  const temph = document.createElement("p");
  temph.textContent = `Humidity: ${data.humidity}%`;

  const time = document.createElement("p");
  time.textContent = `Last Updated: ${data.last_updated.slice(10, 16)}`;

  const condition = document.createElement("p");
  condition.textContent = `Condition: ${data.condition.text}`;

  const img = document.createElement("img");
  img.src = data.condition.icon;

  container.append(img, tempc, temph, time, condition);
  main.innerHTML = "";
  main.append(h1, container);
}

btn.addEventListener("click", async () => {
  try {
    btn.disabled = true;
    const search = input.value.trim();
    if (search === "") {
      throw new Error("Please enter a city name");
    }
    const data = await getWeatherData(search);
    displayWeatherData(data);
    input.value = "";
    input.focus();
  } catch (err) {
    console.log(err.message);
    alert("Oops! Something went wrong. Please try again later.");
  } finally {
    btn.disabled = false;
  }
});
