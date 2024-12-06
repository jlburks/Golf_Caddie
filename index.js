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
  const position1 = {lat:29.58896624482934, lng:-95.3619};
  const position2 = { lat: 29.58896624482934, lng: -95.36162478474299 };
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
    content: holeImg
  });
  // [END maps_add_map_instantiate_marker]
  const holeIcon = new AdvancedMarkerElement({
    map: map,
    position: position2,
    content: golfballImg
  });
}

initMap();
// [END maps_add_map]



