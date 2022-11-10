const errorMessage = {
    500: {
        INCOMPLETE_FIELDS: "Campos incompletos",
        SERVER_ERROR: "Error en el servidor",
        USER: {
            PASSWORD_NOT_PROVIDED: "Introduce una contraseña"
        }
    },
    404: {
        USER: {
            NOT_SAVED: "Usuario no guardado",
            USER_NOT_FOUND: "Usuario no encontrado",
            NOT_UPDATED: "Usuario no actualizado",
            USERS_NOT_FOUND: 'Usuarios no encontrados'
        },
        REQUEST: {
            INVALID_TOKEN: "Token invalido"
        }
    },
    403: {
        REQUEST: {
            AUTH_HEADER_NOT_SENT: "Cabecera de autenticación no enviada"
        }
    },
    401: {
        REQUEST: {
            EXPIRED_TOKEN: "Token expirado"
        }
    }
}

module.exports = errorMessage;