### Backend
* Java, Spring Boot, Spring Data JPA, Spring Web, PostgreSQL, Lombok

### Frontend
* React, Vite, React Router DOM, Axios


Antes de ejecutar el proyecto, asegúrate de contar con:
* **Java 21**: No encontré una versión específica en el documento de la prueba técnica, así que me tomé la libertad de elegir esta versión.
* **Maven**, **Node.js 18+** y **PostgreSQL** en el puerto `5432`.

## #1 Configuración de la base de datos

1. Abrir terminal o pgAdmin.
2. Crear la base de datos:
   ```sql
   CREATE DATABASE prueba_tecnica;

Ejecutar los scripts de la carpeta db:

```bash
psql -U postgres -d prueba_tecnica -f db/01_schema.sql
psql -U postgres -d prueba_tecnica -f db/02_data.sql
```

* Si el usuario no es "postgres" cambiar por el suyo


## #2 Ejecutar el Backend

En cd backend, el archivo src/main/resources/application.properties tiene por defecto mis credenciales. Si son diferentes, modifícalas ahí o sobrescríbelas usando las variables de entorno DB_USER y DB_PASSWORD.

Compilar con: mvn clean spring-boot:run y se conectará en http://localhost:8080.

## #3 Ejecutar el Frontend

Abrir una terminal en cd frontend e instalar las dependencias:

npm install, e iniciar con npm run dev (Usar la vista (URL) que proporciona la terminal después del run dev).

## Endpoints de la API

### Módulo de Personas
* GET /api/personas - Listar todas las personas.
* GET /api/personas/{id} - Consultar una persona por ID.
* POST /api/personas - Registrar una nueva persona.
* PUT /api/personas/{id} - Actualizar los datos de una persona.
* DELETE /api/personas/{id} - Eliminar una persona.

### Módulo de Domicilios
* GET /api/domicilios/{id} - Consultar un domicilio por ID.
* POST /api/domicilios - Registrar un nuevo domicilio.
* PUT /api/domicilios/{id} - Actualizar un domicilio.
* DELETE /api/domicilios/{id} - Eliminar un domicilio.
* GET /api/domicilios/asociados/{idPersona} - Consultar todos los domicilios asociados a una persona.