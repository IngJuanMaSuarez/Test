export function FiltradoCategorias(map) {
    const filterSelect = document.getElementById("categoryFilter");

    filterSelect.addEventListener("change", () => {
        const selectedCategory = filterSelect.value;

        if (selectedCategory === "all") {
            map.setFilter("ibague-layer", null); // Mostrar todos los puntos
        } else {
            map.setFilter("ibague-layer", ["==", ["get", "NGCategori"], parseInt(selectedCategory)]);
        }
    });
}
