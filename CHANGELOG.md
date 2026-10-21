# Cambios

## 2.0.0 — 2026-10-21

Primera versión publicable de Design System Glass.

### Añadido

- Marca **Design System Glass**, namespace `dsg-*` y variables `--dsg-*`.
- `tokens.json` v2 como fuente de verdad, con dark, light y `usage` por token.
- 13 componentes con README, preview y entrada en `components/registry.json`.
- Galería navegable `index.html` con temas dark/light y logo animado.
- Capa para agentes: `AGENTS.md`, `CLAUDE.md`, `llms.txt`, recetas y contratos.
- Validador sin dependencias: artefactos, tokens, contraste, estructura, enlaces y previews.
- Workflow de CI en `.github/workflows/validate.yml`.
- Fuentes locales WOFF2 con licencias OFL y Tailwind Play 3.4.17 vendorizado: galería y previews sin red.
- `LICENSE` MIT, `CHANGELOG.md` y paquete preparado para npm.
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` y `TRADEMARKS.md` para la comunidad open source.
- Matriz de navegadores evergreen y guía de migración desde el namespace anterior.
- Assets de marca optimizados (~37% menos en banner y lockups) sin perder animación ni reduced-motion.

### Cambiado

- `tailwind/play-config.js` se genera desde `tailwind/dsg-preset.js`; ya no se duplica a mano.
- El paquete usa `@dannyaceves/design-system-glass`, `publishConfig.access: public` y `files` acotado.
- Chips y avisos usan un tinte del 8–9% para mantener contraste en light.
- `Cover` es responsive; `Field`, `Notice` y `Scorecard` ajustan altura y rejilla.
- El índice móvil usa navegación compacta y enlace «Saltar al contenido».
- La cinta se pausa al recibir foco y respeta `prefers-reduced-motion`.
- El foco visible cubre ticker, portada y navegación del índice.

### Eliminado

- Board histórico de 4.2 MB (`reference/`) y referencias al producto original.
- Prefijo heredado `hub-*` y variables sin namespace.
- Dependencia de Google Fonts y Tailwind Play CDN en la galería.

### Licencia

MIT · Copyright (c) 2026 Daniel Aceves. Consulta [`LICENSE`](LICENSE).
