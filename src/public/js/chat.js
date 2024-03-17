// Initialize the chat when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Conectado");
    const socket = io();

    let user;

    const chatForm = document.getElementById("chatForm"); // Corrected the reference to the form

    // Use Swal to prompt the user for their name
    Swal.fire({
        title: "Identificate",
        input: "text",
        inputLabel: "Ingresa un nombre de usuario para el chat",
        inputPlaceholder: "Nombre de usuario",
        inputValidator: (value) => {
            return !value && "Por favor ingresa un nombre de usuario";
        },
        allowOutsideClick: false,
    }).then((result) => {
        user = result.value;
        console.log(user);
    });

    // Listen for form submission
    chatForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        const chatBox = document.getElementById("chatBox");
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    });

    // Receive messages and display them
    socket.on("message", (data) => {
        let log = document.getElementById("messagesLogs");
        let mensajes = "";
        data.forEach(mensaje => {
            mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message} <br>`;
        });
        if (log) {
            log.innerHTML = mensajes;
        }
    });
});