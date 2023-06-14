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
        ROLE: {
            NOT_SAVED: "Rol no guardado",
            ROLE_NOT_FOUND: "Rol no encontrado",
            NOT_UPDATED: "Rol no actualizado",
            ROLES_NOT_FOUND: 'Roles no encontrados'
        },
        PRODUCT: {
            NOT_SAVED: "Producto no guardado",
            PRODUCT_NOT_FOUND: "Producto no encontrado",
            NOT_UPDATED: "Producto no actualizado",
            PRODUCTS_NOT_FOUND: 'Productos no encontrados'
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