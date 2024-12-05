
// Google Maps Platform API Key == AIzaSyC0y3R0OeeF5VCnrpR4ZJHXMOMrxRjaqmo
// AIzaSyC8COTRJVJkYy8cL4doW41ymJh94lw8RoY
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_add_map]
// Initialize and add the map

 const golfballImg = document.createElement("img");
  golfballImg.src =  "./img/redball.jpg"


let map;

async function initMap() {
  // [START maps_add_map_instantiate_map]
  // The location of Uluru
  const position = { lat: 29.588966244829354, lng: -95.36162478474299 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    content: golfballImg,
    zoom: 19,
    center: position,
    mapId: "DEMO_MAP_ID",
    mapTypeId: 'satellite',
  });

  // [END maps_add_map_instantiate_map]
  // [START maps_add_map_instantiate_marker]
  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    content: golfballImg
  });
  // [END maps_add_map_instantiate_marker]
}

initMap();
// [END maps_add_map]