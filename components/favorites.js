let favoritos = [];

export function agregarFavorito(nombre, coordenadas) {
    favoritos.push({ nombre, coordenadas });
    actualizarListaFavoritos();
}

export function actualizarListaFavoritos() {
    const listContainer = document.getElementById("favorites-list");
    listContainer.innerHTML = "";

    if (favoritos.length === 0) {
        listContainer.innerHTML = "<p>No hay puntos guardados.</p>";
        return;
    }

    favoritos.forEach((punto, index) => {
        let item = document.createElement("div");
        item.className = "favorite-item";
        item.innerHTML = `<strong>${index + 1}. ${punto.nombre}</strong>`; // Se asegura de mostrar el nombre

        // Botón para eliminar el punto de favoritos
        let removeButton = document.createElement("button");
        removeButton.innerText = "❌";
        removeButton.style.marginLeft = "5px";
        removeButton.style.cursor = "pointer";
        removeButton.addEventListener("click", () => {
            favoritos.splice(index, 1);
            actualizarListaFavoritos();
        });

        item.appendChild(removeButton);
        listContainer.appendChild(item);
    });

    // Asegurar que la lista sea visible cuando tenga elementos
    listContainer.style.display = "block";
}

export function toggleFavoritos() {
    const listContainer = document.getElementById("favorites-list");

    if (listContainer.style.display === "none" || listContainer.style.display === "") {
        listContainer.style.display = "block";
    } else {
        listContainer.style.display = "none";
    }
}
