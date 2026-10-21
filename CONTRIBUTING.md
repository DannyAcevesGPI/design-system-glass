# Contribuir a Design System Glass

Gracias por querer mejorar el sistema. Este documento es la entrada rápida; el contrato completo está en [`docs/07-contributing.md`](docs/07-contributing.md).

## Antes de abrir un cambio

- Busca el componente o token más cercano en [`components/registry.json`](components/registry.json).
- Si el cambio introduce un token, una variante o una dependencia nueva, abre primero un issue para acordarlo.
- No edites archivos generados: `tokens.css`, `tailwind/globals.css` ni `tailwind/play-config.js`. Ejecuta `npm run build`.

## Flujo

1. Crea una rama desde `main`.
2. Haz el cambio con clases `dsg-*`, tokens `--dsg-*` y HTML semántico.
3. Actualiza preview, README, registro y documentación en el mismo cambio.
4. Ejecuta:

```bash
npm run build
npm run validate
```

5. Abre un pull request con el problema, la solución y la validación.

## Reglas que no se negocian

- Nada de colores hexadecimales sueltos en componentes.
- Nada de vidrio anidado; usa `.dsg-inset`.
- Nada de `div` clicables; usa `<button>` o `<a href>`.
- Nada de placeholder como etiqueta.
- Todo control debe tener foco visible y estado no solo por color.
- Toda animación debe respetar `prefers-reduced-motion`.
- No añadas dependencias sin justificar por qué la composición existente no alcanza.

## Licencia

Al contribuir aceptas que tu aporte se distribuya bajo la licencia MIT del proyecto. Las fuentes y Tailwind Play conservan sus propias licencias.
