
# Chatbot Inteligente utilizando Gemini, Firebase y React

Este proyecto es una aplicación de chatbot construida utilizando Gemini AI, Firebase y React. El chatbot aprovecha la IA de Gemini de Google para procesamiento de lenguaje natural, Firebase para los servicios de backend, y React para la interfaz de frontend.

## Prerrequisitos

- **Node.js**: Asegúrate de tener Node.js instalado en tu sistema. [Descárgalo aquí](https://nodejs.org/).
- **Cuenta de Firebase**: [Regístrate en Firebase](https://firebase.google.com/) si aún no tienes una cuenta.

## Funcionalidades

- **Firestore**: Almacenamiento de datos en tiempo real para mensajes de chat y datos de usuario.
- **Gemini AI**: Capacidades de procesamiento de lenguaje natural (NLP) para generar respuestas contextuales y precisas.

## Comenzando

### 1. Crear un Proyecto en React

```bash
npx create-react-app mi-chatbot
cd mi-chatbot
```

### 2. Instalar Firebase y Dependencias Necesarias

Instala Firebase y cualquier otra dependencia requerida para la funcionalidad del chatbot.

```bash
npm install firebase
npm install <otra-dependencia-necesaria>
```

### 3. Configurar Firebase

1. **Crear un Proyecto en Firebase**: Ve a la [Consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto.
2. **Generar Credenciales de Firebase**:
   - Ve a **Configuración del Proyecto** > **General** > **Tus Aplicaciones**.
   - Registra una nueva aplicación web y copia los valores de configuración de Firebase.
3. **Agregar Configuración de Firebase**:
   - Crea un archivo llamado `.env.local` en el directorio raíz de tu proyecto y agrega tus credenciales de Firebase:

     ```plaintext
      REACT_APP_FIREBASE_API_KEY=<TU_FIREBASE_API_KEY>
      REACT_APP_FIREBASE_AUTH_DOMAIN=<TU_FIREBASE_AUTH_DOMAIN>
      REACT_APP_FIREBASE_PROJECT_ID=<TU_FIREBASE_PROJECT_ID>
      REACT_APP_FIREBASE_STORAGE_BUCKET=<TU_FIREBASE_STORAGE_BUCKET>
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<TU_FIREBASE_MESSAGING_SENDER_ID>
      REACT_APP_FIREBASE_APP_ID=<TU_FIREBASE_APP_ID>
     ```

4. **Instalar la Extensión de Gemini en Firebase**:
   - Sigue las instrucciones de configuración en Firebase para instalar y configurar la extensión de Gemini.
   - Asegúrate de que tu proyecto de Firebase esté en el plan Blaze para acceder a las funciones necesarias de Gemini.

### 4. Estructura del Proyecto

Organiza tu proyecto de la siguiente manera:

```
src/
├── components/
│   ├── Chat.jsx         # Componente de la interfaz del chat
│   ├── Home.jsx         # Componente de la página de inicio
├── hooks/
│   ├── useChat.js       # Hook personalizado para manejar la lógica del chat
├── lib/
│   ├── firebaseConfig.js # Configuración e inicialización de Firebase
```

### 5. Configurar Componentes del Chatbot

- **`src/lib/firebaseConfig.js`**: Inicializa Firebase aquí.
- **`src/hooks/useChat.js`**: Crea la lógica personalizada para manejar interacciones de chat y respuestas.
- **`src/components/Chat.jsx`**: Construye la interfaz de usuario para el chat.

### 6. Pruebas y Despliegue

1. **Ejecutar Localmente**: Inicia la aplicación de React en tu máquina local.

   ```bash
   npm start
   ```

2. **Desplegar en Firebase Hosting**:
   - Configura Firebase Hosting en tu proyecto, si lo deseas.
   - Sigue las instrucciones de Firebase para desplegar tu aplicación.

## Demo

Para ver una demostración en vivo del chatbot, escanea el código QR o visita el [enlace de la demo](#).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
