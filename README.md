Ejercio del Modulo6 de html-Miriadax

Partiendo del esqueleto quiz empezar a realizar cambios
1) Primera página y añadir el favicon.ico. Documentación en transp_m6.pdf

2) Añadir la primera pregunta /respuesta

3) Instalar el marco de aplicación
  cd mis_proyectos/quiz/node_modules
  $ npm install --save express-partials@0.3.0
      express-partials@0.3.0 node_modules/express-partials

Así apunta las dependencias en el fichero package.json de quiz
     "express-partials": "^0.3.0"

 - Modificar app.js
 - Modificar las vistas
 Guardo la version

4) CSS adaptable a móviles - media-queries

5) Heroku. Creo cuenta, instalo tools y creo el fichero Procfile

---
Las url:

herokuapp

https://quiz-tm.herokuapp.com

Git
https://github.com/teresamp/quiz

6) Instalación de sequelize SQLite3 y ajuste de los ficheros.
    crear el fichero .env para las variables de la bd
7) Paso a Postgres
  - Cambiar dependencias en package.json
8) Añadir más preguntas
9) Añadir el buscar el el campo pregunta
10) Añadir el Autoload 
11) Añadir preguntas en la base de datos
12) Editar /Borrar   
