# README


server url: https://test-books.onrender.com/docs/#


## PASOS PARA LA INSTALACION LOCAL

 - git clone 
 - copiar .env en la carpeta raiz del proyecto
 - npm i
 - npm run dev 

 


Los componentes principales son:

- `src/domain/`: Aquí es donde reside la lógica de negocio. Incluye entidades, interfaces de repositorios e interfaces de fuentes de datos.

- `src/infrastructure/`: Esta capa implementa las interfaces definidas en la capa de dominio. Incluye las operaciones de base de datos reales, y también podría incluir cosas como acceso al sistema de archivos, solicitudes de red, etc.

- `src/presentation/`: Esta capa es responsable de manejar las solicitudes y respuestas HTTP. Incluye tus controladores y rutas.

- `src/data/`: Capa ser responsable de las conexiones y configuraciones de la base de datos.

- `src/config/`: Aquí es donde residen los archivos de configuración.

Esta arquitectura está diseñada para hacer que el sistema sea fácil de cambiar y mantener, separando preocupaciones y haciendo que las dependencias fluyan hacia adentro desde las capas exteriores (infraestructura, presentación) hacia la capa interna (dominio).