
// ******* const haversine = require('haversine-distance') FOCUS ON THIS TO GET DISTANCE MEASURMENT
console.log(x)

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_add_map]
// Initialize and add the map

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
  let position1 = {lat:29.58896624482934, lng:-95.3619};
  let position2 = { lat: 29.58896624482934, lng: -95.36162478474299 };
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
    console.log("hello")
    console.log(holeIcon.position, playerIcon.position)
    position1 = {lat:holeIcon.position.Fg, lng:holeIcon.position.Hg};
    position2 = { lat: playerIcon.position.Fg, lng: playerIcon.position.Hg };
    line.setMap(null)
    line = new google.maps.Polyline({path: [position1, position2], map: map});
    
  });
}


initMap();
// [END maps_add_map]



