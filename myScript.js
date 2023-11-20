document.addEventListener('DOMContentLoaded', function () {
    var miBotones = document.getElementsByClassName('añadir');

    for (var i = 0; i < miBotones.length; i++) {
        miBotones[i].addEventListener('click', agregarProductoAlCarrito);
    }

    var carrito = pickearCarritoGuardado();
    actualizarCarrito()
    var agregarCarritoButtons = document.getElementsByClassName('añadir');
    for (var i = 0; i < agregarCarritoButtons.length; i++) {
        agregarCarritoButtons[i].addEventListener('click', agregarProductoAlCarrito);
    }
    
    var botonVaciar = document.getElementById('vaciar');
    botonVaciar.addEventListener('click', vaciarCarrito);

    function agregarProductoAlCarrito(evento) {
    var button = evento.target;
    var producto = button.parentElement;
    var titulo = producto.querySelector('.producto').innerText;
    var precio = producto.querySelector('.precio').innerText;
    var precioNumerico = parseFloat(precio.substring(1));

    var productoAgregado = {
        titulo: titulo,
        precio: precioNumerico,
    };

    carrito.push(productoAgregado);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}
    
    function actualizarCarrito() {
        var carritoContainer = document.getElementById('carrito');
        carritoContainer.innerHTML = '';
    
        for (var i = 0; i < carrito.length; i++) {
            var producto = carrito[i];
            var carritoElemento = document.createElement('li');
            carritoElemento.classList.add('list-group-item');
            var contenido = `
                <span>${producto.titulo}</span>
                <span>$${parseInt(producto.precio)}</span>
            `;
            carritoElemento.innerHTML = contenido;
            carritoContainer.appendChild(carritoElemento);
        }
    
        calcularTotal();
    }
    
    function calcularTotal() {
        var total = 0;
        for (var i = 0; i < carrito.length; i++) {
            total += parseInt(carrito[i].precio);
        }
        var totalElemento = document.getElementById('total');
        totalElemento.innerText = total;
    }
    
    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
        guardarCarritoEnLocalStorage()
    }
    
    function pickearCarritoGuardado() {
        var carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            return JSON.parse(carritoGuardado); 
        } else {
            return [];
        }
        
    }
    
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    var comprarButton = document.getElementById('comprar');
    comprarButton.addEventListener('click', finalizarCompra);
    
    function finalizarCompra () {
        var totalElemento = document.getElementById('total')
        var total = totalElemento.innerText;
        if(carrito.length === 0 ) {
            alert("El carrito está vacio")
        }else {
            vaciarCarrito()
            alert("El total es $" + total)
            alert("¡Muchas Gracias!")
        }
    }
    }
    );
