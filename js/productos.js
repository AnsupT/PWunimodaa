document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("productos-container");

  try {
    const response = await fetch("http://localhost:5000/api/productos");
    const productos = await response.json();

    if (!response.ok) {
      throw new Error(productos.mensaje || "Error al obtener los productos");
    }

    // Limpiar contenedor
    contenedor.innerHTML = "";

    // Generar tarjetas dinámicamente
    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");
      card.innerHTML = `
        <div class="card h-100">
          <img src="${producto.imagen || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio.toLocaleString()}</p>
            <a href="detalle.html?id=${producto._id}" class="btn btn-primary">Ver detalles</a>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = `<p class="text-danger">No se pudieron cargar los productos.</p>`;
  }
});