// Array de objetos, son los productos disponibles
const productos = [
    { id: 1, nombre: "TechZone Smartwatch pantalla IPS", precio: 1500, imagen: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=786" },
    { id: 2, nombre: "Apple Watch Serie 9 Correa de Cuero", precio: 10000, imagen: "https://images.unsplash.com/photo-1549482199-bc1ca6f58502?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764" },
    { id: 3, nombre: "Motorola Moto 360", precio: 1200, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1099" },
    { id: 4, nombre: "Apple Watch Serie 7 Medianoche", precio: 9000, imagen: "https://images.unsplash.com/photo-1670435729578-bed328dbdaf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
    { id: 5, nombre: "Apple Watch Serie 9 Correa Metalica", precio: 12000, imagen: "https://images.unsplash.com/photo-1573643306096-18627bf6d999?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074" },
    { id: 6, nombre: "Apple Watch Serie 8", precio: 11000, imagen: "https://images.unsplash.com/photo-1636877648317-fc6275acf0dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" }
];

//Inicializo el objeto carrito como vacio
let carrito = {};

//Dar formato a los precios
function formatearPrecio(precio) {
    return precio.toLocaleString('es-MX', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

//Renderizar productos
function mostrarProductos() {
    const listaProducto = document.querySelector('.productos');
    listaProducto.innerHTML = '';

    productos.forEach(producto => {
        const cantidad = carrito[producto.id] || 0;
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';
        tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="producto-info">
            <div class="producto-precio">$${formatearPrecio(producto.precio)}</div>
            <div class="producto-nombre">${producto.nombre}</div>
            <div class="contenedor-contador">
                <button class="btn-contador" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                <span class="contador" id="cantidad-${producto.id}">${cantidad}</span>
                <button class="btn-contador" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
        </div>
        `;

        listaProducto.appendChild(tarjeta);
    });
}

// Cambiar cantidad de un producto
function cambiarCantidad(id, cambio) {
    if (!carrito[id]) {
        carrito[id] = 0;
    }

    carrito[id] += cambio;

    if (carrito[id] <= 0) {
        delete carrito[id];
    }

    mostrarProductos();
    mostrarCarrito();
    actualizarTotal();
}

//Renderizar carrito
function mostrarCarrito() {
    const contenido = document.getElementById('carritoContenido');
    const itemsEnCarrito = Object.keys(carrito).filter(id => carrito[id] > 0);

    if (itemsEnCarrito.length === 0) {
        contenido.innerHTML = `
                    <div class="carrito-vacio">
                        <p>🛒 Tu carrito está vacío</p>
                        <p>¡Usa los contadores para agregar productos!</p>
                    </div>
                `;
        document.querySelector('.carrito-total').style.display = 'none';
    } else {
        contenido.innerHTML = '';
        itemsEnCarrito.forEach(id => {
            const producto = productos.find(p => p.id == id);
            const cantidad = carrito[id];
            const subtotal = producto.precio * cantidad;

            const item = document.createElement('div');
            item.className = 'carrito-item';
            item.innerHTML = `
                            <div class="carrito-item-nombre">${producto.nombre}</div>
                            <div class="carrito-item-detalles">
                                <span class="carrito-item-cantidad">x${cantidad}</span>
                                <span class="carrito-item-subtotal">= $${formatearPrecio(subtotal)}</span>
                            </div>
                    `;
            contenido.appendChild(item);
        });
        document.querySelector('.carrito-total').style.display = 'block';
    }
}

// Actualizar total
function actualizarTotal() {
    let total = 0;
    let totalItems = 0;

    Object.keys(carrito).forEach(id => {
        const producto = productos.find(p => p.id == id);
        const cantidad = carrito[id];
        total += producto.precio * cantidad;
        totalItems += cantidad;
    });

    document.querySelector('.total-cantidad').textContent = `$${formatearPrecio(total)}`;
    document.getElementById('totalItems').textContent = totalItems;
}

// Vaciar carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = {};
        mostrarProductos();
        mostrarCarrito();
        actualizarTotal();
    }
}

// Inicializar la aplicación
mostrarProductos();
mostrarCarrito();