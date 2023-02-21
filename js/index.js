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