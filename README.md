# Investment Platform (Scaffold)

Proyecto: Plataforma de inversión — scaffold inicial con Next.js, TypeScript y Tailwind.

Pasos rápidos:

```bash
# instalar dependencias
npm install

# ejecutar en modo desarrollo
npm run dev

# iniciar Storybook
npm run storybook

# formatear código
npm run format

# chequeo de tipos
npm run typecheck
```

Notas:
- Para crear el proyecto desde cero con `create-next-app` usa:

```bash
npx create-next-app@latest investment-platform --ts
cd investment-platform
npm install
```

- Después instala Storybook y dependencias de desarrollo:

```bash
npm install -D @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/testing-library
```

Siguientes pasos recomendados:
- Añadir Storybook con `npx storybook@latest init` para integración automática.
- Añadir CI (GitHub Actions) para checks y despliegue.
- Integrar Storybook con Chromatic o Percy para visual testing.
