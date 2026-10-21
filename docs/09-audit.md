# Auditoría de calidad · v2.0.0

Esta auditoría cubre las 13 previews y `index.html`. No es una certificación WCAG: es la evidencia de lo que se comprobó y lo que queda abierto.

## Método

- **Navegador:** Firefox 157 headless vía WebDriver, servidor local en `http://localhost:4173`.
- **Temas:** dark y light. En las previews el tema se cambia con `data-theme`; `Cover` se revisa en dark porque su hero es oscuro por diseño.
- **Tamaños:** 900×620 para escritorio y 500×900 para móvil (mínimo de la ventana headless).
- **Teclado:** recorrido con `Tab` en `index.html`, `Button`, `Field`, `NavItem`, `NewsTicker` y `SegmentedControl`, con lectura del `outline` calculado.
- **Contraste:** cálculo de luminancia relativa y composición alfa para tokens, vidrio, chips y avisos. El mismo cálculo corre en `npm run validate`.

## Resultados

| Área | Resultado | Evidencia |
| --- | --- | --- |
| Contraste de texto | Pasa 4.5:1 en dark y light para `ink`, `ink-muted`, `ink-subtle`, acentos y semánticos sobre canvas y vidrio. | `npm run validate` · bloque «contraste de tokens». |
| Contraste de rellenos | Pasa 4.5:1 para `on-accent` sobre accent, accent-warm, success y admin. | Igual. |
| Chips y avisos | El tinte se bajó a 8–9% para que accent-warm y success superen 4.5:1 en light. | `components/bundle.css` y validador. |
| Etiquetas de formulario | Los 5 controles de `Field` tienen `label`, `id` y nombre accesible. | Auditoría DOM + validador estructural. |
| Imágenes | No hay `<img>` sin `alt`; las decorativas usan `alt=""` o `aria-hidden`. | Validador estructural. |
| Controles clicables | No hay `div`/`span` con `onclick`; botones y enlaces tienen texto o `aria-label`. | Auditoría DOM + validador estructural. |
| Progressbar | Las dos barras tienen `aria-valuemin`, `aria-valuemax`, `aria-valuenow` y nombre. | `ProgressBar/preview.html` + validador. |
| Foco visible | Botones, enlaces, campos, segmentados, navegación, ticker y copiar usan un outline de 2px. | Recorrido de teclado. |
| Skip link | `index.html` empieza con «Saltar al contenido»; al activarlo, el foco pasa a `<main id="top" tabindex="-1">`. | Prueba con `Tab` + `Enter`. |
| Ticker | La cinta se pausa al recibir foco (`:focus-within`) además de hover y botón. | `components/bundle.css` + recorrido de teclado. |
| Reduced motion | La cinta y las transiciones de botones se detienen con `prefers-reduced-motion: reduce`. | CSS revisado; no se probó con un dispositivo real. |
| Móvil | Sin scroll horizontal a 500px. `Scorecard` pasa a 1 columna; el índice oculta subenlaces y usa una fila compacta. | Medición de `scrollWidth` + capturas. |
| `Cover` | Deja de tener ancho fijo: 100% hasta 960px, átomo reducido y versión apilada por debajo de 760px. | Capturas a 900 y 500px. |
| Alturas de preview | `Field`, `Notice` y `Scorecard` declaran alturas que ya cubren su contenido. | Medición de `body.scrollHeight`. |

## Corregido durante la auditoría

- `Cover` se recortaba a 900px por un ancho fijo de 960px.
- `Field` declaraba 300px para un contenido de ~400px.
- `Notice` declaraba 330px para un contenido de ~371px.
- `Scorecard` declaraba 200px para 215px y desbordaba a 500px.
- El índice móvil mostraba primero un menú vertical de ~30 enlaces.
- El scrollbar del índice se veía blanco en dark.
- `NewsTicker` no pausaba al enfocar un enlace.
- `Cover` no tenía foco visible en sus botones.
- Los chips tenían un tinte del 15%; en light, accent-warm y success quedaban por debajo de 4.5:1.

## Pendiente

- Prueba con lector de pantalla real (NVDA, JAWS o VoiceOver).
- Zoom al 200% y texto ampliado en las 13 previews.
- `forced-colors` / alto contraste del sistema.
- Safari real y Firefox en macOS; la matriz se validó en Firefox Linux.
- Snapshots automáticos de regresión visual.
- Prueba de `prefers-reduced-motion` con el sistema operativo, no solo por CSS.

## Cómo repetir

```bash
npm run build
npm run validate
npm run serve
```

Abre `http://localhost:4173` y revisa dark/light, teclado y 500px. El validador cubre contraste y estructura; la revisión visual y la lectura con tecnología de asistencia siguen siendo manuales.
