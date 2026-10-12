let role='student', trip=false, busStep=0;
const screens=['login','studentHome','studentTrack','routes','alerts','driverHome','adminHome'];

function selectRole(r){
 role=r;
 document.querySelectorAll('.role button').forEach(b=>b.classList.remove('sel'));
 document.getElementById('r'+r[0].toUpperCase()+r.slice(1)).classList.add('sel');
}
function login(){
 if(role==='student') show('studentHome');
 if(role==='driver') show('driverHome');
 if(role==='admin') show('adminHome');
}
function show(id){
 screens.forEach(s=>document.getElementById(s)?.classList.remove('active'));
 document.getElementById(id).classList.add('active');
 window.scrollTo({top:0,behavior:'smooth'});
}
function toast(msg){
 const t=document.getElementById('toast'); t.textContent=msg;t.classList.add('show');
 setTimeout(()=>t.classList.remove('show'),2200);
}
function toggleTrip(){
 trip=!trip;
 document.getElementById('tripBtn').textContent=trip?'■ END TRIP':'▶ START TRIP';
 document.getElementById('driverStatus').textContent=trip?'● LIVE':'READY';
 document.getElementById('driverStatus').style.background=trip?'#dcfce7':'#dcfce7';
 toast(trip?'Trip started — GPS sharing is ON':'Trip ended — GPS sharing stopped');
}
function simulateBus(){
 busStep=(busStep+1)%5;
 const positions=[
  ['118px','195px'],['150px','180px'],['190px','160px'],['230px','140px'],['270px','120px']
 ];
 const p=positions[busStep];
 const m=document.getElementById('busMarker');
 if(m){m.style.left=p[0];m.style.top=p[1]}
 let eta=Math.max(1,4-busStep);
 let speed=32+Math.floor(Math.random()*7)-3;
 document.getElementById('etaHome').textContent=eta;
 document.getElementById('etaTrack').textContent=eta;
 document.getElementById('speedHome').textContent=speed;
 document.getElementById('speedTrack').textContent=speed;
 document.getElementById('lastUpdate').textContent='Updated just now';
}
setInterval(simulateBus,3000);

let gpsWatchId = null;

function startGpsTest() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  if (gpsWatchId !== null) {
    return;
  }

  gpsWatchId = navigator.geolocation.watchPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      
updateGpsMap(latitude, longitude, accuracy);

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      console.log("Accuracy:", accuracy, "meters");

      const status = document.getElementById("gpsStatus");
      if (status) {
        status.textContent =
          `GPS active | Accuracy: ${Math.round(accuracy)} m`;
      }
    },
    function (error) {
      console.error("GPS error:", error.message);
      alert("GPS error: " + error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 2000,
      timeout: 15000
    }
  );
}

function stopGpsTest() {
  if (gpsWatchId !== null) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }

  const status = document.getElementById("gpsStatus");
  if (status) {
    status.textContent = "GPS stopped";
  }
}

let gpsMap = null;
let gpsMarker = null;
let gpsCircle = null;

function updateGpsMap(lat, lng, accuracy) {
  const status = document.getElementById("mapStatus");
  const mapElement = document.getElementById("gpsMap");

  if (!status || !mapElement) return;

  if (!window.L) {
    status.textContent = "Map library load nahi hui. Internet check karein.";
    return;
  }

  if (!gpsMap) {
    gpsMap = L.map("gpsMap").setView([lat, lng], 16);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(gpsMap);

    gpsMarker = L.marker([lat, lng])
      .addTo(gpsMap)
      .bindPopup("Current device location");

    gpsCircle = L.circle([lat, lng], {
      radius: accuracy
    }).addTo(gpsMap);
  } else {
    gpsMarker.setLatLng([lat, lng]);
    gpsCircle.setLatLng([lat, lng]).setRadius(accuracy);
    gpsMap.setView([lat, lng]);
  }

  status.textContent =
    `GPS active | Accuracy: ${Math.round(accuracy)} metres`;

  setTimeout(() => gpsMap.invalidateSize(), 100);
}
