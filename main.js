import { InicializarMapa } from './components/InicializarMapa.js';
import { CargarCapas } from './components/CargarCapas.js';
import { AgregarEventosPopUps } from './components/AgregarEventosPopUps.js';
import { ConfigurarBusqueda, calcularRuta, limpiarRuta } from './components/ConfigurarBusqueda.js';
import { CrearLeyenda } from './components/CrearLeyenda.js';
import { FiltradoCategorias } from './components/FiltradoCategorias.js';
import { toggleFavoritos } from './components/favorites.js';

const inputField = document.getElementById('userInput');
const acceptButton = document.getElementById('acceptButton');
const apiKeyHere = "zqVfiojTFXFJtmVndyEOu8luVqE7LQqWskiQt_ysWDM"
const apiKeyLocationIQ = "pk.99b11b386bdb98032e2484cebf760601"

navigator.geolocation.getCurrentPosition((position) => {

    // Coordenadas reales del usuario
    const userLat = position.coords.latitude
    const userLng = position.coords.longitude

    const puntoInicial = {latitud: userLat, longitud: userLng}

    const map = InicializarMapa('map', [puntoInicial.longitud, puntoInicial.latitud], 12);
    CargarCapas(map, './data/airports_world.json');
    
    // AgregarEventosPopUps(map)
    AgregarEventosPopUps(map, puntoInicial, (map, inicio, destino) => calcularRuta(map, inicio, destino, apiKeyLocationIQ));
    ConfigurarBusqueda(map, puntoInicial, inputField, acceptButton, apiKeyHere, apiKeyLocationIQ)
    CrearLeyenda()
    FiltradoCategorias(map)

    // Evento para limpiar la ruta al hacer clic en el botón
    document.getElementById("clearRouteButton").addEventListener("click", () => limpiarRuta(map));

    // Evento para mostrar/ocultar el menú de favoritos
    document.getElementById("favorites-toggle").addEventListener("click", () => toggleFavoritos());

})