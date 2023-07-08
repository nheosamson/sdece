var map = L.map('map').setView([14.651, 121.052], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var searchControl = L.esri.Geocoding.geosearch().addTo(map);

var results = L.layerGroup().addTo(map);
var popup = L.popup();

// function onclickmarker(e)
// {
// 	popup.setLatLng(e.latlng)
// 		.setContent("You clicked the popup at " + e.latlng.toString())
// 		.openOn(map);
// }

/* 
	API call for searching, use for a search bar, returns a list based on this link:
	https://nominatim.openstreetmap.org/ui/search.html

	Create a search function to implement this.

	Currently, upon calling this, markers will be created in the map that satisfies these locations, otherwise none.
*/
async function searchLocation(loc){
	var parsed_loc = encodeURIComponent(loc.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-'));
	var api_search = 'https://nominatim.openstreetmap.org/search?q=';
	var link = api_search.concat(parsed_loc).concat('&format=json');
	console.log(link);

	var response = await fetch(link);

	fetch(link)
	.then(
		response => response.json()
	)
	.then(
		json => {
			console.log(json);
			json.forEach(function(entry, index){
				console.log(entry);
				var marker = L.marker([parseFloat(entry['lat']), parseFloat(entry['lon'])]);
				results.addLayer(marker);
			})
		}
	)
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


function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent(e.latlng.toString())
		.openOn(map);

	console.log("You clicked the map at " + e.latlng.toString());
}
map.on('click', onMapClick);

searchLocation("Industrial Valley Elementary School");