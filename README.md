# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando `npm install` para instalar las dependencias

```
  npm install
```

4. Levantar las bases de datos con el comando

```
   docker compose up -d
```

5. Ejecutar las migraciones con el comando

```
   npx prisma migrate dev
```

6. Ejecutar el comando `npm run dev`
   para iniciar el servidor de desarrollo

```
   npm run dev
```

## Obtener Gmail Key

[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
