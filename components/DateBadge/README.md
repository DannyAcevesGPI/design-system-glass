# DateBadge

Distingue una fecha comprometida de una estimada en lanzamientos, roadmap y detalle de proyecto.

## Reglas
- `.dsg-date--confirmed`: borde sólido de 2px en success. Solo cuando la fecha está aprobada como compromiso.
- `.dsg-date--estimated`: borde punteado de 2px en ink-subtle. Es la opción por defecto.
- El texto siempre dice «Confirmada» o «Estimada»: el tipo de borde refuerza, no sustituye.
- Una fecha estimada se escribe con la precisión que realmente se tiene (mes o trimestre), no con día exacto.
- Muestra la leyenda (sólida / punteada) una vez por sección.
