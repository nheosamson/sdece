import { getPartnersArray, addEntry } from "./firestore.js";
import { getDocIdByPartnerName, getDocByID, setCollection, getCollection, DB_RULES_AND_DATA } from "/firestore_UNIV.js";
// import { getDetails } from "/index_UNIV.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// const db = getFirestore();
setCollection("nstp-3");
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
      var marker = L.marker([
        parseFloat(doc.latitude),
        parseFloat(doc.longitude),
      ]);
      getDivContent(doc.household_name).then((div) =>{
        marker.bindPopup(div);
        results.addLayer(marker);
      });
    });
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });

function searchLocation(doc) {
  console.log("Search location of "+ doc.id);
  let popup = L.popup()
    .setLatLng([doc.latitude + 0.00015, doc.longitude] )
    // can use rule engine for this.
    .setContent(
      getDetails(doc.household_name)
    )
    .openOn(map);

  
  map.panTo(new L.LatLng(doc.latitude, doc.longitude));
}

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

// map.on("click", onMapClick);
map.panTo(new L.LatLng(14.652538, 121.077818));

function panLocation(name) {
  console.log("PANNNNNN to "+name);
  getDocIdByPartnerName(name).then((docId) => {
    getDocByID(docId).then((doc) => {
      searchLocation(doc);
    });
  });     
}

document.getElementById("locationList").addEventListener("click", (event) => {
  panLocation(event.target.innerHTML);
});

// Takes in a name to determine all field values which should be displayed 
// Current Issue: it doesn't display all the added things, could be due to the async nature of these functions
function getDivContent(name) {
  let div_content = ``; // This isn't affected, this is the one getting printed
  return getDocIdByPartnerName(name).then((docId) => {
    if (docId) {
      // console.log("is this seen")
      return getDocByID(docId).then((doc) => {
        // Insert the partner details into the div with class "partner-contact"
        for(let rule of DB_RULES_AND_DATA){
          if(getCollection().id === rule[0]){
            div_content += `<div class="partner-contact"> <div class="partner-label"> partner-label </div>`;
            for(let index in rule[1]){   
              div_content += `<div class="partner-activity> ${doc.household_name} </div>`;   
            }
            div_content += `</div>`;
            return div_content;
          }
        }
      });
    } else{
        console.log("No matching partner found.");
        div_content = "no partner";
      return div_content;
    }
  });
}
