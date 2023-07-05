// FIRESTORE DATABASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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
let partnersArray = []

// get docs from firestore

getDocs(colRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      partnersArray.push(doc.data());
      console.log(partnersArray);
    });

    // populate ul with partners
    partnersArray.forEach((partner) => {
      console.log(partner.name);
      const containerDiv = document.createElement('div');
      const img = document.createElement('img');
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');

      // set attributes
      img.src = 'Location Icon.png';
      img.style.height = '22px';
      img.style.alignItems = 'left';
      anchor.href = '#';
      anchor.textContent = partner.name;

      // append to DOM
      containerDiv.appendChild(img);
      listItem.appendChild(anchor);
      containerDiv.appendChild(listItem);
      locationList.appendChild(containerDiv);
    });
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });




export function addLocation(name, activity, admuContact, admuEmail, admuOffice, org, partnerContact, dates) {
	addDoc(colRef, {
	  name: name,
	  activity: activity,
	  "`admu-contact`": admuContact,
	  "`admu-email`": admuEmail,
	  "`admu-office`": admuOffice,
	  org: org,
	  "`partner-contact`": partnerContact,
	  dates: dates
	})
	.then((docRef) => {
	  console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
	  console.error("Error adding document: ", error);
	});
}


export function editLocation(docId, name, activity, admuContact, admuEmail, admuOffice, org, partnerContact, dates) {
	const docReference = doc(db, 'partners', docId);
	const updateData = {
	  name: name,
	  activity: activity,
	  "`admu-contact`": admuContact,
	  "`admu-email`": admuEmail,
	  "`admu-office`": admuOffice,
	  org: org,
	  "`partner-contact`": partnerContact,
	  dates: dates
	};
	return updateDoc(docReference, updateData)
	  .then(() => {
		console.log("Document updated successfully");
		alert("Document updated successfully");
	  })
	  .catch((error) => {
		console.error("Error updating document: ", error);
	  });
}

export function getDocIdByPartnerName(partnerName) {
    return getDocs(query(colRef, where('name', '==', partnerName)))
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                // Assuming there is only one document with the given partner name
                const doc = querySnapshot.docs[0];
                return doc.id;
            } else {
                console.log("No matching document found.");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
            return null;
        });
}
// addLocation("Test2", "Hello", "Angelo", "Test", "Test", "CompSAt", "Test", ["2002-3-2", "2002"])

  