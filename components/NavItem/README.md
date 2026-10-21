# NavItem

Elemento del menú lateral, con ícono, estado activo y contador opcional.

## Reglas
- El elemento activo lleva `aria-current="page"`: fondo glass-strong, borde line, texto ink en 600 y el ícono en accent.
- Ícono de 20px con trazo de 1.8 y `aria-hidden="true"`; el texto siempre visible.
- Contador `.dsg-nav-count` (accent-warm + on-accent) solo para cosas que piden acción: revisiones pendientes, solicitudes sin atender.
- Agrupa con un `.dsg-overline` («Explorar», «Contenido», «Administración»). En el panel interno el nombre del portal va en `admin`.
- El menú vive en un `.dsg-glass--panel`. En móvil se apila arriba del contenido y se colapsa en un botón de menú.
- Una superficie pública nunca enlaza a la administración.

## Tailwind
```html
<a href="/proyectos" aria-current="page" class="dsg-nav-item">…Proyectos</a>
```
