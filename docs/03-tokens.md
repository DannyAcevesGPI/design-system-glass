# 03 · Tokens

Los tokens son el vocabulario del sistema. Se nombran por **significado**, no por valor: cambia el tema, el color o la marca, y el nombre sigue teniendo sentido.

- **Fuente de verdad:** `tokens.json`.
- **Salida CSS:** `tokens.css` (generado).
- **Prefijo de variable:** `--dsg-`.
- **Prefijo de clase:** `dsg-`.
- **Uso en Tailwind:** utilidades del preset (`bg-canvas`, `text-ink`, `border-glass-rim`…).

> No edites `tokens.css` a mano. Ejecuta `npm run build` después de cambiar `tokens.json`.

## 1. Color

| Token | Variable | Oscuro / Claro | Uso |
| --- | --- | --- | --- |
| `canvas` | `--dsg-canvas` | #070b14 / #ecf1fa | Fondo base, debajo de `.dsg-mesh`. Tailwind: `bg-canvas`. |
| `ink` | `--dsg-ink` | #eef2f8 / #0b1222 | Texto principal y títulos. Tailwind: `text-ink`. |
| `ink-muted` | `--dsg-ink-muted` | #aeb8ca / #36425a | Descripciones y texto de apoyo. Tailwind: `text-ink-muted`. |
| `ink-subtle` | `--dsg-ink-subtle` | #8c97ad / #4d5970 | Metadatos y fechas; mínimo 13px. Tailwind: `text-ink-subtle`. |
| `glass` | `--dsg-glass` | rgba(255,255,255,0.055) / rgba(255,255,255,0.46) | Relleno de superficies de vidrio. Tailwind: `bg-glass`. |
| `glass-strong` | `--dsg-glass-strong` | rgba(255,255,255,0.10) / rgba(255,255,255,0.72) | Vidrio elevado dentro de otro vidrio. Tailwind: `bg-glass-strong`. |
| `glass-rim` | `--dsg-glass-rim` | rgba(255,255,255,0.12) / rgba(255,255,255,0.88) | Borde de 1px del vidrio. Tailwind: `border-glass-rim`. |
| `glass-highlight` | `--dsg-glass-highlight` | rgba(255,255,255,0.10) / #ffffff | Luz interior superior; incluida en `shadow-glass`. |
| `line` | `--dsg-line` | rgba(255,255,255,0.12) / rgba(15,23,42,0.11) | Divisores, bordes de campos y botones secundarios. Tailwind: `border-line`. |
| `accent` | `--dsg-accent` | #5cd2f0 / #0a6a86 | Acción principal, enlaces, foco y «En desarrollo». Texto: `on-accent`. |
| `accent-warm` | `--dsg-accent-warm` | #f5b451 / #965700 | Cinta, «Piloto» y pendientes. Texto: `on-accent`. |
| `on-accent` | `--dsg-on-accent` | #04121a / #ffffff | Texto e íconos sobre accent, accent-warm, success y admin. |
| `success` | `--dsg-success` | #6ee7a8 / #0e7346 | Liberado, hito completado, fecha confirmada, texto agregado. |
| `warning` | `--dsg-warning` | = `accent-warm` | Alertas y dependencias. Alias semántico, no un color nuevo. |
| `danger` | `--dsg-danger` | #ff8f80 / #b3311e | Bloqueos, rechazos y texto eliminado. Siempre con texto o ícono. |
| `admin` | `--dsg-admin` | #b7a4ff / #5b3fd1 | Superficie administrativa, rol ADMIN e ícono activo. |

### Reglas de color

1. **Un color, un significado.** No uses `success` para decorar ni `danger` para llamar la atención.
2. **El color no es la única señal.** Chips con texto, avisos con tipo, diffs con tachado/subrayado.
3. **No escribas hexadecimales en componentes.** Usa `var(--dsg-*)` o una clase.
4. **No uses modificadores de opacidad de Tailwind** (`bg-accent/20`) sobre variables completas. Usa `color-mix()` o una clase de componente.
5. **Contraste:** los valores están elegidos para superar 4.5:1 en texto normal y 3:1 en texto grande/íconos. `npm run validate` comprueba los pares principales en ambos temas; si cambias un color, añade el par al validador y revisa `docs/09-audit.md`.

### Alias

`warning` apunta a `accent-warm`:

```json
{ "name": "warning", "value": "{accent-warm}" }
```

El build lo resuelve a `var(--dsg-accent-warm)`. Úsalo cuando el significado es de alerta, no cuando es solo el segundo acento.

## 2. Tipografía

| Estilo | Familia | Tamaño / Interlineado | Peso | Tracking | Uso |
| --- | --- | --- | --- | --- | --- |
| `display-xl` | display | 96px / 0.95 | 700 | -0.035em | Hero de portada; en pantalla `clamp(56px, 7vw, 96px)`. |
| `display-lg` | display | 52px / 1 | 700 | -0.03em | Título de página (`h1`). |
| `kpi` | display | 52px / 1 | 700 | -0.03em | Valor de un scorecard. |
| `heading-lg` | display | 28px / 1.15 | 700 | -0.015em | Título de sección fuera de un panel. |
| `heading-md` | display | 24px / 1.2 | 700 | -0.01em | Título de un panel de vidrio. |
| `heading-sm` | display | 20px / 1.25 | 700 | — | Título de card o columna lateral. |
| `body-lg` | sans | 17px / 1.55 | 400 | — | Introducción bajo un título, en `ink-muted`. |
| `body` | sans | 15px / 1.5 | 400 | — | Texto base de la interfaz. |
| `body-sm` | sans | 14px / 1.5 | 400 | — | Descripciones en cards y listas. |
| `caption` | sans | 13px / 1.45 | 400 | — | Metadatos y fechas, en `ink-subtle`. |
| `label` | sans | 15px / 1.4 | 600 | — | Botones, menú activo y títulos de fila. |
| `eyebrow` | mono | 12px / 1.3 | 500 | 0.14em | Antetítulo en mayúsculas sobre un `h1`, en `accent`. |
| `overline` | mono | 11px / 1.3 | 500 | 0.12em | Encabezado de grupo en menú, en mayúsculas y `ink-subtle`. |

### Familias

| Variable | Familia | Uso |
| --- | --- | --- |
| `--dsg-font-display` | Bricolage Grotesque | Títulos y cifras. |
| `--dsg-font-sans` | IBM Plex Sans | Interfaz y párrafos. |
| `--dsg-font-mono` | IBM Plex Mono | Antetítulos, overlines y metadatos técnicos. |

La galería y las previews usan `assets/fonts/fonts.css`, con WOFF2 locales (subset latin) y licencias OFL. En producto puedes usar `next/font/google`, Google Fonts o los mismos archivos:

```text
assets/fonts/fonts.css
```

### Reglas tipográficas

- No uses `display-xl` dentro de una card: es para el hero.
- No bajes `caption` de 13px.
- `eyebrow` y `overline` siempre en mayúsculas; el CSS ya aplica `text-transform`.
- Un `h1` por página. Los títulos de panel usan `h2`/`h3`, no `div` con clase de título.

## 3. Espacio

Escala de 4px, idéntica a Tailwind.

| Token | Valor | Uso |
| --- | --- | --- |
| `space-1` | 4px | Separación entre ítems de menú (`gap-1`). |
| `space-2` | 8px | Gap entre chips y tags. |
| `space-3` | 12px | Ícono + texto; gap entre botones. |
| `space-4` | 16px | Padding de filas y avisos; gap de grids. |
| `space-5` | 20px | Padding de página y cards compactas. |
| `space-6` | 24px | Padding estándar de card; gap entre secciones. |
| `space-7` | 28px | Padding de paneles grandes. |
| `space-10` | 40px | Padding vertical de hero. |
| `space-14` | 56px | Padding horizontal de hero en escritorio. |

## 4. Radios

| Token | Valor | Uso |
| --- | --- | --- |
| `radius-sm` | 8px | Tags y celdas pequeñas. |
| `radius-md` | 14px | Menú, campos y botones de ícono. |
| `radius-lg` | 18px | Filas y avisos dentro de un panel. |
| `radius-xl` | 22px | Card de vidrio por defecto. |
| `radius-2xl` | 26px | Paneles grandes y menú lateral. |
| `radius-3xl` | 32px | Hero. |
| `radius-full` | 9999px | Botones pill, chips y barras. |

## 5. Sombra y backdrop

| Token | Oscuro | Claro | Uso |
| --- | --- | --- | --- |
| `shadow-glass` | `inset 0 1px 0 rgba(255,255,255,0.10), 0 24px 48px -24px rgba(0,0,0,0.70)` | `inset 0 1px 0 #ffffff, inset 0 -1px 0 rgba(15,23,42,0.06), 0 0 0 0.5px rgba(15,23,42,0.10), 0 22px 46px -22px rgba(30,52,120,0.38)` | Luz superior, canto inferior y sombra difusa. Tailwind: `shadow-glass`. |

| Token | Valor | Uso |
| --- | --- | --- |
| `backdrop-glass` | `blur(22px) saturate(160%)` | Vidrio en oscuro. |
| `backdrop-glass-light` | `blur(26px) saturate(190%)` | Vidrio en claro; más saturación para que el fondo se note. |

## 6. Cómo se exponen en CSS

```css
/* tokens.css (generado) */
:root, [data-theme="dark"] {
  --dsg-canvas: #070b14;
  --dsg-ink: #eef2f8;
  --dsg-glass: rgba(255, 255, 255, 0.055);
  /* … */
}

[data-theme="light"] {
  --dsg-canvas: #ecf1fa;
  --dsg-ink: #0b1222;
  --dsg-glass: rgba(255, 255, 255, 0.46);
  /* … */
}
```

```css
/* componentes */
.card {
  background: var(--dsg-glass);
  color: var(--dsg-ink);
  border: 1px solid var(--dsg-glass-rim);
  border-radius: var(--dsg-radius-xl);
  box-shadow: var(--dsg-shadow-glass);
  backdrop-filter: var(--dsg-backdrop-glass);
}
```

## 7. Añadir o cambiar un token

1. Edita `tokens.json`.
2. Ejecuta `npm run build`.
3. Si el token necesita utilidad Tailwind, mapea `var(--dsg-*)` en `tailwind/dsg-preset.js`.
4. Actualiza esta página.
5. Ejecuta `npm run validate`.

Checklist para un token nuevo:

- [ ] Tiene valores para dark y light.
- [ ] Tiene `usage` que explica **cuándo** usarlo, no solo qué es.
- [ ] No duplica un token existente con otro nombre.
- [ ] No introduce un color crudo en componentes.
- [ ] Si es semántico, el nombre describe el significado, no el tono.
