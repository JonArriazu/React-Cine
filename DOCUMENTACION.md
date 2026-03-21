# Documentación técnica - React Cine

## 1. Descripción general

React Cine es una aplicación web desarrollada con React que permite visualizar un catálogo de películas, consultar su información detallada y gestionar funcionalidades como favoritos, comentarios y puntuaciones.

La aplicación incluye autenticación de usuarios mediante Firebase, lo que permite que cada usuario tenga su propia interacción con las películas. Además, se han incorporado mejoras de experiencia de usuario como un buscador de películas por título y un sistema de cambio de tema entre modo oscuro y modo claro con persistencia de preferencia.


## 2. Tecnologías utilizadas

- React (librería principal para la construcción de la interfaz)
- Vite (entorno de desarrollo y compilación)
- React Router (navegación entre páginas)
- Firebase Authentication (registro, inicio y cierre de sesión)
- Firebase Firestore (almacenamiento de favoritos, comentarios y puntuaciones)
- CSS (estilos personalizados)
- localStorage (persistencia del tema visual elegido por el usuario)


## 3. Estructura del proyecto

El proyecto está organizado de la siguiente manera:

- `src/components`: componentes reutilizables de la aplicación
- `src/pages`: páginas principales de la aplicación
- `src/context`: gestión de estado global, como la autenticación del usuario
- `src/firebase`: configuración e inicialización de Firebase
- `src/data`: datos estáticos del catálogo de películas

Esta organización permite separar la lógica, la presentación y los datos, facilitando el mantenimiento y la escalabilidad del proyecto.


## 4. Componentes principales

### Header
Muestra la barra de navegación principal, permite acceder a las distintas páginas y contiene el botón para alternar entre modo oscuro y modo claro.

### Footer
Muestra información general de la aplicación y enlaces complementarios.

### Layout
Componente contenedor que organiza la estructura general de la aplicación, integrando cabecera, contenido principal y pie de página.

### ProtectedRoute
Protege determinadas rutas para que solo puedan ser accedidas por usuarios autenticados.

### MovieCard
Representa una película dentro del catálogo mostrando su imagen, título y acceso al detalle.

### MovieList
Renderiza el listado de películas en formato de cuadrícula.

### CategoryFilter
Permite filtrar las películas según su categoría.

### CommentForm
Permite a los usuarios autenticados añadir comentarios a una película.

### CommentList
Muestra los comentarios asociados a una película.

### Rating
Permite puntuar una película y muestra la media de puntuaciones registradas.


## 5. Páginas

### Home
Página principal donde se muestra el catálogo de películas. Incluye el filtrado por categorías y un buscador por título para localizar películas de forma más rápida.

### MovieDetail
Página que muestra la información detallada de una película, junto con sus comentarios, puntuaciones y la opción de añadirla o quitarla de favoritos.

### Favorites
Página que muestra las películas marcadas como favoritas por el usuario autenticado.

### Contact
Página estática con información de contacto.

### Legal
Página estática con información legal sobre la aplicación.

### Login
Página que permite al usuario registrarse e iniciar sesión mediante Firebase Authentication.


## 6. Hooks y gestión de estado

En la aplicación se utilizan distintos hooks de React para gestionar el comportamiento y los datos:

- `useState`: para gestionar estados locales, como filtros, formularios, resultados del buscador o el tema visual.
- `useEffect`: para ejecutar lógica al cargar componentes o al producirse cambios en determinados estados.
- `useContext`: para acceder al estado global del usuario autenticado a través del contexto de autenticación.

El contexto de usuario permite reutilizar la información de sesión en distintos componentes sin necesidad de pasar props manualmente entre muchos niveles.

Además, el estado del tema visual se almacena y recupera utilizando `localStorage`, lo que permite mantener la preferencia del usuario aunque cierre o recargue la página.


## 7. Routing

La navegación entre páginas se realiza mediante React Router.

Rutas principales:

- `/` → Home
- `/movie/:id` → Detalle de película
- `/favorites` → Favoritos
- `/contact` → Contacto
- `/legal` → Aviso legal
- `/login` → Login

La ruta de favoritos está protegida mediante un componente de control de acceso, de forma que solo los usuarios autenticados pueden acceder a ella.


## 8. Firebase

### Authentication
Se utiliza Firebase Authentication para gestionar el registro, el inicio de sesión y el cierre de sesión de usuarios.

### Firestore
Se utiliza Firestore como base de datos para almacenar:

- Comentarios de usuarios
- Puntuaciones de películas
- Películas favoritas

De esta manera, cada usuario puede interactuar con la aplicación de forma personalizada y persistente.


## 9. Funcionalidades principales

- Visualización de catálogo de películas
- Filtrado por categorías
- Búsqueda de películas por título
- Visualización de detalles de cada película
- Registro e inicio de sesión de usuarios
- Añadir comentarios
- Puntuar películas
- Guardar películas en favoritos
- Visualizar lista de favoritos
- Cambio entre modo oscuro y modo claro
- Persistencia de la preferencia de tema mediante `localStorage`


## 10. Decisiones de diseño

Se ha optado por dividir la aplicación en componentes reutilizables para mejorar la organización, la legibilidad y el mantenimiento del código.

Se ha utilizado Firebase por su facilidad de integración con React y por permitir implementar autenticación y base de datos en una misma solución, reduciendo complejidad en el desarrollo.

El uso de React Router permite una navegación fluida entre páginas sin necesidad de recargar la aplicación.

También se ha incorporado un buscador por título para mejorar la experiencia de usuario a la hora de localizar películas dentro del catálogo.

Por otro lado, se ha implementado un sistema de cambio de tema entre modo oscuro y modo claro, manteniendo por defecto el modo oscuro para respetar la estética principal de la aplicación. La preferencia visual elegida por el usuario se guarda en `localStorage`, mejorando así la experiencia de uso.


## 11. Mejoras incorporadas

Además de los requisitos obligatorios planteados en la práctica, se han añadido varias mejoras orientadas a la experiencia de usuario:

- Buscador de películas por título
- Selector de tema claro/oscuro mediante botón en la cabecera
- Persistencia del tema seleccionado mediante `localStorage`
- Protección de rutas para restringir el acceso a favoritos solo a usuarios autenticados
- Mejora visual general mediante estilos personalizados y diseño responsive

Estas mejoras aportan mayor interactividad, personalización y facilidad de uso a la aplicación.