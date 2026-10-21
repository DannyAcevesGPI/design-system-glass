# Cover

Portada de marca del sistema: el hero de vidrio que presenta «Design System Glass» y su átomo animado.

## Cuándo usarla
- En la galería (`index.html`) como primera tarjeta de la colección.
- En documentación, presentaciones o páginas de inicio que necesiten una portada de marca.
- No es un componente de producto: no la uses como cabecera de una pantalla de la aplicación.

## Anatomía
| Parte | Regla |
| --- | --- |
| Fondo | Gradiente oscuro con manchas azul, turquesa y ámbar. El vidrio necesita color detrás. |
| Eyebrow | Mono, mayúsculas, tracking amplio, en `accent`. |
| Título | Bricolage Grotesque 700, tracking negativo, en `ink`. |
| Descripción | Máximo 56 caracteres por línea, en `ink-muted`. |
| Acciones | Una primaria (`accent` + `on-accent`) y una secundaria de vidrio. |
| Átomo | Marca animada de tres órbitas; se detiene con `prefers-reduced-motion: reduce`. |

## Reglas
- El átomo va a la derecha y nunca compite con el título: en pantallas estrechas se oculta.
- No cambies el orden de las capas del fondo ni el contraste del texto.
- El logo se usa como `<img>` desde `assets/brand/logo-mark.svg`; no lo reconstruyas con emoji ni con íconos genéricos.
- La portada no lleva navegación propia: los enlaces apuntan a la galería y a la guía.

## Archivos
- `preview.html`: portada a 960×288.
- `../../assets/brand/logo-mark.svg`: marca animada.
- `../../assets/brand/banner.svg`: versión ancha para README.
