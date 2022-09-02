// create a map with leaflet
const mymap = L.map('checkinMap').setView([0, 0], 2);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
// locations on the map
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    const txt = `The weather here is ${item.weather.temp}&deg; C and it feels like ${item.weather.feelslike}&deg; C.`;
    //console.log(txt);
    marker.bindPopup(txt);
  }
  console.log(data);
}