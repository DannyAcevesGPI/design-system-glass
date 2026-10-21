# StatusChip

Chip de estado para proyectos, propuestas y roles, más el tag neutro para clasificar contenido.

## Mapa de estados
| Estado | Clase |
| --- | --- |
| Planeado, Borrador, Por definir | `.dsg-chip` (neutro) |
| En desarrollo | `.dsg-chip--accent` |
| Piloto, Pendiente de revisión | `.dsg-chip--warm` |
| Liberado, Aprobada, Publicada | `.dsg-chip--success` |
| Bloqueado, Cambios solicitados, Rechazada | `.dsg-chip--danger` |
| Rol ADMIN | `.dsg-chip--admin` |

## Reglas
- El chip siempre lleva texto: el color refuerza, no sustituye.
- El color de cada chip sale de una sola variable `--c`: relleno al 15% y borde al 35% del mismo tono.
- `.dsg-tag` (radius-sm, glass-strong) es para categorías y skills; no comunica estado.

## Tailwind
```html
<span class="dsg-chip dsg-chip--accent">En desarrollo</span>
```
