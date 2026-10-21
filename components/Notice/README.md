# Notice

Aviso con severidad para bloqueos, dependencias, comunicados y mensajes de estado del sistema.

## Severidades
| Tipo | Clase | Ícono |
| --- | --- | --- |
| Bloqueo, rechazo | `.dsg-notice--danger` | círculo con guion |
| Dependencia crítica, alerta operativa | `.dsg-notice--warning` | eslabón |
| Comunicado, aviso del área | `.dsg-notice--neutral` | megáfono en accent |
| Confirmación (sin conflictos, publicado) | `.dsg-notice--success` | check |

## Reglas
- Estructura: ícono 22px + `__kind` (mayúsculas, color de severidad) + `__title` + `__body` opcional.
- La severidad se lee en el texto de `__kind`, no solo en el color.
- Ordena por severidad: bloqueos primero.
- Mensajes de estado en vivo usan `role="status"`.
