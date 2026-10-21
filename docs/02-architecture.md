# 02 · Arquitectura

Design System Glass se organiza en capas con una dirección clara: **los valores fluyen hacia abajo; las decisiones se documentan hacia arriba**.

```text
tokens.json                 ← fuente de verdad (valores + uso)
   │
   ├── scripts/build.mjs ──► tokens.css ──────────────┐
   │                         (variables + tipografía)  │
   │                                                   ├──► tailwind/globals.css
   └── components/bundle.css ──────────────────────────┘     (base + components)
                                                              │
tailwind/dsg-preset.js ───────────────────────────────────────┤
                                                              ▼
                                                     app / index.html / previews
```

## 1. Capas

| Capa | Archivo | Responsabilidad | Se edita a mano |
| --- | --- | --- | --- |
| Valores | `tokens.json` | Colores, tipografía, espacio, radios, sombras y backdrop. | Sí |
| Tokens CSS | `tokens.css` | Variables `--dsg-*` y clases tipográficas. | No (generado) |
| Componentes CSS | `components/bundle.css` | Clases `.dsg-*` de vidrio, botones, chips, etc. | Sí |
| Integración Tailwind | `tailwind/dsg-preset.js` | Mapea tokens a utilidades (`bg-canvas`, `text-ink`…). | Sí |
| Integración CSS | `tailwind/globals.css` | Compone tokens + componentes en capas de Tailwind. | No (generado) |
| Previews | `components/<Nombre>/preview.html` | Demo aislada de un componente. | Sí |
| Galería | `index.html` | Documentación visual completa. | Sí |
| Catálogo máquina | `components/registry.json` | Reglas de uso, clases, accesibilidad y relaciones. | Sí |
| Contrato agente | `AGENTS.md`, `llms.txt` | Orden de lectura, guardrails y comandos. | Sí |

## 2. Flujo de tokens

### 2.1. Edición

Solo se edita `tokens.json`. Cada token de color tiene dos valores y una descripción de uso:

```json
{
  "name": "accent",
  "value": { "dark": "#5cd2f0", "light": "#0a6a86" },
  "usage": "Acción principal, enlaces, estado activo, foco."
}
```

### 2.2. Generación

```bash
npm run build
```

`scripts/build.mjs`:

1. Lee `tokens.json`.
2. Resuelve alias (`{accent-warm}` → `var(--dsg-accent-warm)`).
3. Genera `tokens.css` con los bloques de tema, fuentes, espacio, radios, sombras y backdrop.
4. Genera `tailwind/globals.css` envolviendo `tokens.css` en `@layer base` y `components/bundle.css` en `@layer components`.

### 2.3. Validación

```bash
npm run validate
```

`scripts/validate.mjs` compara los archivos generados con la salida esperada. Si alguien editó `tokens.css` a mano, falla y pide `npm run build`.

## 3. Temas

El tema se decide en `<html data-theme="...">`:

```html
<html lang="es" data-theme="dark">
```

| Estado | Selector efectivo |
| --- | --- |
| Oscuro explícito | `:root, [data-theme="dark"]` |
| Claro explícito | `[data-theme="light"]` |
| Sin atributo, sistema claro | `@media (prefers-color-scheme: light) :root:not([data-theme="dark"])` |
| Sin atributo, sistema oscuro | `:root` (bloque oscuro) |

Todos los componentes usan `var(--dsg-*)`. No hay variantes `dark:` en la capa de componentes: el tema cambia solo. El preset registra `darkMode` por atributo o clase para casos puntuales.

**Persistencia:** la galería guarda la elección en `localStorage` con la clave `dsg-theme` y la aplica antes de pintar para evitar el destello. En producto, usa cookie o `localStorage` con el mismo patrón.

## 4. Vidrio y fondo

El vidrio no funciona solo: necesita color detrás. Toda página lleva `.dsg-mesh` en el `body`.

```html
<body class="dsg-mesh">
  <article class="dsg-glass">…</article>
</body>
```

Jerarquía:

```text
.dsg-glass--hero  (32px)  → solo hero
.dsg-glass--panel (26px)  → paneles y menú
.dsg-glass        (22px)  → cards
.dsg-inset        (18px)  → filas dentro de vidrio
```

Regla: **no anidar `.dsg-glass` dentro de `.dsg-glass`**. El desenfoque doble ensucia el texto. Para elevar un elemento dentro de un vidrio, usa `.dsg-inset`.

Variantes de fondo:

- `.dsg-mesh`: manchas azul, turquesa y ámbar.
- `.dsg-mesh--admin`: variante administrativa con más violeta.

## 5. Tailwind

El preset expone:

| Grupo | Utilidades |
| --- | --- |
| Color | `bg-canvas`, `text-ink`, `text-ink-muted`, `text-ink-subtle`, `bg-glass`, `bg-glass-strong`, `border-glass-rim`, `border-line`, `bg-accent`, `text-accent-on`, `text-success`, `text-danger`, `text-admin` |
| Tipografía | `font-display`, `font-sans`, `font-mono`, `text-display-xl`, `text-display-lg`, `text-kpi`, `text-heading-*`, `text-body-*`, `text-caption`, `text-eyebrow`, `text-overline` |
| Forma | `rounded-control`, `rounded-row`, `rounded-glass`, `rounded-panel`, `rounded-hero` |
| Efecto | `shadow-glass`, `backdrop-blur-glass`, `backdrop-saturate-160` |
| Movimiento | `animate-ticker` |

Los colores son variables completas. Por eso `bg-accent/20` **no** produce un tono translúcido; usa una clase de componente o `color-mix()`.

## 6. Previews y galería

### Preview aislada

Cada componente tiene `components/<Nombre>/preview.html`:

```html
<!-- @dsCard group="Acciones" height=150 subtitle="..." -->
<!doctype html>
<html lang="es" data-theme="dark">
<head>
  <link rel="stylesheet" href="../../tokens.css">
  <link rel="stylesheet" href="../bundle.css">
  <link rel="stylesheet" href="../../assets/fonts/fonts.css">
  <script src="../../tailwind/vendor/tailwind-play-3.4.17.js"></script>
  <script src="../../tailwind/play-config.js"></script>
</head>
<body class="dsg-mesh">…</body>
</html>
```

La convención `@dsCard` describe cómo se muestra la tarjeta en una galería externa:

| Atributo | Uso |
| --- | --- |
| `group` | Agrupación visual (Superficies, Acciones, Datos…). |
| `height` | Altura sugerida en píxeles. |
| `subtitle` | Descripción corta. |

### Galería

`index.html` es la documentación visual. Carga `tokens.css` y `components/bundle.css` como archivos externos, usa CSS propio y el Tailwind Play vendorizado para demostrar las clases del preset. Las previews que usan utilidades cargan el mismo Tailwind local. No es un snapshot: si cambias los tokens y reconstruyes, la galería refleja el cambio.

## 7. Nombres

| Tipo | Convención | Ejemplo |
| --- | --- | --- |
| Clase base | `dsg-<bloque>` | `.dsg-glass` |
| Modificador | `dsg-<bloque>--<variante>` | `.dsg-btn--primary` |
| Elemento | `dsg-<bloque>__<parte>` | `.dsg-notice__title` |
| Variable CSS | `--dsg-<token>` | `--dsg-ink-muted` |
| Componente | PascalCase | `StatusChip` |
| Archivo | Nombre del componente | `components/StatusChip/` |
| Token lógico | kebab-case sin prefijo | `ink-muted` |

Los tokens lógicos no llevan `dsg-` en `tokens.json` porque ya viven dentro del sistema; el prefijo aparece en la variable CSS y en la clase.

## 8. Extensión

### Añadir un token

1. Agrega el token a `tokens.json` con valores dark/light y `usage`.
2. Ejecuta `npm run build`.
3. Si necesitas una utilidad Tailwind, mapea la variable en `tailwind/dsg-preset.js`.
4. Documenta el token en `docs/03-tokens.md`.
5. Ejecuta `npm run validate`.

### Añadir un componente

1. Crea `components/<Nombre>/README.md` y `preview.html`.
2. Añade las clases a `components/bundle.css`.
3. Añade la entrada a `components/registry.json`.
4. Enlaza el componente desde `docs/04-components.md` y la galería si aplica.
5. Ejecuta `npm run build && npm run validate`.

### Cambiar la marca

1. Actualiza `assets/brand/*`.
2. Actualiza `docs/05-brand.md`, `README.md` y `index.html`.
3. No cambies el namespace `dsg-*` por un cambio de marca: el namespace es técnico, no marketing.

## 9. Decisiones de arquitectura

| Decisión | Alternativa descartada | Por qué |
| --- | --- | --- |
| Tokens en JSON + build | Editar CSS a mano | Una fuente de verdad y validación automática. |
| CSS generado, no runtime | CSS-in-JS | Funciona en cualquier stack y no ata el sistema a React. |
| Clases `.dsg-*` | Solo utilidades Tailwind | Las clases encapsulan vidrio, foco y estados complejos. |
| Preview HTML aislada | Storybook | Cero dependencias y portable. |
| Registro JSON | Solo README | Los agentes necesitan datos estructurados y validables. |
| Galería propia | Documentación solo en Markdown | El vidrio y los temas se entienden viéndolos. |

## 10. Modo offline

La galería y las previews no hacen peticiones externas:

- Tailwind Play 3.4.17 está vendorizado en `tailwind/vendor/tailwind-play-3.4.17.js` (MIT, ver `LICENSE-Tailwind.txt`).
- Las fuentes están en `assets/fonts/` como WOFF2 con subset latin y sus licencias OFL.
- `assets/fonts/fonts.css` declara los `@font-face`; no se usa Google Fonts en la galería.
- El paquete npm no incluye Tailwind Play; sí incluye las fuentes, la marca y los componentes. El consumidor decide su build de Tailwind.

Para comprobar el modo offline, sirve el repo y bloquea la red: `index.html` y las 13 previews deben cargar igual.

## 11. Soporte de navegadores

La matriz objetivo es **evergreen moderno**. No hay polyfills ni builds alternativos.

| Navegador | Versión mínima | Qué la define |
| --- | --- | --- |
| Chrome / Edge | 111 | `color-mix()`, `offset-path` y `backdrop-filter`. |
| Firefox | 113 | `color-mix()` y `offset-path` en SVG. |
| Safari / iOS Safari | 16.4 | `color-mix()` y `offset-path` estables. |

Qué ocurre fuera de la matriz:

- `backdrop-filter` degrada a un fondo translúcido sin desenfoque; el texto sigue siendo legible.
- `color-mix()` puede dejar sin pintar bordes y fondos derivados. No hay fallback estático.
- `offset-path` puede dejar los electrones en el origen del SVG. La marca y el texto no dependen de ello.
- La galería y las previews funcionan sin red; el paquete de tokens y componentes no incluye Tailwind Play.

Decisión: no se da soporte a Internet Explorer, Edge Legacy ni navegadores sin `color-mix()`. Si un producto necesita una matriz más amplia, debe aportar sus propios fallbacks y documentarlos como extensión.

## 12. Límites conocidos

- El paquete está preparado para publicarse, pero la publicación real requiere credenciales y un scope npm válido.
- `tailwind/play-config.js` se genera desde el preset; no se edita a mano.
- La galería y las previews usan assets vendorizados; actualizarlos es una tarea manual documentada en `tailwind/vendor/README.md`.
- La auditoría de accesibilidad es estructural y de contraste de tokens; no sustituye una prueba con lector de pantalla.
- La regresión visual se revisa manualmente; no hay snapshots automatizados.

Estos límites están en la hoja de ruta de [`01-discovery.md`](01-discovery.md) y no se ocultan en la documentación.
