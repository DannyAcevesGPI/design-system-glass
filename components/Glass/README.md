# Glass

La superficie de vidrio es el contenedor base del sistema: cards, paneles, menú lateral, hero y modales.

## Cuándo usarla
- Todo bloque que agrupa contenido sobre el fondo de manchas (`.dsg-mesh`).
- `.dsg-glass` (radio 22px) para cards; `.dsg-glass--panel` (26px) para paneles y el menú; `.dsg-glass--hero` (32px) solo para el hero de Inicio.
- Dentro de un vidrio, usa `.dsg-inset` (glass-strong) para filas o elementos seleccionados. No anides `.dsg-glass` dentro de `.dsg-glass`: el desenfoque doble ensucia el texto.

## Reglas
- Siempre debe haber color detrás: sin `.dsg-mesh` el vidrio se ve plano, sobre todo en claro.
- En claro, `.dsg-glass` agrega un brillo diagonal (más blanco arriba a la izquierda) y usa `backdrop-glass-light`.
- El texto dentro usa `ink`, `ink-muted` o `ink-subtle`; los tres pasan 4.5:1 sobre el vidrio en ambos temas.

## Tailwind
```html
<article class="dsg-glass p-6">…</article>
<!-- o solo con utilidades del preset -->
<article class="rounded-glass border border-glass-rim bg-glass shadow-glass backdrop-blur-glass backdrop-saturate-160 p-6">…</article>
```
