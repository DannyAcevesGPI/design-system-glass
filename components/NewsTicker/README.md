# NewsTicker

Cinta de actualizaciones que corre al pie del hero de Inicio, al estilo de un noticiario.

## Reglas
- Etiqueta fija «Al día» en accent-warm + on-accent, a la izquierda.
- Cada ítem: tipo (Liberación en success, Hito en accent, Aviso en warning, Documentación en ink-muted) + titular que enlaza a su proyecto o recurso.
- La lista se duplica para el bucle continuo; la copia lleva `aria-hidden="true"` para que el lector de pantalla no la lea dos veces.
- Velocidad: 70s por vuelta, lineal. Se pausa al pasar el cursor y con el botón de pausa (obligatorio, 44px, con `aria-label` que cambia).
- Con `prefers-reduced-motion: reduce` la cinta queda quieta; el enlace «Ver todas» lleva a la lista completa.
- Máximo 5 ítems; solo contenido publicado.
