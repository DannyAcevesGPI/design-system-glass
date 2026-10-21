# Documentación · Design System Glass

Esta carpeta es la memoria del sistema: qué existe, por qué existe, cómo se usa y cómo se extiende sin romperlo.

## Lee según tu objetivo

| Si eres… | Empieza por… | Después… |
| --- | --- | --- |
| Diseño o producto | [`05-brand.md`](05-brand.md) | [`03-tokens.md`](03-tokens.md) y [`04-components.md`](04-components.md) |
| Front-end | [`02-architecture.md`](02-architecture.md) | [`03-tokens.md`](03-tokens.md) y [`04-components.md`](04-components.md) |
| Agente o asistente | [`../AGENTS.md`](../AGENTS.md) | [`06-ai-experience.md`](06-ai-experience.md) y [`../components/registry.json`](../components/registry.json) |
| Mantenedor | [`01-discovery.md`](01-discovery.md) | [`07-contributing.md`](07-contributing.md) |
| Migrando desde la versión anterior | [`08-migration.md`](08-migration.md) | [`02-architecture.md`](02-architecture.md) |

## Mapa

| Documento | Contenido |
| --- | --- |
| [`01-discovery.md`](01-discovery.md) | Auditoría del repositorio, inventario, hallazgos, riesgos y decisiones. |
| [`02-architecture.md`](02-architecture.md) | Capas, flujo de tokens, theming, artefactos generados y extensión. |
| [`03-tokens.md`](03-tokens.md) | Referencia de color, tipografía, espacio, radios, sombras y backdrop. |
| [`04-components.md`](04-components.md) | Catálogo, composición, accesibilidad, patrones y contrato de componentes. |
| [`05-brand.md`](05-brand.md) | Marca, logo animado, portada, voz y reglas de uso. |
| [`06-ai-experience.md`](06-ai-experience.md) | Cómo leer, planificar, implementar y validar con agentes. |
| [`07-contributing.md`](07-contributing.md) | Añadir tokens, componentes, docs y releases. |
| [`08-migration.md`](08-migration.md) | Migración del namespace anterior a `dsg-*`. |
| [`09-audit.md`](09-audit.md) | Evidencia de accesibilidad, contraste y regresión visual. |

## Convenciones de esta documentación

- **Idioma:** español, con los nombres técnicos de clases y tokens en inglés.
- **Fuente de verdad:** `tokens.json` para valores; `components/bundle.css` para clases; `components/registry.json` para el catálogo.
- **Enlaces relativos:** todos los enlaces funcionan desde el repositorio, sin depender de un servidor.
- **Ejemplos:** usan `dsg-*`, `data-theme` y tokens; nunca valores hexadecimales sueltos.
- **Estados:** `stable`, `beta`, `alpha`, `deprecated`. Un componente `stable` tiene README, preview, registro y validación.

## Regla de oro

Si una decisión no está escrita, no es una regla: es una costumbre. Toda regla nueva debe vivir en el documento que le corresponde y, si es verificable, en `scripts/validate.mjs`.
