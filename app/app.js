// Variable global para almacenar el nombre del usuario y el carrito
let nombreUsuario;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para saludar al usuario por su nombre
function saludarPorNombre() {
    nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");
    const greetingDiv = document.getElementById('greeting');
    if (nombreUsuario) {
        greetingDiv.textContent = `¡Hola, ${nombreUsuario}! Bienvenido/a.`;
    } else {
        greetingDiv.textContent = "¡Hola! Bienvenido/a.";
    }
}

// Llamada a la función para saludar al usuario
saludarPorNombre();
viewCart(); // Llamada para mostrar el carrito al inicio

// Función para mostrar el carrito
function verCarrito() {
    viewCart();
}


// Función para mostrar los productos de una categoría
function mostrarProductos(categoria) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Limpiar contenido anterior
    productos[categoria].forEach((producto, index) => {
        const productDiv = document.createElement('div');
        productDiv.textContent = `${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`;
        const button = document.createElement('button');
        button.textContent = 'Agregar al Carrito';
        button.onclick = () => agregarProductoAlCarrito(producto);
        productDiv.appendChild(button);
        productsDiv.appendChild(productDiv);
    });
}

// Función para mostrar una categoría seleccionada
function showCategory(categoria) {
    mostrarProductos(categoria);
}

// Función para ver productos actuales en el carrito
function viewCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Limpiar contenido anterior
    if (carrito.length === 0) {
        cartDiv.textContent = "El carrito está vacío.";
    } else {
        carrito.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${index + 1}. ${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}`;
            cartDiv.appendChild(itemDiv);
        });
    }
}

// Función para agregar productos al carrito
function agregarProductoAlCarrito(producto) {
    const cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto.nombre} que deseas agregar al carrito:`));
    if (!isNaN(cantidad) && cantidad > 0) {
        const subtotal = cantidad * producto.precio;
        carrito.push({ nombre: producto.nombre, cantidad, subtotal });
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
        alert(`Se han agregado ${cantidad} ${producto.nombre} al carrito.`);
        viewCart(); // Actualizar la vista del carrito
    } else {
        alert("Por favor, ingresa una cantidad válida.");
    }
}

// Función para vaciar el carrito
function emptyCart() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    alert("El carrito ha sido vaciado.");
    viewCart(); // Actualizar la vista del carrito
}

// Función para mostrar un mensaje de despedida al usuario
function mensajeDespedida() {
    alert(`Gracias por usar nuestra aplicación, ${nombreUsuario}. ¡Que tengas un buen día!`);
    localStorage.removeItem('carrito'); // Limpiar el carrito en localStorage
}

// Función para finalizar la compra
function finalizePurchase() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay productos para finalizar la compra.");
    } else {
        let total = 0;
        let productosFinales = "Productos en tu compra final:\n";
        carrito.forEach(item => {
            productosFinales += `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}\n`;
            total += item.subtotal;
        });
        alert(`${productosFinales}\nTotal a pagar: $${total}`);
        mensajeDespedida(); // Llamada a la función de despedida
        carrito = []; // Vaciar el carrito después de la compra
        localStorage.removeItem('carrito'); // Limpiar el carrito en localStorage
        viewCart(); // Actualizar la vista del carrito
    }
}
