// FIRESTORE DATABASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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
});


function addLocation(name, activity, admuContact, admuEmail, admuOffice, org, partnerContact, dates) {
	let datesObj = {};
	for (let i = 0; i < dates.length; i++) {
	  datesObj[i] = dates[i];
	}
	addDoc(colRef, {
	  name: name,
	  activity: activity,
	  "`admu-contact`": admuContact,
	  "`admu-email`": admuEmail,
	  "`admu-office`": admuOffice,
	  org: org,
	  "`partner-contact`": partnerContact,
	  dates: datesObj
	})
	.then((docRef) => {
	  console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
	  console.error("Error adding document: ", error);
	});
}


function editLocation(docId, name, activity, admuContact, admuEmail, admuOffice, org, partnerContact, dates) {
	let datesObj = {};
	for (let i = 0; i < dates.length; i++) {
	  datesObj[i] = dates[i];
	}
	const docReference = doc(db, 'partners', docId);
	const updateData = {
	  name: name,
	  activity: activity,
	  "`admu-contact`": admuContact,
	  "`admu-email`": admuEmail,
	  "`admu-office`": admuOffice,
	  org: org,
	  "`partner-contact`": partnerContact,
	  dates: datesObj
	};
	return updateDoc(docReference, updateData)
	  .then(() => {
		console.log("Document updated successfully");
	  })
	  .catch((error) => {
		console.error("Error updating document: ", error);
	  });
}

// addLocation("Test2", "Hello", "Angelo", "Test", "Test", "CompSAt", "Test", ["2002-3-2", "2002"])
editLocation("2msbnDBsyZyjfUWM40mz", "Test2", "Hello", "This", "is", "a", "test", "For editing Location, second test", ["2002-3-2", "2002", "2003"])
  