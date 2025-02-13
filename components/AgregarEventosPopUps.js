import { agregarFavorito } from './favorites.js';

export function AgregarEventosPopUps(map, puntoInicial, ConfigurarBusqueda) {

    map.on('click', 'ibague-layer', (e) => {
        console.log('popup abierto');
        console.log(e);
    
        const coordinates = e.features[0].geometry.coordinates.slice(); // Coordenadas del punto
        const properties = e.features[0].properties; // Propiedades del punto
    
        // Crear el contenido del popup con el botón "Ir"
        const popupContent = document.createElement("div");
        popupContent.innerHTML = `<strong>${properties.NGNPrincip || 'Sin nombre'}</strong><br>`;
        
        // Botón "Ir"
        const goButton = document.createElement("button");
        goButton.innerText = "Ir";
        goButton.style.padding = "5px";
        goButton.style.marginTop = "5px";
        goButton.style.cursor = "pointer";

        // Agregar el evento para iniciar el ruteo al hacer clic en "Ir"
        goButton.addEventListener("click", () => {
            const puntoFinal = { latitud: coordinates[1], longitud: coordinates[0] };
            ConfigurarBusqueda(map, puntoInicial, puntoFinal);
        });

        // Botón "Agregar a Favoritos"
        const favButton = document.createElement("button");
        favButton.innerText = "⭐ Agregar";
        favButton.style.padding = "5px";
        favButton.style.marginTop = "5px";
        favButton.style.marginLeft = "5px";
        favButton.style.cursor = "pointer";

        favButton.addEventListener("click", () => {
            agregarFavorito(properties.NGNPrincip || 'Sin nombre', coordinates);
        });

        popupContent.appendChild(goButton);
        popupContent.appendChild(favButton);

        // Crear y mostrar el popup
        new maplibregl.Popup()
            .setLngLat(coordinates)
            // .setHTML(`<strong>${properties.NGNPrincip || 'Sin nombre'}</strong>`)
            .setDOMContent(popupContent)
            .addTo(map);
    });
    
    map.on('click', 'capa-puntos', (e) => {
        console.log('popup abierto');
        console.log(e);
    
        const coordinates = e.features[0].geometry.coordinates.slice(); // Coordenadas del punto
        const properties = e.features[0].properties; // Propiedades del punto
    
        // Crear y mostrar el popup
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<strong>${properties.name || 'Sin nombre'}</strong>`)
            .addTo(map);
    });
}