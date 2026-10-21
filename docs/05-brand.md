# 05 · Marca

## 1. Plataforma

| Elemento | Definición |
| --- | --- |
| **Nombre** | Design System Glass |
| **Descriptor** | Sistema de diseño de vidrio |
| **Tagline** | Vidrio, color y claridad para interfaces que se sienten vivas. |
| **Idea central** | La claridad se construye por capas: color detrás, vidrio delante, contenido siempre legible. |
| **Personalidad** | Precisa, serena, técnica y humana. No grita, no usa hype, no decora de más. |
| **Promesa** | Un sistema que se ve bien, se lee mejor y escala sin ruido. |

### Nombre correcto

- **Design System Glass** (siempre con espacios y mayúsculas iniciales).
- **DSG** solo en contextos técnicos, nombres de archivo o cuando ya se presentó el nombre completo.
- **Nunca** «Desing System Glass», «design system glass», «DS Glass» ni «Glass DS» como nombre oficial.

## 2. Sistema de marca

### 2.1. Símbolo: el átomo

El símbolo es un **átomo de vidrio**: un núcleo luminoso con tres órbitas y electrones que viajan por ellas. Representa el sistema como un núcleo estable con elementos que se mueven alrededor sin perder el centro.

- **Núcleo:** esfera de vidrio con gradiente cian.
- **Órbitas:** dos elipses sólidas y una circular punteada, en gris azulado.
- **Electrones:** cian, ámbar y gris claro.
- **Movimiento:** cada electrón recorre su órbita a distinta velocidad; el núcleo late suavemente.

### 2.2. Lockup horizontal

El lockup combina el átomo a la izquierda y el nombre a la derecha, con el descriptor en mono debajo.

```text
[átomo]  Design System Glass
         SISTEMA DE DISEÑO · VIDRIO
```

### 2.3. Archivos

| Archivo | Uso | Fondo |
| --- | --- | --- |
| `assets/brand/banner.svg` | Portada ancha para README, presentaciones y web. | Oscuro |
| `assets/brand/logo.svg` | Lockup horizontal. | Oscuro |
| `assets/brand/logo-on-light.svg` | Lockup horizontal. | Claro |
| `assets/brand/logo-mark.svg` | Símbolo solo, animado. | Cualquiera |
| `assets/brand/favicon.svg` | Favicon estático de 64×64. | Cualquiera |

Los SVG tienen el texto convertido a trazos para que la tipografía no dependa de una fuente instalada. No los edites con un editor que vuelva a convertir el texto en fuentes externas.

## 3. Uso del logo

### Espacio de respeto

Deja alrededor del lockup un margen mínimo equivalente al **diámetro del núcleo** del átomo. En el símbolo solo, usa al menos **1/4 de su altura**.

```text
┌─────────────────────────────┐
│        ┌───────────┐        │
│        │  [átomo]  │        │  ← margen = núcleo
│        └───────────┘        │
└─────────────────────────────┘
```

### Tamaños mínimos

| Versión | Mínimo | Recomendado |
| --- | --- | --- |
| Símbolo | 24×24 px | 48×48 px |
| Lockup horizontal | 160 px de ancho | 320 px de ancho |
| Banner | 480 px de ancho | 960–1360 px |
| Favicon | 16×16 px | 32–64 px |

Por debajo del mínimo, usa el símbolo solo: el descriptor deja de ser legible.

### Color

- Sobre fondos oscuros: `logo.svg` (texto `ink`, descriptor `accent`).
- Sobre fondos claros: `logo-on-light.svg` (texto `ink` oscuro, descriptor `accent` oscuro).
- El símbolo funciona en ambos porque sus órbitas son neutras y el núcleo es cian.
- No cambies el cian por otro color de marca sin actualizar los tokens `accent` y `accent-warm`.

### Qué no hacer

- No estires, rotes ni deformes el logo.
- No separes el átomo del nombre y lo uses como si fuera otra marca.
- No pongas el logo sobre una foto sin una capa de vidrio o un fondo que garantice contraste.
- No añadas sombras, biseles o degradados adicionales al texto.
- No uses emoji como sustituto del átomo.
- No animas el logo con rebotes, giros bruscos o velocidad alta.

## 4. Movimiento

| Elemento | Comportamiento | Duración |
| --- | --- | --- |
| Electrones | Recorren su órbita con `offset-path`, en loop lineal. | 13–26 s por vuelta, según órbita. |
| Núcleo | Late entre 1 y 1.045 de escala. | 5 s, `ease-in-out`, infinito. |
| Órbitas | Estáticas; la punteada sugiere profundidad. | — |
| Banner | Sin animación de entrada; el movimiento vive en el átomo. | — |

### Reduced motion

Con `prefers-reduced-motion: reduce`:

- Los electrones se quedan en posiciones estáticas sobre la órbita.
- El núcleo deja de latir.
- No hay parallax, ni autoplay, ni transiciones largas.

El SVG incluye la media query; no requiere JavaScript.

### Implementación

- Los electrones usan `offset-path` + `offset-distance` con origen `cx="0" cy="0"`. El `offset-distance` inicial los deja sobre la órbita cuando la animación se desactiva por reduced-motion.
- El texto del banner y del lockup está convertido a trazos para evitar FOUT y dependencias de fuentes.
- El átomo es decorativo: `aria-hidden="true"` o `alt=""`.
- El banner incluye `<title>` y `<desc>` para lectores que lo traten como imagen.

## 5. Portada

La portada recrea la composición de referencia:

```text
┌──────────────────────────────────────────────────────────────┐
│  DISEÑO · SISTEMA · VIDRIO                    ╭──────────╮   │
│                                               │  átomo   │   │
│  Design System Glass                          │  animado │   │
│  Vidrio, color y claridad…                    ╰──────────╯   │
│  [Explorar componentes →]  [Leer la guía]                    │
└──────────────────────────────────────────────────────────────┘
```

| Zona | Regla |
| --- | --- |
| Fondo | Gradiente azul noche con manchas azul, turquesa y ámbar; borde de vidrio. |
| Eyebrow | Mono, mayúsculas, tracking amplio, en `accent`. |
| Título | Bricolage Grotesque 700, tracking negativo, en `ink`. |
| Descripción | Máximo 2 líneas; en `ink-muted`. |
| Acciones | Primaria cian + secundaria de vidrio. |
| Átomo | A la derecha, 300–360 px; se oculta en pantallas estrechas. |

## 6. Voz y tono

### Principios

1. **Claro antes que ingenioso.** Si una palabra puede ser más simple, úsala.
2. **Concreto.** «Fecha estimada: Q2 2027» es mejor que «próximamente».
3. **Sin hype.** No «revolucionario», «disruptivo» ni «sinergia».
4. **Humano.** Frases cortas, voz activa, sin mayúsculas sostenidas.
5. **Consistente.** Los estados se nombran igual en toda la interfaz.

### Ejemplos

| En vez de… | Escribe… |
| --- | --- |
| «Haz clic aquí para explorar» | «Explorar componentes» |
| «Próximamente» | «Estimado: Q2 2027» |
| «Error 500» | «No pudimos guardar los cambios. Intenta de nuevo.» |
| «OK» | «Aprobar y publicar» |
| «No hay datos» | «Aún no hay proyectos publicados.» |

### Microcopy de estados

| Estado | Texto |
| --- | --- |
| Planeado | «Planeado» |
| En desarrollo | «En desarrollo» |
| Piloto | «Piloto» |
| Liberado | «Liberado» |
| Bloqueado | «Bloqueado» |
| Pendiente | «Pendiente de revisión» |
| Estimada | «Estimada» |
| Confirmada | «Confirmada» |

## 7. Accesibilidad de marca

- El texto del banner y del logo mantiene contraste sobre su fondo.
- El átomo nunca es la única señal de marca: siempre va acompañado del nombre.
- En imágenes, el `alt` describe la marca, no el adorno: «Design System Glass».
- No uses el logo como texto de un `h1`; el `h1` debe ser texto real.
- El favicon tiene una versión estática para evitar distracción en pestañas.

## 8. Checklist de marca

- [ ] El nombre se escribe «Design System Glass».
- [ ] El logo tiene espacio de respeto.
- [ ] El tamaño mínimo se respeta.
- [ ] La versión de logo corresponde al fondo.
- [ ] El átomo se detiene con reduced-motion.
- [ ] El `alt` o `aria-hidden` es correcto.
- [ ] No hay colores, sombras ni efectos añadidos.
- [ ] El copy sigue la voz del sistema.
