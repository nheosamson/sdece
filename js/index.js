


var map = L.map('map').setView([14.651, 121.052], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var searchControl = L.esri.Geocoding.geosearch().addTo(map);

var results = L.layerGroup().addTo(map);
var popup = L.popup();

function onclickmarker(e)
{
	popup.setLatLng(e.latlng)
		.setContent("You clicked the popup at " + e.latlng.toString())
		.openOn(map);
}

searchControl.on('results', function (data) {
	results.clearLayers();
	for (var i = data.results.length - 1; i >= 0; i--) {
		var marker = L.marker(data.results[i].latlng);
		console.log(marker);
		results.addLayer(marker);
		marker.on("click", onclickmarker);
	}
});

// var map = L.map('map').setView([14.651, 121.052], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var marker = L.marker([14.6504432,121.0752025]).addTo(map);
// var marker2 = L.marker([14.6398666,121.0762999]).addTo(map);
// var popup = L.popup();

// function onclickmarker(e)
// {

// 	popup.setLatLng(e.latlng)
// 		.setContent("You clicked the map at " + e.latlng.toString())
// 		.openOn(map);
// }
// marker.on('click', onclickmarker);
// marker2.on('click', onclickmarker);


// function onMapClick(e) {
// 	popup
// 		.setLatLng(e.latlng)
// 		.setContent("You clicked the map at " + e.latlng.toString())
// 		.openOn(map);
// }
// map.on('click', onMapClick);



// FIRESTORE DATABASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";


// Your Firestore code here

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeo2wTJFotROMNPa4UHXo2MqPaW8k07us",
  authDomain: "compsat-sdece.firebaseapp.com",
  databaseURL: "https://compsat-sdece-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "compsat-sdece",
  storageBucket: "compsat-sdece.appspot.com",
  messagingSenderId: "46954820322",
  appId: "1:46954820322:web:c19499507632da09a2a4bb",
  measurementId: "G-RPZYTFB5KC"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, 'partners')

// Get locations, not sure which location to get, either the office loc or the school loc
getDocs(colRef).then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		console.log(doc.data().name);
		console.log(doc.data()['admu-office']);
	})
})