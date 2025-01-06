let gKey = '';

async function fetchApiKey() {
  try {
    // Wait for the fetch call to resolve
    const response = await fetch('http://127.0.0.1:3001/getKey');
    
    // Wait for the JSON data to be parsed
    const data = await response.json();
    
    console.log("----", data);  // Logging the entire data object

    gKey = data.user;          // Store the response in the variable gKey
    
    console.log(e);  // Log any errors that occur
  }catch {
    console.log("hello")
  }
}

// Run this function as the very first step
async function init() {
  // Wait for the API key to be fetched first
  await fetchApiKey();

  // Now gKey should be set, and you can safely proceed with other logic
  console.log("gKey after fetch:", gKey);

  // You can now use gKey for any subsequent operations
  // e.g., initialize Google Maps or other dependent actions
}

init(); // Start by calling the init function


// console.log(gKey)

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
  ({key: gKey, v: "weekly"});


export const holeLocations = {
  hole1: [29.588966244829354,-95.36162478474299],
  hole2: [29.589026837309675, -95.3656898424961],
  hole3: [29.59055415507346, -95.3681727047423],
  hole4: [29.59343158197046, -95.36888527215214],
  hole5: [29.592913820950812, -95.36965640669668],
  hole6: [29.590418345313044, -95.36892431693224],
  hole7: [29.5871079252086, -95.3672746746326],
  hole8: [29.58829629363023, -95.36520530088083],
  hole9: [29.588279317038104, -95.36219885221936],
}
let position1 = {lat:holeLocations.hole1[0], lng:holeLocations.hole1[1]};
let position2 = { lat: holeLocations.hole1[0], lng:holeLocations.hole1[1] };

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_add_map]
// Initialize and add the map

let distanceElem = document.getElementById("curDist")
const curDistance = 0 
let holeNumber = 1;

const curNumber = document.getElementById('curHoleNumber')
curNumber.innerText = holeNumber

const nextHole = document.getElementById('add')
const prevHole = document.getElementById('sub')

nextHole.addEventListener('click',function() {
  
  if (holeNumber == 9){
    return
  }
  console.log("jfsdjklf")
  holeNumber = holeNumber + 1
  curNumber.innerText = holeNumber

  position1 = { lat: holeLocations[`hole${holeNumber}`][0], lng:holeLocations[`hole${holeNumber}`][1] };
  position2 = { lat: holeLocations[`hole${holeNumber}`][0], lng:holeLocations[`hole${holeNumber}`][1] };
  initMap();
  
})

prevHole.addEventListener('click',function() {
  if (holeNumber == 1){
    return
  }
  holeNumber = holeNumber - 1
  curNumber.innerText = holeNumber 
  position1 = { lat: holeLocations[`hole${holeNumber}`][0], lng:holeLocations[`hole${holeNumber}`][1] };
  position2 = { lat: holeLocations[`hole${holeNumber}`][0], lng:holeLocations[`hole${holeNumber}`][1] };
  initMap();
})

distanceElem.innerHTML = curDistance  

const golfballImg = document.createElement("img");
golfballImg.src =  "./img/blueball.jpg"
golfballImg.width= "20"
golfballImg.height="20"

const holeImg = document.createElement("img");
holeImg.src =  "./img/blackflag.jpg"
holeImg.width= "20"
holeImg.height="20"

let map;

async function initMap() {
  // [START maps_add_map_instantiate_map]
  // The location of Uluru
  
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  const map = new Map(document.getElementById("map"), {
    zoom: 19,
    center: position1,
    mapId: "DEMO_MAP_ID",
    mapTypeId: 'satellite',
    
  });


  // [END maps_add_map_instantiate_map]
  // [START maps_add_map_instantiate_marker]
  // The marker, positioned at Uluru
  const playerIcon = new AdvancedMarkerElement({
    map: map,
    position: position1,
    content: holeImg,
    gmpDraggable : true
  });
  // [END maps_add_map_instantiate_marker]
  const holeIcon = new AdvancedMarkerElement({
    map: map,
    position: position2,
    content: golfballImg,
    gmpDraggable : true
  });
  var line = new google.maps.Polyline({path: [position1, position2], map: map});
 

  map.addListener('dragstart', function() {  
    console.log()
    console.log(holeIcon.position, playerIcon.position)
    position1 = {lat:holeIcon.position.Fg, lng:holeIcon.position.Hg};
    position2 = { lat: playerIcon.position.Fg, lng: playerIcon.position.Hg };
    
    line.setMap(null)
    line = new google.maps.Polyline({path: [position1, position2], map: map});
    fetch('http://127.0.0.1:3001/calculateDistance',{
      method:"POST",headers: {
      'Content-Type': 'application/json'
  },
      body: JSON.stringify({ position1, position2 })})
    .then(response => response.json())
    .then((res) => {
      console.log(res)
      distanceElem.innerHTML = Math.round(res.distanceMeters * 1.09361)

    }).catch((e)=>{
      console.log(e)
    })
  });
}


initMap();
// [END maps_add_map]



