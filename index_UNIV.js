
function getDetails(name) {
    console.log("GETDEETS");
    getDocIdByPartnerName(name).then((docId) => {
      if (docId) {
        getDocByID(docId).then((doc) => {
          // Insert the partner details into the div with class "partner-contact"
          const partnerContactDiv = document.querySelector(".partner-contact");
          if (partnerContactDiv) {  
            for(let rule of DB_RULES_AND_DATA){
                if(getCollection().id === rule[0]){
                    for(let index in rule[1]){
                        partnerContactDiv.innerHTML += `
                            <div class="partner-info">
                            <p class="partner-label"> ${rule[1][index]}</p>
                            
                            <p class="partner-activity"> ${doc.}</p>
                            </div>
                        `;
                        console.log(index);
                    }
                }
            }
        } else{
                console.log("Div with class 'partner-contact' not found.");
        }
        });
    } else{
        console.log("No matching partner found.");
    }
    });
}


searchLocationOnMap(name) {
    
}