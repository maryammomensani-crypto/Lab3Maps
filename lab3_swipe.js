// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyeWFtbW9tZW5zYW5pIiwiYSI6ImNta2Nsdm52bzAxdmIzZHM5MWI2b3U0ZjkifQ.fbLuoqkkmVjamidm6wMXew";

// Before map
const beforeMap = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/maryammomensani/cmkwlznsi004v01qqhh3xf6a7", // replace with your 2024 style URL
  center: [-0.089932, 51.514441],
  zoom: 14
});

// After map
const afterMap = new mapboxgl.Map({
  container: "after",
  style: "mapbox://styles/maryammomensani/cmkwmgodo000g01skfj0t670w", // replace with your 2025 style URL
  center: [-0.089932, 51.514441],
  zoom: 14
});

const container = "#comparison-container";
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {});