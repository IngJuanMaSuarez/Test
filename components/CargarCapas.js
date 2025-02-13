export function CargarCapas(map, geojsonURL) {
    // Cargar el GeoJSON cuando el mapa esté listo
    map.on('load', () => {
            
        // Agregar la fuente de datos GeoJSON
        map.addSource('puntos-geojson', {
            type: 'geojson',
            data: geojsonURL
        });

        // Agrega el servicio geográfico de ArcGIS
        map.addSource('arcgis-source', {
            type: 'geojson',
            data: 'https://services2.arcgis.com/RVvWzU3lgJISqdke/ArcGIS/rest/services/nombregeografico/FeatureServer/0/query?where=1=1&outFields=*&geometry=-75.2920,4.3831,-75.1151,4.5297&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&f=geojson'
        });

        // Agregar una capa para visualizar los puntos
        map.addLayer({
            'id': 'capa-puntos',
            'type': 'circle',
            'source': 'puntos-geojson',
        })

        map.addLayer({
            id: 'ibague-layer',
            type: 'circle',
            source: 'arcgis-source',
            paint: {
                'circle-radius': 6,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff',
                'circle-color': [
                    'match',
                    ['get', 'NGCategori'], // Obtener el valor de la categoría
                    1, "#1f77b4", // Ambiente y desarrollo sostenible
                    2, "#ff7f0e", // Comercio industria y turismo
                    3, "#2ca02c", // Cultura y ocio
                    4, "#d62728", // Deporte y recreacion
                    5, "#9467bd", // Educacion
                    6, "#8c564b", // Minas y energia
                    7, "#e377c2", // Salud y proteccion social
                    8, "#7f7f7f", // Seguridad y defensa
                    9, "#bcbd22", // Transporte
                    10, "#17becf", // Unidad administrativa
                    11, "#f5b041", // Vivienda, ciudad y territorio
                    12, "#4b0082", // Economia y finanzas
                    13, "#2e8b57", // Funcion publica
                    14, "#000000", // Otro
                    "#cccccc" // Color por defecto (si el valor no coincide)
                ]
            }
        });
    })
}