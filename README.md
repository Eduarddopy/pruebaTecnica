# Backend
Java
Spring Boot
Spring Data JPA
Spring Web
PostgreSQL
Lombok


# Frontend
React 
Vite
React Router DOM
Axios

Antes de ejecutar el proyecto, requisitos:

* El proyecto fue hecho en Java 21, no encontré en el documento(prueba tecnica) alguna versión, así que me tomé la libertad de elegir
Maven
Node.js 18+
PostgresSQL en el puerto 5432

## #1 Configuración de la base de datos

Abrir terminal o pgAdmin
Crear base de datos:  CREATE DATABASE prueba_tecnica;

ejecutar los scripts de la carpeta db

psql -U postgres -d prueba_tecnica -f db/01_schema.sql
psql -U postgres -d prueba_tecnica -f db/02_data.sql

* Si el usuario no es "postgres" cambiar por el suyo

## #2 Ejecutar el back

En cd backend src/main/resources/application.properties Tiene por defecto mis credenciales, si son difirente modicarlas ahí o sobreecribirlas usando variables de entorno DB_USER y DB_PASSWORD

Compilar con  mvn clean spring-boot:run y se conectará en http://localhost:8080

## #3 Ejecutar front

Terminal en cd frontend e instalar

npm install, e iniciar con npm run dev. Usar la vista que proporciona la terminal despues del run dev

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