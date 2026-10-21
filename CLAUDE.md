# CLAUDE.md

Este repo usa un contrato único para agentes: **lee [`AGENTS.md`](AGENTS.md) antes de actuar**.

@AGENTS.md

## Recordatorios rápidos

- Namespace: `dsg-*` y `--dsg-*`.
- Fuente de verdad: `tokens.json` y `components/bundle.css`.
- No edites `tokens.css` ni `tailwind/globals.css`: `npm run build`.
- No anides `.dsg-glass`: usa `.dsg-inset`.
- No uses color como única señal de estado.
- Termina con `npm run build && npm run validate`.
- Si falta contexto de producto, pregunta.
