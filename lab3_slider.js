// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyeWFtbW9tZW5zYW5pIiwiYSI6ImNta2Nsdm52bzAxdmIzZHM5MWI2b3U0ZjkifQ.fbLuoqkkmVjamidm6wMXew";

// Base map
const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/mapbox/light-v10",
  center: [-0.089932, 51.514442],
  zoom: 14
});

// Dataset URL (your cleaned merged CSV as a dataset)
const data_url =
  "https://api.mapbox.com/datasets/v1/maryammomensani/cmkwr6wcl0e9g1vmox8xj8w62/features?access_token=pk.eyJ1IjoibWFyeWFtbW9tZW5zYW5pIiwiYSI6ImNta2Nsdm52bzAxdmIzZHM5MWI2b3U0ZjkifQ.fbLuoqkkmVjamidm6wMXew";

// Global filters (month + type)
// Start with January (2024-01) instead of a placeholder
let filterMonth = ["==", ["get", "Month"], "2024-01"];
let filterType = ["!=", ["get", "Crime type"], "placeholder"];

map.on("load", () => {
  // ---- Crimes layer ----
  map.addLayer({
    id: "crimes",
    type: "circle",
    source: {
      type: "geojson",
      data: data_url
    },
    paint: {
      "circle-radius": 5,
      "circle-color": "#ff3b3b",
      "circle-opacity": 0.8,
      "circle-stroke-width": 0.5,
      "circle-stroke-color": "#ffffff"
    }
  });

  // Apply the initial filter once the layer is added (show only January)
  map.setFilter("crimes", ["all", filterMonth, filterType]);

  // ---------- Hover popup ----------
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on("mouseenter", "crimes", (e) => {
    map.getCanvas().style.cursor = "pointer";

    const feature = e.features[0];
    const coordinates = feature.geometry.coordinates.slice();
    const props = feature.properties;

    const description = `
      <strong>${props["Crime type"]}</strong><br>
      Month: ${props["Month"]}<br>
      Location: ${props["Location"] || "N/A"}<br>
      Outcome: ${props["Last outcome category"] || "N/A"}
    `;

    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "crimes", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });

  // ---------- Slider interaction ----------
  document.getElementById("slider").addEventListener("input", (event) => {
    // Get the month value from the slider (1–12)
    const month = parseInt(event.target.value);

    // Format: "2024-01", "2024-02", ...
    const formatted_month = "2024-" + ("0" + month).slice(-2);

    // Month filter
    filterMonth = ["==", ["get", "Month"], formatted_month];

    // Apply both filters
    map.setFilter("crimes", ["all", filterMonth, filterType]);

    // Update label above slider
    document.getElementById("active-month").innerText = month;
  });

  // ---------- Crime-type radio buttons ----------
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;
    console.log(type);

    if (type === "all") {
      filterType = ["!=", ["get", "Crime type"], "placeholder"];
    } else if (type === "theft_person") {
      filterType = ["==", ["get", "Crime type"], "Theft from the person"];
    } else if (type === "other_theft") {
      filterType = ["==", ["get", "Crime type"], "Other theft"];
    } else if (type === "drugs") {
      filterType = ["==", ["get", "Crime type"], "Drugs"];
    } else if (type === "violence") {
      filterType = [
        "==",
        ["get", "Crime type"],
        "Violence and sexual offences"
      ];
    } else if (type === "bicycle") {
      filterType = ["==", ["get", "Crime type"], "Bicycle theft"];
    } else {
      console.log("error");
    }

    // Apply both filters
    map.setFilter("crimes", ["all", filterMonth, filterType]);
  });
});