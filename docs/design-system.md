# Design System — Investment Platform

Última actualización: 2026-08-05

## Propósito
Este documento centraliza los tokens, principios y patrones de UI/UX para garantizar consistencia visual y usabilidad en toda la plataforma.

## Tokens
- Colores: paleta primaria y semántica (success, warning, danger)
- Tipografía: `Inter` variable para textos
- Espaciado: sistema 4pt base
- Radii: bordes suaves y consistentes
- Elevaciones: tres niveles para jerarquía

Ver los tokens visuales en Storybook (`Tokens` panel).

## Componentes
Lista priorizada de componentes con reglas primarias:
- `Button`: variantes `primary`, `secondary`, `ghost`, `danger`. Estados: `hover`, `active`, `focus`, `disabled`, `loading`.
- `Input`: label, help text, error, accessible `aria-describedby`.
- `Select`: keyboard navigation, clear button.
- `Modal`: trap focus, close on `Esc`, return focus to trigger.
- `Table`: virtualizable, keyboard rows selectables.
- `Header` / `Nav`: responsive, accessible menu, skip-to-content link.

## Accessibility
- WCAG AA compliance minimum.
- Contrast mínimo 4.5:1 para texto normal.
- Keyboard-first navigation: all interactive elements reachable.
- ARIA roles and live regions para notificaciones.

## Theming
- Support light/dark via `.theme-dark` class on root.
- Tokens adaptables; prefer variables sobre clases para overrides.

## Guidelines
- Use tokens, no colores o espaciados hard-coded.
- Prefer composability: componentes pequeños que se combinan.
- Microcopy: acción primaria + resultado esperado + coste.

## Tokens quick reference
- Primary: `--color-primary-500` (#2b6ef6)
- Success: `--color-success-500` (#16a34a)
- Danger: `--color-danger-500` (#ef4444)

## How to contribute
1. Añade token en `src/design/tokens.css` y `src/design/tokens.ts`.
2. Añade story en `src/components/*/*.stories.tsx` o MDX para documentación.
3. Ejecuta `npm run storybook` y abre `http://localhost:6006`.

---

A continuación, la checklist de accesibilidad y cómo probar visualmente en Storybook.
