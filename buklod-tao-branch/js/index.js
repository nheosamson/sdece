import { getPartnersArray, addEntry } from "./firestore.js";
import { getDocIdByPartnerName, getDocByID, setCollection, getCollection, DB_RULES_AND_DATA } from "/firestore_UNIV.js";
import { getDivContent, searchLocation, panLocation } from "/index_UNIV.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// const db = getFirestore();
setCollection("buklod-official");
var colRef = getCollection();

var map = L.map("map").setView([14.673, 121.11215], 21);

console.log(colRef);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var searchControl = L.esri.Geocoding.geosearch().addTo(map);

var results = L.layerGroup().addTo(map);
var popup = L.popup();

// fix this part so that it will load the pins at start
getDocs(colRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((entry) => {
      var doc = entry.data();
      var marker;
      // Some Locations are Null
      if(doc.location_latitude != null || doc.location_longitude != null){
        marker = L.marker([
          parseFloat(doc.location_latitude),
          parseFloat(doc.location_longitude),
        ]);
      }
      getDivContent(doc.household_name).then((div) =>{
        console.log(div);
        marker.bindPopup(div);
        results.addLayer(marker);
      });
    });
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });

searchControl.on("results", function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    var marker = L.marker(data.results[i].latlng);
    //console.log(marker);
    results.addLayer(marker);
  }
});

function onMapClick(e) {
  console.log("MAP CLICK");
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  var popupContent = `
      <div class="partner-geolocation">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.66304 14.2366 10.2989 13.7678 10.7678C13.2989 11.2366 12.663 11.5 12 11.5Z" fill="#91C9DB"/>
            </svg>
            ${lat} + ${lng}
            <br>
        </div>
    <button class="addButton" data-lat="${lat}" data-lng="${lng}">Add Location</button>
  `;

  popup.setLatLng(e.latlng).setContent(popupContent).openOn(map);

  var addButton = document.querySelector(".addButton");
  addButton.addEventListener("click", function () {
    const lat = this.getAttribute("data-lat");
    const lng = this.getAttribute("data-lng");

    window.open(
      `addloc.html?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(
        lng
      )}`,
      "_blank"
    );
  });
}
document.getElementById("locationList").addEventListener("click", (event) => {
  panLocation(event.target.innerHTML);
  console.log()
});





