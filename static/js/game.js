const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');

let rueda = {
    x: 100,
    y: 250,
    radius: 30,
    dragging: false
};

let linea = {
    x1: 50,
    x2: 750,
    y: 300,
    min: 0,
    max: 4
};

// Valor correcto generado aleatoriamente
const valorCorrecto = Math.round((Math.random() * (linea.max - linea.min)) * 50) / 50; // ej. 1.25, 2.5
// Mostrar una operación en texto
let operacionTexto = `¿Dónde se encuentra ${valorCorrecto} en la línea numérica?`;

const mostrarOperacion = () => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(operacionTexto, 250, 50);
};

// Dibujar todo
function dibujarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Línea numérica
    ctx.beginPath();
    ctx.moveTo(linea.x1, linea.y);
    ctx.lineTo(linea.x2, linea.y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ticks y números
    for (let i = linea.min; i <= linea.max; i++) {
        let px = linea.x1 + (i - linea.min) * ((linea.x2 - linea.x1) / (linea.max - linea.min));
        ctx.beginPath();
        ctx.moveTo(px, linea.y - 10);
        ctx.lineTo(px, linea.y + 10);
        ctx.stroke();

        ctx.fillText(i, px - 3, linea.y + 25);
    }

    // Personaje sobre rueda
const personaje = new Image();
personaje.src = "/static/img/mini.gif"; // Asegúrate de tener esta imagen
personaje.onload = () => {
    ctx.drawImage(personaje, rueda.x - 25, rueda.y - 50, 50, 50);
};
mostrarOperacion();

}

dibujarJuego();

// Movimiento
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - rueda.x;
    const dy = mouseY - rueda.y;

    if (Math.sqrt(dx * dx + dy * dy) < rueda.radius) {
        rueda.dragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (rueda.dragging) {
        const rect = canvas.getBoundingClientRect();
        rueda.x = e.clientX - rect.left;
        rueda.y = linea.y;
        dibujarJuego();
    }
});

canvas.addEventListener('mouseup', () => {
    rueda.dragging = false;
});

// Verificación
function verificarRespuesta() {
    const proporcion = (rueda.x - linea.x1) / (linea.x2 - linea.x1);
    const valor = (linea.max - linea.min) * proporcion + linea.min;
    const valorRedondeado = Math.round(valor * 100) / 100;

    const resultado = document.getElementById('resultado');
    if (Math.abs(valorRedondeado - valorCorrecto) < 0.1) {
        resultado.textContent = `¡Correcto! 🎉 Estaba en: ${valorCorrecto}`;
        resultado.style.color = "green";
    } else {
        resultado.textContent = `❌ Incorrecto. El valor correcto era: ${valorCorrecto}`;
        resultado.style.color = "red";
    }
}
