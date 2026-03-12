async function getWeather() {
try {
const lat = 39.9526;
const lon = -75.1652;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;

const res = await fetch(url);
const data = await res.json();

const temp = Math.round(data.current.temperature_2m);
const code = data.current.weather_code;

document.getElementById("weather").textContent = `${temp}°F · ${weatherCodeToText(code)}`;
document.getElementById("weather-icon").textContent = weatherCodeToIcon(code);
} catch (err) {
document.getElementById("weather").textContent = "Weather hidden in the mist";
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
oracle = "The garden rests in dark soil. A good day for quiet beginnings.";
} else if (phase < 0.22) {
phaseName = "Waxing Crescent";
phaseIcon = "🌒";
oracle = "Tender sprout energy. Start small, but start.";
} else if (phase < 0.28) {
phaseName = "First Quarter";
phaseIcon = "🌓";
oracle = "Growth asks for structure today. Stake the stems you want to keep.";
} else if (phase < 0.47) {
phaseName = "Waxing Gibbous";
phaseIcon = "🌔";
oracle = "The greenhouse is gathering momentum. Nourish what is already blooming.";
} else if (phase < 0.53) {
phaseName = "Full Moon";
phaseIcon = "🌕";
oracle = "Everything glows a little brighter. Let yourself be seen.";
} else if (phase < 0.72) {
phaseName = "Waning Gibbous";
phaseIcon = "🌖";
oracle = "Harvest what worked. Share the bloom, keep the wisdom.";
} else if (phase < 0.78) {
phaseName = "Last Quarter";
phaseIcon = "🌗";
oracle = "Prune gently. Not everything needs to keep growing.";
} else {
phaseName = "Waning Crescent";
phaseIcon = "🌘";
oracle = "Compost the old season. Make room for the next little miracle.";
}

document.getElementById("moon-phase").textContent = phaseName;
document.getElementById("moon-icon").textContent = phaseIcon;
document.getElementById("oracle-message").textContent = oracle;
}
getWeather();
getMoonPhase();
