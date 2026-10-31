// Estado 
(function () {
    var HORARIO = { inicio: 8, fin: 18 };
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Bogota', weekday: 'short', hour: 'numeric', hour12: false })
        .formatToParts(new Date()).reduce(function (a, x) { a[x.type] = x.value; return a; }, {});
    var dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    var hora = parseInt(p.hour, 10) % 24;
    var abierto = dia !== 0 && hora >= HORARIO.inicio && hora < HORARIO.fin;

    var estado = document.getElementById('estado');
    var texto = document.getElementById('estado-texto');
    estado.classList.add(abierto ? 'abierto' : 'cerrado');
    texto.textContent = abierto ? 'Abierto ahora · cierra a las 6:00 p.m.' : 'Cerrado ahora · abrimos de lunes a sábado desde las 8:00 a.m.';

    document.querySelectorAll('.tabla-horario tr').forEach(function (tr) {
        if (tr.dataset.dias.split(',').indexOf(String(dia)) !== -1) tr.classList.add('hoy');
    });
})();

// Formulario
(function () {
    var form = document.getElementById('form-contacto');
    var tarjeta = document.getElementById('formulario');
    var msg = document.getElementById('mensaje');
    var cont = document.getElementById('contador');
    var NUMERO = '573001234567';

    msg.addEventListener('input', function () { cont.textContent = msg.value.length + ' / 400'; });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var d = new FormData(form);
        var texto = 'Hola BogoBike, soy ' + d.get('nombre') + '.\n' +
            'Servicio: ' + d.get('servicio') + '\n' +
            'Bicicleta: ' + d.get('tipo') + '\n' +
            'Mensaje: ' + d.get('mensaje') + '\n' +
            'Correo: ' + d.get('correo');
        window.open('https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        tarjeta.classList.add('enviado');
    });

    document.getElementById('otro').addEventListener('click', function () {
        form.reset(); cont.textContent = '0 / 400';
        tarjeta.classList.remove('enviado');
    });
})();

(function () {
    var items = document.querySelectorAll('.revelar');
    if (!('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('visible'); }); return; }
    var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
})();