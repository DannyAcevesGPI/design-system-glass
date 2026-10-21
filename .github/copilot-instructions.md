# GitHub Copilot · Design System Glass

Antes de sugerir o modificar código en este repositorio, lee [`AGENTS.md`](../AGENTS.md). Es el contrato operativo y prevalece sobre cualquier suposición.

## Contexto

- Sistema de diseño front-end, no una aplicación. Sin servidor de desarrollo ni framework obligatorio.
- Stack de referencia: Next.js + Tailwind CSS 3.4.
- Namespace: `dsg-*` para clases y `--dsg-*` para variables CSS.
- Fuente de verdad: `tokens.json` (valores) y `components/bundle.css` (clases).
- Documentación en español; nombres técnicos en inglés.

## Reglas para sugerencias

1. Usa solo tokens, clases y variantes existentes. Si falta algo, propón la extensión y su documentación; no la inventes.
2. No edites `tokens.css` ni `tailwind/globals.css`: son generados por `npm run build`.
3. No uses hexadecimales ni `rgb()` en componentes.
4. No uses `hub-*` ni variables sin el prefijo `--dsg-`.
5. No anides `.dsg-glass`; usa `.dsg-inset`.
6. No uses el color como única señal de estado: añade texto o ícono.
7. Usa `<button>` o `<a href>` en lugar de `div` con `onClick`, y `<label>` visible en formularios.
8. Mantén el foco visible, el objetivo táctil de 44×44 px (48 px en botones) y `prefers-reduced-motion`.
9. Si añades o cambias un componente, actualiza `README.md`, `preview.html` y `components/registry.json` en el mismo cambio.
10. Cierra con `npm run build && npm run validate`.

## Dónde mirar

- Componente y cuándo usarlo: `components/registry.json` (`useWhen`, `avoidWhen`).
- Valores y temas: `tokens.json` y `docs/03-tokens.md`.
- Catálogo y accesibilidad: `docs/04-components.md`.
- Marca y assets: `docs/05-brand.md`.
- Flujo para agentes y recetas: `docs/06-ai-experience.md`.

## Límites

- No añadas dependencias sin justificar por qué la composición existente no alcanza.
- No cambies la marca sin actualizar `docs/05-brand.md` y los assets.
- No inventes datos de producto: si un dato es demostrativo, márcalo.
- Si falta contexto de producto, copy o flujo, pregunta antes de implementar.
