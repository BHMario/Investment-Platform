# Plataforma de Inversión - Especificación Funcional y UI/UX

Última actualización: 2026-08-05

## Visión del producto
Crear una plataforma de inversión profesional, segura y accesible que permita a individuos y empresas gestionar activos, invertir en productos variados (renta fija, renta variable, ETFs, fondos, private equity, crypto opcional) y recibir análisis avanzados.

El producto debe destacar por una experiencia de usuario (UX) pulida y un diseño obsesivo por los detalles (microinteracciones, estados, accesibilidad, consistencia visual), optimizado para confianza y conversión.

## Público objetivo
- Inversores particulares (novatos y experimentados)
- Asesores financieros y family offices
- Traders institucionales pequeños

## Roles y permisos
- Usuario anónimo: explorar landing y contenido marketing
- Usuario verificado: ver dashboard, portafolios, invertir
- Usuario profesional / institucional: acceso a datos avanzados y API
- Admin: gestión de usuarios, productos, compliance

## Requisitos funcionales (alto nivel)
1. Autenticación y autorización
   - Registro y login (email + password, OAuth: Google, Apple)
   - Verificación KYC (integración con proveedor externo)
   - MFA opcional (SMS/Authenticator)
2. Dashboard
   - Vista consolidada de portafolio: valor, rendimiento, alocación
   - KPI principales: ROI, drawdown, rendimiento 1D/1W/1M/1Y
   - Feed de actividad y noticias relevantes
3. Gestión de portafolio
   - Crear y editar portafolios (multi-currency)
   - Visualizaciones: gráficos interactivos (candlestick, line), distribución por activos
   - Rebalances sugeridos
4. Mercado de inversiones
   - Buscar instrumentos: acciones, ETFs, fondos, bonos
   - Ficha de producto con datos: ticker, precio, volumen, métricas, documentos
   - Órdenes: compra/venta, órdenes market/limit/stop
5. Flujos de inversión automatizados
   - Planes periódicos (DCA)
   - Rebalance automático por reglas
6. Gestión de órdenes y historial
   - Estado de órdenes en tiempo real
   - Historial y filtro avanzado
7. Pagos y custodia
   - Integración con pasarelas (ACH/SEPA/Stripe/PayPal según región)
   - Gestión de fondos: depósitos, retiros, conciliación
8. Informes y analítica
   - Reportes descargables (PDF/CSV)
   - Métricas avanzadas (VaR, Sharpe, Beta)
9. Notificaciones
   - Push, email, in-app para eventos clave
10. Seguridad y cumplimiento
   - Encriptación en reposo y tránsito
   - Logs de auditoría
   - Detección de fraude básico

## Requisitos no funcionales
- Rendimiento: interacciones <200ms (UI), operaciones batch en background
- Escalabilidad: arquitectura preparada para microservicios
- Disponibilidad: 99.9% objetivo para componentes críticos
- Internacionalización: soporte multi-idioma y multi-moneda
- Accesibilidad: WCAG AA mínimo
- Privacidad: cumplimiento GDPR/CCPA según región

## Arquitectura propuesta (frontend)
- Next.js (app / pages) con React + TypeScript
- Tailwind CSS + sistema de tokens (variables CSS)
- Component library atómica (`src/components/ui`) con Storybook (recomendado)
- Client-side data fetching: SWR o React Query
- State global: Zustand o React Context para UI ephemeral
- Modular folders: pages, features, components, hooks, services, lib, styles

## Diseño y UI/UX (obsesivo)
### Principios de diseño
- Claridad: cada pantalla debe tener un objetivo primario claro
- Jerarquía visual estricta: tipografía, color y espaciado coherentes
- Confianza: microcopy orientado a transparencia en comisiones y riesgo
- Tacto: microinteracciones sutiles para retroalimentación inmediata
- Consistencia: tokens y componentes reutilizables

### Sistema de diseño (tokens)
- Paleta de colores: primario, secundario, success, warning, danger, neutral (escala 0-900)
- Tipografía: variable font para rendimiento (ej. Inter Variable)
- Espaciado: 4pt/grid con rampas 4/8/16
- Elevaciones y sombras: tres niveles (card, modal, floating)
- Radio de borde uniforme para elementos interactivos

### Componentes críticos
- Botones (primary/secondary/ghost), with loading and disabled states
- Inputs: text, select, combobox con accesibilidad
- Table con virtualización para grandes listados
- Modal y drawers con foco manejado
- Charts: wrappers para Recharts/Highcharts con temas oscuros/claro
- Toasts y banners para errores y confirmaciones

### Flujos UX principales
- Onboarding (registro + KYC) con barra de progreso y estados guardados
- Primer depósito guiado con microcopy que reduzca fricción
- Compra rápida (Quick Buy) desde ficha de producto
- Gestión de órdenes con confirmación y resumen de comisiones

### Microinteracciones y estados
- Skeleton loaders para listas y tarjetas
- Transiciones suaves en hover/focus
- Confirma-undo para acciones destructivas
- Estados vacíos con CTAs claros y educación contextual

## Páginas y rutas (esquemático)
- / (Landing)
- /auth/login, /auth/register, /auth/verify
- /dashboard
- /portfolio (lista), /portfolio/[id]
- /market (buscador), /market/[ticker]
- /orders
- /wallet (depósitos/retiros)
- /settings (perfil, seguridad)
- /admin/* (dashboard interno)

## Modelado de datos (alto nivel)
- User: id, nombre, email, roles, estadoKYC, preferences
- Portfolio: id, ownerId, activos[], currency
- Asset: ticker, tipo, metadata
- Order: id, portfolioId, assetId, side, cantidad, precio, estado, timestamps

## Integraciones recomendadas
- KYC provider: Onfido / Persona
- Custodia/pagos: Stripe (payouts), Plaid (bank link) o proveedor local
- Market data: Alpha Vantage / IEX / Polygon (según cobertura)
- Charts: Recharts / TradingView embeddable

## Analítica y observabilidad
- Instrumentar eventos con Segment/Amplitude
- Logs y métricas: Sentry + Prometheus/Grafana

## Pruebas y QA
- Unit tests: Jest + React Testing Library
- E2E: Playwright / Cypress
- Visual regression: Chromatic o Percy

## Accesibilidad
- Roles ARIA donde aplique
- Keyboard-first navigation
- Contraste de colores verificado

## Seguridad
- CSP, XSS mitigations, salted+hashed passwords
- Rate limiting, WAF para endpoints críticos

## Entregables mínimos para MVP
- Landing y onboarding completo (KYC stub)
- Dashboard con vista de portafolio y gráfico
- Market: búsqueda básica y ficha de producto
- Quick buy (sandbox) y órdenes básicas
- Wallet (deposit stub) y reporte de operaciones

## Roadmap sugerido (fases)
1. Fase 0: Estructura, diseño system, autenticación básica
2. Fase 1: Dashboard, portafolios, market browsing
3. Fase 2: Órdenes reales, pagos, KYC completo
4. Fase 3: Analytics avanzados, automatizaciones
5. Fase 4: Internacionalización y optimización a escala

## Guía de estilo UX copy
- Mensajes claros y concisos
- Evitar jerga técnica donde el usuario no la necesite
- Mostrar comisiones y riesgos antes de confirmar

## Checklist de entrega
- [ ] Documento de requisitos aprobado
- [ ] Estructura de proyecto creada
- [ ] Componentes base implementados
- [ ] Diseño system tokenizado
- [ ] Integraciones mocked para pruebas

---

Si quieres, puedo ahora scaffoldear el proyecto con `create-next-app` y ejecutar `npm install`, o simplemente crear la estructura de carpetas y archivos iniciales (como hice aquí). ¿Cómo prefieres continuar?