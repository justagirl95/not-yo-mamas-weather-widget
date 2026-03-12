async function getWeather() {
try {
const lat = 39.9526;
const lon = -75.1652;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;

const res = await fetch(url);
const data = await res.json();

const temp = Math.round(data.current.temperature_2m);
const code = data.current.weather_code;

const weatherText = weatherCodeToText(code);
const weatherIcon = weatherCodeToIcon(code);

document.getElementById("weather").textContent = `${temp}°F · ${weatherText}`;
document.getElementById("weather-icon").textContent = weatherIcon;
} catch (err) {
document.getElementById("weather").textContent = "Unable to load weather";
}
}

function weatherCodeToText(code) {
const map = {
0: "Clear",
1: "Mostly clear",
2: "Partly cloudy",
3: "Overcast",
45: "Fog",
48: "Icy fog",
51: "Light drizzle",
53: "Drizzle",
55: "Heavy drizzle",
61: "Light rain",
63: "Rain",
65: "Heavy rain",
71: "Light snow",
73: "Snow",
75: "Heavy snow",
80: "Rain showers",
81: "Heavy showers",
82: "Wild showers",
95: "Thunderstorm"
};

return map[code] || "Sky in flux";
}
function weatherCodeToIcon(code) {
if (code === 0) return "☀️";
if (code === 1) return "🌤️";
if (code === 2) return "⛅";
if (code === 3) return "☁️";
if (code === 45 || code === 48) return "🌫️";
if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
if ([71, 73, 75].includes(code)) return "❄️";
if (code === 95) return "⛈️";
return "✨";
}

function getMoonPhase() {
const now = new Date();
const lp = 2551443;
const newMoon = new Date("2001-01-24T13:44:00Z").getTime() / 1000;
const phase = ((now.getTime() / 1000 - newMoon) % lp) / lp;

let phaseName = "";
let phaseIcon = "";
let oracle = "";

if (phase < 0.03 || phase > 0.97) {
phaseName = "New Moon";
phaseIcon = "🌑";
oracle = "A quiet soil moment. Rest, reset, and plant intentions gently.";
} else if (phase < 0.22) {
phaseName = "Waxing Crescent";
phaseIcon = "🌒";
oracle = "Tiny green shoots energy. Start small and trust the unfolding.";
} else if (phase < 0.28) {
phaseName = "First Quarter";
phaseIcon = "🌓";
oracle = "Momentum with a little tension. Prune distractions and keep growing.";
} else if (phase < 0.47) {
phaseName = "Waxing Gibbous";
phaseIcon = "🌔";
oracle = "Almost-bloom energy. Tend what’s working and give it more light.";
} else if (phase < 0.53) {
phaseName = "Full Moon";
phaseIcon = "🌕";
oracle = "The greenhouse glows. Celebrate what’s alive, visible, and thriving.";
} else if (phase < 0.72) {
phaseName = "Waning Gibbous";
phaseIcon = "🌖";
oracle = "Harvest wisdom. Notice what flourished and what wants to be shared.";
} else if (phase < 0.78) {
phaseName = "Last Quarter";
phaseIcon = "🌗";
oracle = "Time to prune. Let go of what drains the garden.";
} else {
phaseName = "Waning Crescent";
phaseIcon = "🌘";
oracle = "Soft fading light. Compost the old and make room for the next cycle.";
}

document.getElementById("moon-phase").textContent = phaseName;
document.getElementById("moon-icon").textContent = phaseIcon;
document.getElementById("oracle-message").textContent = oracle;
}

getWeather();
getMoonPhase();
