document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.content_navbar');

    // Detecta el desplazamiento
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Si el usuario ha hecho scroll, añade la clase 'scrolled'
            navbar.classList.add('scrolled');
        } else {
            // Si el usuario vuelve a la parte superior, remueve la clase 'scrolled'
            navbar.classList.remove('scrolled');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = document.querySelectorAll(".input");
    const textArea = document.querySelector("#message");
    const submitButton = document.querySelector(".enviar");

    const validationRules = {
        name: {
            required: true,
            maxLength: 50,
            message: "El nombre no puede estar vacío y debe tener máximo 50 caracteres.",
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Debe ser un correo electrónico válido (ej. texto@texto.com).",
        },
        asunto: {
            required: true,
            maxLength: 50,
            message: "El asunto no puede estar vacío y debe tener máximo 50 caracteres.",
        },
        message: {
            required: true,
            maxLength: 300,
            message: "El mensaje no puede estar vacío y debe tener máximo 300 caracteres.",
        },
    };

    function validateInput(input) {
        const field = input.id;
        const value = input.value.trim();
        const rules = validationRules[field];
        const errorSpan = document.querySelector(`#error-${field}`);

        if (rules.required && !value) {
            showError(errorSpan, rules.message);
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            showError(errorSpan, rules.message);
            return false;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            showError(errorSpan, rules.message);
            return false;
        }

        hideError(errorSpan);
        return true;
    }

    function showError(errorSpan, message) {
        errorSpan.textContent = message;
        errorSpan.classList.add("visible");
    }

    function hideError(errorSpan) {
        errorSpan.textContent = "";
        errorSpan.classList.remove("visible");
    }

    function validateForm() {
        let isValid = true;

        inputs.forEach((input) => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!validateInput(textArea)) {
            isValid = false;
        }

        submitButton.disabled = !isValid;
        return isValid;
    }

    // Add event listeners
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            validateInput(input);
            validateForm();
        });
    });

    textArea.addEventListener("input", () => {
        validateInput(textArea);
        validateForm();
    });

    form.addEventListener("submit", (e) => {
        if (!validateForm()) {
            e.preventDefault();
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        } else {
            alert("¡Formulario enviado con éxito!");
        }
    });
});
