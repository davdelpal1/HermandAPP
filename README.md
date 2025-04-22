# HermandAPP

Este documento describe el proceso de arranque de la aplicación **HermandAPP**, tanto para la versión web como para la versión móvil.

## Requisitos previos

Antes de iniciar, asegúrate de contar con los siguientes requisitos:

- **Node.js** instalado (versión 14 o superior).
- **npm** o **yarn** como gestor de paquetes.
- Acceso al repositorio del proyecto.
- Un emulador o dispositivo físico para probar la aplicación móvil (opcional).

---

## Arranque de la aplicación web

1. **Clonar el repositorio**  
    Clona el repositorio en tu máquina local:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_PROYECTO>
    ```

2. **Instalar dependencias**  
    Ejecuta el siguiente comando para instalar las dependencias necesarias:
    ```bash
    npm install
    ```

3. **Configurar variables de entorno**  
    Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias según el archivo `.env.example`.

4. **Iniciar el servidor de desarrollo**  
    Ejecuta el siguiente comando para iniciar la aplicación web:
    ```bash
    npm start
    ```
    La aplicación estará disponible en `http://localhost:3000`.

---

## Arranque de la aplicación móvil

1. **Clonar el repositorio**  
    Si no lo has hecho ya, clona el repositorio y accede al directorio del proyecto:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_PROYECTO>
    ```

2. **Instalar dependencias**  
    Instala las dependencias necesarias:
    ```bash
    npm install
    ```

3. **Configurar variables de entorno**  
    Asegúrate de que las variables de entorno estén configuradas correctamente en el archivo `.env`.

4. **Iniciar el emulador o conectar un dispositivo físico**  
    Si estás utilizando un emulador, asegúrate de que esté ejecutándose. Si prefieres un dispositivo físico, conéctalo a tu computadora y habilita la depuración USB.

5. **Ejecutar la aplicación móvil**  
    Para dispositivos Android:
    ```bash
    npm run android
    ```
    Para dispositivos iOS:
    ```bash
    npm run ios
    ```

---

## Notas adicionales

- Si encuentras problemas durante el arranque, revisa los logs de error y asegúrate de que todos los requisitos previos estén cumplidos.
- Consulta la documentación oficial de las herramientas utilizadas si necesitas más ayuda.

¡Gracias por usar HermandAPP!