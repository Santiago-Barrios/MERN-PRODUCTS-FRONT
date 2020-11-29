# Mern Products App (Front)

Mern products App es una aplicación diseñada para enlistar productos creados por el usuario, que pertenezcan a un tipo especifico previamente establecidos por el mismo cliente.

Cuenta con sistema de logIn y Register, en donde se tienen las validaciones pertinentes para encriptar la clave del usuario y se genera un token que permite la navegación dentro de la aplicación.

La aplicación esta creada en el Front-End con React  JS, haciendo uso del CDN de Materialize y CSS puro. Mern products App consume la data de un Back-End creado en Node Js con Express y uso de MongoDB, completando el stack MERN. Aquí te dejo el repositorio del Back-End para que lo corras antes de correr el Front [https://github.com/Santiago-Barrios/MERN-PRODUCTS-BACK] (recuerda leer el readme de este proyecto también)


## Dependencias que usa la aplicación en el Front-End
-    "@testing-library/jest-dom": "^5.11.5",
-    "@testing-library/react": "^11.1.1",
-    "@testing-library/user-event": "^12.2.0",
-    "axios": "^0.21.0",
-    "react": "^17.0.1",
-    "react-dom": "^17.0.1",
-    "react-router-dom": "^5.2.0",
-    "react-scripts": "4.0.0",
-    "web-vitals": "^0.2.4"



### Instalación

Mern products App requiere [Node.js](https://nodejs.org/) v4+ para correr.

Instala las dependencies y devDependencies.

```sh
$ npm install
```
Para correr el proyecto de react después de tener las dependencias y los node_modules
```sh
$ npm start
```

Recuerda primero tener el server activo del Back-end [https://github.com/Santiago-Barrios/MERN-PRODUCTS-BACK], este proyecto de react corre en el puerto 8002, pero si gustas puedes cambiarlo desde el archivo .env en la raiz del proyecto.

Cuando tengas la aplicación corriendo y ya te hayas registrado, primero debes crear los types de los productos para luego crear los productos, el resto es bastante intuitivo.