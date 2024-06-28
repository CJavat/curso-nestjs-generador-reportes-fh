# Ejecutar en Dev

1. Clonar el repositorio
2. Instalar dependencias `yarn install`
3. Clonar `.env.template` y renombrarlo a `.env` y completar las variables de entorno
4. Levantar la DB `docker compose up -d`
5. Configurar la BD en PGAdmin.
6. Generar Schema de Prsma: `npx prisma generate`
7. Ejecutar el proyecto `yarn start:dev`

### Configurar DB en PGAdmin

1. Registrar servidor con Nombre: `Reports database`
2. Nombre/Dirección de Servidor: `postgres_database`.
3. BD de mantenimiento: `postgres`.
4. Nombre de Usuario: `postgres`.
5. Contraseña: `123456`.
6. En la DB `postgres` generar la tabla y los datos con el query que esta en la carpeta: `/queries/01-employees.sql`.
