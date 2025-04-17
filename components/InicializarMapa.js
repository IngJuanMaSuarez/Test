export function InicializarMapa(containerId, center, zoom){
    return new maplibregl.Map({
        container: containerId,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=JTyJ8wcoof3XBOEEMnYd', // stylesheet location
        center: center, // starting position [lng, lat]
        zoom: zoom // starting zoom
    });
}