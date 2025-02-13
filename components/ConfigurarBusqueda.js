export function ConfigurarBusqueda(map, puntoInicial, inputField, acceptButton, apiKeyHere, apiKeyLocationIQ) {

    // Evento al hacer clic en el botón de búsqueda
    acceptButton.addEventListener('click', () => {
        const userInput = inputField.value; // Obtener el valor del input
        console.log('Valor ingresado:', userInput);

        fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${userInput}&apiKey=${apiKeyHere}`)
            .then((response) => response.json())
            .then((data) => {
                const latitud = data.items[0].position.lat;
                const longitud = data.items[0].position.lng;

                const puntoFinal = { latitud: latitud, longitud: longitud };

                // Llamar a la función unificada para calcular la ruta
                calcularRuta(map, puntoInicial, puntoFinal, apiKeyLocationIQ);
            });
    });
}

// Función optimizada para calcular la ruta y dibujarla en el mapa
export function calcularRuta(map, puntoInicial, puntoFinal, apiKeyLocationIQ) {
    // Eliminar ruta anterior si existe
    if (map.getSource('ruta')) {
        map.removeLayer('ruta-layer');
        map.removeSource('ruta');
    }

    // Hacer la petición a la API de LocationIQ para obtener la ruta
    fetch(`https://us1.locationiq.com/v1/directions/driving/${puntoInicial.longitud},${puntoInicial.latitud};${puntoFinal.longitud},${puntoFinal.latitud}?key=${apiKeyLocationIQ}&steps=true&alternatives=true&geometries=geojson`)
        .then((response) => response.json())
        .then((data) => {
            const ruta = data.routes[0].geometry;
            const distanciaMetros = data.routes[0].distance;
            const distanciaKm = (distanciaMetros / 1000).toFixed(2); // Convertir a km y redondear

            // Mostrar distancia en la interfaz
            document.getElementById("routeDistance").textContent = `Distancia: ${distanciaKm} km`;

            // Agregar la nueva fuente con la ruta
            map.addSource('ruta', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: ruta,
                    properties: {}
                }
            });

            // Agregar la capa para mostrar la ruta
            map.addLayer({
                id: 'ruta-layer',
                type: 'line',
                source: 'ruta',
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 4
                }
            });

        });
}

export function limpiarRuta(map) {
    if (map.getSource('ruta')) {
        map.removeLayer('ruta-layer');
        map.removeSource('ruta');
        console.log("Ruta eliminada.");
    }

    // Restablecer el texto de la distancia
    document.getElementById("routeDistance").textContent = "Distancia: -- km";
}