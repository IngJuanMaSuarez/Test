export function InicializarMapa(containerId, center, zoom){
    return new maplibregl.Map({
        container: containerId,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: center, // starting position [lng, lat]
        zoom: zoom // starting zoom
    });
}