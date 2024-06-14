
import { DB_RULES_AND_DATA, getDocByID, getDocIdByPartnerName, getCollection } from "/firestore_UNIV.js";
// Takes in a name to determine all field values which should be displayed 
// Current Issue: it doesn't display all the added things, could be due to the async nature of these functions
export function getDivContent(name) {
    var div_content = ``; // This isn't affected, this is the one getting printed
    return getDocIdByPartnerName(name).then((docId) => {
      if (docId) {
        // console.log("is this seen")
        return getDocByID(docId).then((doc) => {
          // Insert the partner details into the div with class "partner-contact"
          for(let rule of DB_RULES_AND_DATA){
            if(getCollection().id === rule[0]){    
              div_content += `<div class="partner-contact"> <div class="partner-label"> partner-label </div>`;
              for(let i = 0; i < rule[1].length; i++){
                div_content += `<div class="partner-activity"> ${readyField(rule[1][i])}: ${doc.get(rule[1][i])}`;
              }
              div_content += `</div>`;
              break;
            }
          }            
          return div_content;
        });
      } else{
          console.log("No matching partner found.");
          div_content = "no partner";
        return div_content;
      }
    });
  }
 
export function panLocation(name, map) {
  console.log("PANNNNNN to " + name);   
  getDocIdByPartnerName(name).then((docId) => {
    getDocByID(docId).then((doc) => {
      searchLocation(doc, map);
    });
  });     
}

export function searchLocation(doc, map) {
    console.log("Search location of "+ doc.id);
    doc = doc.data();
         console.log(typeof(map));   
    map.panTo(new L.LatLng(doc.location_latitude, doc.location_longitude));
  }




// Utility Function for Front-end (remove underscores from a string)
export function removeUnderscoresFromField(field) {
  const words = field.replace("_", ` `);
  return words;
}

// Utility function for Front-end (Capitalize Like This)
// USE AFTER removeUnderscoresFromField 
export function capitalizeFirstLetters(field) {
  const words = field.split(" ");
  for(let i = 0; i < words.length; i++){  
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

// Utility function for Front-end
export function readyField(field){
  field = removeUnderscoresFromField(field);
  field = capitalizeFirstLetters(field);
  return field;
}
