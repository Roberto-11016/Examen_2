(() => {
    function iniciarPresentacion() {
        const diapositivas = Array.from(document.querySelectorAll(".diapositiva"));
        const puntos = Array.from(document.querySelectorAll(".punto"));
        const botonAnterior = document.getElementById("botonAnterior");
        const botonSiguiente = document.getElementById("botonSiguiente");

        if (
            diapositivas.length === 0 ||
            puntos.length !== diapositivas.length ||
            !botonAnterior ||
            !botonSiguiente
        ) {
            console.error("No se pudo iniciar la presentación: faltan diapositivas o controles.");
            return;
        }

        let diapositivaActual = 0;

        function mostrarDiapositiva(indice) {
            diapositivaActual = Math.max(0, Math.min(indice, diapositivas.length - 1));

            diapositivas.forEach((diapositiva, indiceDiapositiva) => {
                diapositiva.classList.toggle("activa", indiceDiapositiva === diapositivaActual);
            });

            puntos.forEach((punto, indicePunto) => {
                punto.classList.toggle("activa", indicePunto === diapositivaActual);
            });

            botonAnterior.disabled = diapositivaActual === 0;
            botonSiguiente.disabled = diapositivaActual === diapositivas.length - 1;
            botonSiguiente.textContent =
                diapositivaActual === diapositivas.length - 1 ? "Finalizar" : "Siguiente";
        }

        botonAnterior.addEventListener("click", () => {
            mostrarDiapositiva(diapositivaActual - 1);
        });

        botonSiguiente.addEventListener("click", () => {
            mostrarDiapositiva(diapositivaActual + 1);
        });

        puntos.forEach((punto, indice) => {
            punto.addEventListener("click", () => mostrarDiapositiva(indice));
        });

        document.addEventListener("keydown", (evento) => {
            if (evento.altKey || evento.ctrlKey || evento.metaKey) {
                return;
            }

            if (evento.key === "ArrowLeft") {
                mostrarDiapositiva(diapositivaActual - 1);
            } else if (evento.key === "ArrowRight") {
                mostrarDiapositiva(diapositivaActual + 1);
            }
        });

        mostrarDiapositiva(0);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarPresentacion, { once: true });
    } else {
        iniciarPresentacion();
    }
})();