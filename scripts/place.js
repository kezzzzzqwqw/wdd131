const today = new Date();

const currentYear = today.getFullYear();

document.getElementById("currentyear").textContent = currentYear;
document.getElementById("lastModified").innerHTML = document.lastModified;

const temperatureC = 10;
const windSpeedKmh = 5;

function calculateWindChill(temp, windSpeed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
}

document.addEventListener("DOMContentLoaded", () => {
    const windChillItem = Array.from(document.querySelectorAll(".weather li"))
        .find(li => li.textContent.includes("Wind Chill"));

    let windChillValue = "N/A";

    if (temperatureC <= 10 && windSpeedKmh > 4.8) {
        windChillValue = calculateWindChill(temperatureC, windSpeedKmh).toFixed(1) + "°C";
    }

    if (windChillItem) {
        windChillItem.innerHTML = `<strong>Wind Chill:</strong> ${windChillValue}`;
    }
});