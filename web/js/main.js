document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navigationMenu = document.getElementById("navigationMenu");

    const views = document.querySelectorAll(".page-view");
    const navigationButtons = document.querySelectorAll("[data-view-target]");

    // Cambiar de una vista a otra
    function showView(viewName) {

        const selectedView = document.getElementById(`view-${viewName}`);

        if (!selectedView) return;

        // Ocultar todas las vistas
        views.forEach(view => {
            view.classList.remove("active");
        });

        // Mostrar la vista seleccionada
        selectedView.classList.add("active");

        // Actualizar el botón activo del menú
        navigationButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.viewTarget === viewName
            );
        });

        // Cerrar el menú
        navigationMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

        // Volver al principio de la página
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Abrir y cerrar el menú de tres puntos
    menuToggle.addEventListener("click", () => {

        const isOpen = navigationMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Activar las distintas vistas
    navigationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetView = button.dataset.viewTarget;

            showView(targetView);

        });

    });

    // Cerrar el menú al pulsar fuera
    document.addEventListener("click", event => {

        if (
            !event.target.closest(".menu-container") &&
            navigationMenu.classList.contains("open")
        ) {
            navigationMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

    // Cerrar el menú con Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            navigationMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

    // Vista inicial
    showView("inicio");

});