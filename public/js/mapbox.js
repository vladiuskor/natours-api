const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations)

mapboxgl.accessToken = 'pk.eyJ1IjoidmxhZG9zaXQiLCJhIjoiY2txc2UwZjZzMXAyeDJ0bWhlZ2ZodmZ5ZSJ9.mB27z7SQBIvn67gr04NC5Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vladosit/cku7cqegi3zn117po9curfhxf',
    scrollZoom: false
    // center: [-118.113491,34.111745],
    // zoom: 10
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.classList.add('marker');

    // Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    })
        .setLngLat(loc.coordinates)
        .addTo(map);

    // Add popup
    new mapboxgl.Popup({
        offset: 30
    })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
    padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
});