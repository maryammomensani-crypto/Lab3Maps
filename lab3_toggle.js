// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = 
  "pk.eyJ1IjoibWFyeWFtbW9tZW5zYW5pIiwiYSI6ImNta2Nsdm52bzAxdmIzZHM5MWI2b3U0ZjkifQ.fbLuoqkkmVjamidm6wMXew";

const style_2025 = "mapbox://styles/maryammomensani/cmkwmgodo000g01skfj0t670w";
const style_2024 = "mapbox://styles/maryammomensani/cmkwlznsi004v01qqhh3xf6a7";

const map = new mapboxgl.Map({
  container: "map", // container ID must match the HTML div id
  style: style_2025, // default style when the page loads
  center: [-0.089932, 51.514441],
  zoom: 14
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

// On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id === "style2025") {  // Fixed: no underscore
      map.setStyle(style_2025);
    } else if (layer.target.id === "style2024") {  // Fixed: else if, no underscore
      map.setStyle(style_2024);
    }
  };
}
