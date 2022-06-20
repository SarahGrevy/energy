mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhncmV2eSIsImEiOiJjbDFwZHg2YzkwMTVqM2lzeTgxa29waDNnIn0.8fJhOwF_qreAF9cEeVNUMw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-v9', // style URL
zoom: 1.3, // starting zoom
center: [78.093267, 18.037618] // starting center


});


map.on('load', function() {
  map.addLayer(
    {
      id: 'country',
      source: {
        type: 'geojson',
        data: "data/weather_will5.geojson",
      },
      type: 'fill',
      paint: {

        'fill-color': {
          property: 'diff',
          stops: [  [-30, '#A9A9A9'], [-10, '#D3D3D3'],[-4, '#E5E4E2'], [-1, '#fff'],   [5, ' #AFE1AF'],  [10, '#4F7942'],  [30, ' #355E3B']
        ]
          }
          
          
        // "fill-color":

        
        // [
        
        //   "step",
        //   ["get", "diff"],
        //   "#ffffff",
        // -30, "#008837",
        // -0.045, "#b8e186",
        // 1.8, "#f2d0e5",
        // 139, "#d64fa2", 
        // ],
        // "fill-outline-color": "#ffffff",
      },
    },
  );
})



map.on("click", "country", function (e) {
  var diff = e.features[0].properties.diff;
  var country = e.features[0].properties.country;

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
        <h3>
        ${country} 
        </h3>
        <p>
            <b>${diff}</b> % annual change in wind energy

    `
    )
    .addTo(map);
})

map.on("mouseenter", "country", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "country", function () {
  map.getCanvas().style.cursor = "";
});
