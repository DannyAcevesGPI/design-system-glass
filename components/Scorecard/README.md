# Scorecard

Indicador numérico con etiqueta, valor y nota de contexto; se usa en la fila de indicadores de Inicio y en el Resumen del panel.

## Reglas
- Estructura: `__label` (con punto de color o badge) + `__value` (estilo `kpi`) + `__note` que dice qué se cuenta.
- Grid de 4 en escritorio con `repeat(auto-fit, minmax(min(230px, 100%), 1fr))`; una columna en móvil.
- Un indicador que todavía no se calcula con datos reales lleva el badge «Demostrativo» (borde punteado en warning) y nunca un número inventado: usa «—» hasta tener el dato.
- El punto de color identifica la serie (accent, success, accent-warm); es decorativo (`aria-hidden`).
- Si el número lleva a una lista (propuestas pendientes), la card entera es un `<a>`.
