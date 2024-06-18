import {
    getDocs,
    addDoc,
    updateDoc,
    doc,
    query,
    where,
    getDoc,
  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

console.log("UNIVERSAL JS LOADING ");
  
export const firebaseConfig = {
    apiKey: "AIzaSyAeo2wTJFotROMNPa4UHXo2MqPaW8k07us",
    authDomain: "compsat-sdece.firebaseapp.com",
    databaseURL:
      "https://compsat-sdece-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "compsat-sdece",
    storageBucket: "compsat-sdece.appspot.com",
    messagingSenderId: "46954820322",
    appId: "1:46954820322:web:c19499507632da09a2a4bb",
    measurementId: "G-RPZYTFB5KC",
  };
initializeApp(firebaseConfig);
export const DB = getFirestore();

var col_ref = null; // collrection reference

export let partnersArray = [];

// General format of the rule engine
const DB_RULES_AND_DATA = [
    // ["collection_name", "identifier", ["field1", ... ,"fieldN"], "LinkedCollection" ] 
    ["buklod-official", "household_name", 
	    [
        "contact_number",
        "earthquake_risk",
        "fire_risk",
        "flood_risk",
        "household_address",
        "household_material",
        "household_name",
        "household_phase",
        "is_hoa_noa",
        "landslide_risk",
        "location_latitude",
        "location_longitude",
        "location_link",
        "nearest_evac",
        "number_minors",
        "number_pregnant",
        "number_pwd",
        "number_residents",
        "number_seniors",
        "number_sick",
        "residency_status",
        "sickness_present",
        "status",
        "storm_risk", ],
        
       "ORIGINAL",
    ],
    ["sdece-activity", "activity_nature", 
	    [
		    "activity_date",
		    "activity_name",
		    "activity_nature",
		    "ateneo_contact_person",
		    "ateneo_contact_email",
		    "ateneo_office_oversight",
		    "partner_name"
	    ],
	    
	    "sdece-partners",
	  ],
	  ["sdece_partners", "partner_name",
		  [
			  "partner_address",
			  "partner_contact_email",
			  "partner_contact_no",
			  "partner_contact_person",
			  "partner_latitude",
			  "partner_longitude",
			  "partner_name",
		  ],
		  
		  "ORIGINAL",
	  ],

];

export function setCollection(collection_name){
    console.log("collection name: " + collection_name);
    
    for( let rule of DB_RULES_AND_DATA ){
        console.log("rule[0]: " + rule[0]);
        if (rule[0] === collection_name){
            console.log("IS EQUAL");
            col_ref = collection( DB, collection_name );
        }
    }

    console.log(col_ref);
}

export function getCollection(){
    return col_ref;
}

export function getDocIdByPartnerName(partnerName) {
    console.log("GET_DOC_ID_BY_PARTNER_NAME " + partnerName + " in " + col_ref.id);
    const endName = partnerName.replace(/\s/g, "\uf8ff");

    //rule loop
    for ( let rule of DB_RULES_AND_DATA ){
        if (col_ref.id === rule[0]){
            return getDocs(
                query(
                    col_ref,
                    where(rule[1], ">=", partnerName), // let's wait for Luigi's standardization. IF_ELSE nalang muna 
                    where(rule[1], "<=", partnerName + endName)
                )
            )
            .then((querySnapshot) => {
                console.log(querySnapshot);
                if (!querySnapshot.empty) {
                // Assuming there is only one document with the given partner name
                const doc = querySnapshot.docs[0];
                return doc.id;
                } else {
                console.log("EMPTY: No matching document found.");
                return null;
                }
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
                return null;
            });
        }
    }
}

export function getDocByID(docId) {

    console.log("GET_DOC_ID");

    for (let rule of DB_RULES_AND_DATA){
        console.log(col_ref.id)
        if (col_ref.id === rule[0]){
            const docReference = doc(DB, rule[0], docId);
            let docObj = {};
            return getDoc(docReference).then(
                (doc) => {
                    docObj = doc.data();
                    return docObj;
                }
            );
        }
    }    
}

export function addEntry(){ //addDoc is a builtin function

}

export function editEntry(){

}