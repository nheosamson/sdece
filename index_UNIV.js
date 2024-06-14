
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
                div_content += `<div class="partner-activity"> ${doc.get(rule[1][i])}`;
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
 
export function searchLocation(doc) {
    console.log("Search location of "+ doc.id);
    let popup = L.popup()
      .setLatLng([doc.latitude + 0.00015, doc.longitude])
      // can use rule engine for this.
      .setContent(
        getDivContent(doc.household_name)
      )
      .openOn(map);
    
    map.panTo(new L.LatLng(doc.latitude, doc.longitude));
  }


export function panLocation(name) {
    console.log("PANNNNNN to " + name);   
    getDocIdByPartnerName(name).then((docId) => {
      getDocByID(docId).then((doc) => {
        searchLocation(doc);
      });
    });     
  }
