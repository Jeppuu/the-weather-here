// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json.weather.days[0];
      document.getElementById('summary').textContent = weather.conditions;
      document.getElementById('temp').textContent = weather.temp;
      document.getElementById('windspeed').textContent = weather.windspeed;
      document.getElementById('feels-like').textContent = weather.feelslike;
    } catch (error){
      console.error(error);
    }
    // add button click event
    const checkinBtn = document.getElementById('checkin-button');
    checkinBtn.addEventListener( 'click', async function() {
    checkinBtn.textContent = "checked in!";
      // this posts data to the database
    const data = { lat, lon, weather };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);
    });
    
  });
} else {
  console.log('geolocation not available');
}