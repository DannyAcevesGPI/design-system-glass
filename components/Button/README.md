# Button

Botones pill para acciones primarias y botones de decisión para flujos de revisión.

## Variantes
| Clase | Uso |
| --- | --- |
| `.dsg-btn--primary` | Una sola acción principal por vista (accent + on-accent). |
| `.dsg-btn--secondary` | Acción alternativa junto a la principal (glass-strong + line). |
| `.dsg-btn--ghost` | Cancelar, acciones de baja prioridad. |
| `.dsg-btn--success` | «Aprobar y publicar» en revisión. Esquinas `radius-md`. |
| `.dsg-btn--danger` | «Rechazar» y acciones destructivas: contorno, nunca relleno. |
| `.dsg-btn--icon` | Botón solo con ícono, 44×44 px. Requiere `aria-label`. |

## Reglas
- Altura mínima 48px (44px para íconos): objetivo táctil accesible.
- Usa `<a href>` para navegar y `<button>` para acciones; nunca un `div` con `onClick`.
- El texto nombra lo que pasa: «Enviar solicitud», «Aprobar y publicar».

## Tailwind
```html
<button class="dsg-btn dsg-btn--primary">Explorar proyectos</button>
<button class="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-on">…</button>
```
