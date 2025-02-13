export function CrearLeyenda(){
    
    // Definir colores y nombres de cada categoría
    const categories = [
        { id: 1, name: "Ambiente y desarrollo sostenible", color: "#1f77b4" },
        { id: 2, name: "Comercio industria y turismo", color: "#ff7f0e" },
        { id: 3, name: "Cultura y ocio", color: "#2ca02c" },
        { id: 4, name: "Deporte y recreacion", color: "#d62728" },
        { id: 5, name: "Educacion", color: "#9467bd" },
        { id: 6, name: "Minas y energia", color: "#8c564b" },
        { id: 7, name: "Salud y proteccion social", color: "#e377c2" },
        { id: 8, name: "Seguridad y defensa", color: "#7f7f7f" },
        { id: 9, name: "Transporte", color: "#bcbd22" },
        { id: 10, name: "Unidad administrativa", color: "#17becf" },
        { id: 11, name: "Vivienda, ciudad y territorio", color: "#f5b041" },
        { id: 12, name: "Economia y finanzas", color: "#4b0082" },
        { id: 13, name: "Funcion publica", color: "#2e8b57" },
        { id: 14, name: "Otro", color: "#000000" }
    ];

    // Obtener el div de la leyenda
    const legend = document.getElementById("legend");
    legend.innerHTML = ""; // Limpiar antes de agregar elementos

    // Crear los elementos de la leyenda dinámicamente
    categories.forEach(cat => {
        let item = document.createElement("div");
        item.className = "legend-item";

        let colorBox = document.createElement("span");
        colorBox.className = "legend-color";
        colorBox.style.backgroundColor = cat.color;

        let label = document.createElement("span");
        label.textContent = cat.name;

        item.appendChild(colorBox);
        item.appendChild(label);
        legend.appendChild(item);
    });

    // Manejo de la visibilidad de la leyenda
    const legendContainer = document.getElementById("legend-container");
    const toggleButton = document.getElementById("toggle-legend");

    toggleButton.addEventListener("click", () => {
        if (legend.style.display === "none") {
            legend.style.display = "block";
            toggleButton.textContent = "🗂️ Ocultar Leyenda";
        } else {
            legend.style.display = "none";
            toggleButton.textContent = "🗂️ Mostrar Leyenda";
        }
    });
}