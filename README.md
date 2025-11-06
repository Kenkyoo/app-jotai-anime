# 🌸 Waifu App - Jotai State Management Demo

Una aplicación moderna de React que consume la API de [waifu.im](https://waifu.im) para mostrar imágenes de anime, utilizando **Jotai** para la gestión de estado asíncrono y **React Spring** para animaciones fluidas.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Jotai](https://img.shields.io/badge/Jotai-2.15.1-000000)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)

## ✨ Características

- 🎨 **Gestión de estado con Jotai**: Manejo eficiente de estado asíncrono y reactivo
- 🌊 **Animaciones con React Spring**: Transiciones suaves entre páginas
- 🎭 **UI con DaisyUI + Tailwind CSS**: Componentes estilizados y responsivos
- 🖼️ **Integración con waifu.im API**: Búsqueda y visualización de imágenes de anime
- ⚡ **Suspense de React**: Carga asíncrona con fallbacks elegantes
- 📱 **Diseño responsive**: Navbar adaptable a móviles y desktop

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Kenkyoo/app-jotai-anime.git

# Entrar al directorio
cd app-jotai-anime

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Previsualiza el build de producción
npm run lint     # Ejecuta el linter
```

## 🛠️ Tecnologías

### Core
- **React 19.1.1** - Biblioteca UI con Suspense
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.1.7** - Build tool ultrarrápido

### Estado y Datos
- **Jotai 2.15.1** - Gestión de estado atómico y asíncrono
- **waifu.im API** - Fuente de imágenes de anime

### UI y Estilos
- **Tailwind CSS 4.1.16** - Framework CSS utility-first
- **DaisyUI 5.4.5** - Componentes preconstruidos para Tailwind
- **React Spring 10.0.3** - Animaciones basadas en física

### Utilidades
- **html-react-parser 5.2.8** - Parser de HTML seguro

## 📂 Estructura del Proyecto

```
app-jotai-anime/
├── src/
│   ├── App.tsx          # Componente principal con lógica Jotai
│   ├── main.tsx         # Punto de entrada
│   └── ...
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Conceptos Clave de Jotai

### Atoms Asíncronos

```typescript
const postData = atom(async (get) => {
  const id = get(postId);
  const response = await fetch(`https://api.waifu.im/search?id=${id}`);
  const data = await response.json();
  return data.images[0];
});
```

### Hooks de Jotai

- `useAtom(atom)` - Lee y escribe el estado
- `useSetAtom(atom)` - Solo escribe (evita re-renders innecesarios)
- `useAtomValue(atom)` - Solo lectura

### Suspense Integration

Jotai se integra nativamente con React Suspense para manejar estados de carga:

```tsx
<Suspense fallback={<h2>Loading...</h2>}>
  <PostTitle />
</Suspense>
```

## 🎨 Características de la UI

- **Hero Section**: Fondo dinámico con la imagen actual
- **Card Component**: Información detallada (ID, artista, favoritos, tamaño)
- **Color Dominante**: El card usa el color dominante de la imagen
- **Navbar Responsive**: Menú hamburguesa en móviles
- **Botón Next**: Navegación secuencial con animación del contador

## 🌐 API Utilizada

**waifu.im API**
- Endpoint: `https://api.waifu.im/search`
- Parámetros: `id` para búsqueda específica
- Respuesta: Objeto con array `images` conteniendo metadata de imágenes

### Datos Retornados

```typescript
type PostData = {
  url?: string;
  favorites: number;
  image_id: number;
  uploaded_at: string;
  source: string;
  dominant_color: string;
  byte_size: number;
  signature: string;
  artist: { name: string };
}
```

## 🐛 Solución de Problemas

### Invalid Date

Si ves "Invalid Date", asegúrate de usar:
```typescript
new Date(uploaded_at).toLocaleDateString("es-AR")
```
El campo `uploaded_at` viene como string ISO, no como timestamp Unix.

### Datos no se muestran

Verifica que estés accediendo a `data.images[0]` en el atom, ya que la API devuelve un objeto con un array `images`.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 👨‍💻 Autor

**Kenkyoo**
- GitHub: [@Kenkyoo](https://github.com/Kenkyoo)
- Repo: [app-jotai-anime](https://github.com/Kenkyoo/app-jotai-anime)

---

Hecho con 🩷 y ☕ usando React + Jotai

## 📚 Recursos

- [Documentación de Jotai](https://jotai.org/)
- [React Spring Docs](https://www.react-spring.dev/)
- [waifu.im API](https://waifu.im/docs/)
- [DaisyUI Components](https://daisyui.com/components/)
- [Tailwind CSS](https://tailwindcss.com/docs)