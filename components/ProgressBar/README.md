# ProgressBar

Barra de avance de un proyecto: 6px en cards del catálogo y 10px en el detalle.

## Reglas
- Siempre con `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` y `aria-label`, y con el porcentaje escrito en texto.
- En cards, el color de la barra sigue el estado del proyecto con `--c` (accent, accent-warm, success).
- En el detalle, `.dsg-progress--lg` con `__bar--gradient` (accent → success) y una nota que dice cómo se calcula.
- Solo se muestra cuando el progreso se calcula a partir de hitos; si no aplica, se omite.
