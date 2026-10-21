# 04 · Componentes

Un componente de Design System Glass no es solo una clase: es un contrato con **cuándo usarlo**, **cuándo evitarlo**, **qué clases lo componen** y **qué garantiza en accesibilidad**. El catálogo machine-readable vive en [`../components/registry.json`](../components/registry.json); esta página es la lectura humana.

## 1. Catálogo

| Componente | Estado | Para qué | Clases base |
| --- | --- | --- | --- |
| [Cover](../components/Cover/README.md) | stable | Portada de marca con átomo animado. | Tokens de marca |
| [Glass](../components/Glass/README.md) | stable | Superficie de cards, paneles, menú y hero. | `.dsg-glass`, `.dsg-glass--panel`, `.dsg-inset` |
| [Button](../components/Button/README.md) | stable | Acciones primarias, secundarias y de decisión. | `.dsg-btn`, `.dsg-btn--primary` |
| [SegmentedControl](../components/SegmentedControl/README.md) | stable | 2–4 opciones excluyentes. | `.dsg-seg`, `.dsg-seg__btn` |
| [NavItem](../components/NavItem/README.md) | stable | Navegación lateral con estado activo. | `.dsg-nav-item`, `.dsg-nav-count` |
| [StatusChip](../components/StatusChip/README.md) | stable | Estado con texto y color. | `.dsg-chip`, `.dsg-chip--accent` |
| [DateBadge](../components/DateBadge/README.md) | stable | Fecha confirmada vs. estimada. | `.dsg-date--confirmed`, `--estimated` |
| [Notice](../components/Notice/README.md) | stable | Avisos por severidad. | `.dsg-notice--danger`, `--warning` |
| [Scorecard](../components/Scorecard/README.md) | stable | Indicador con valor y contexto. | `.dsg-kpi`, `.dsg-kpi__value` |
| [ProgressBar](../components/ProgressBar/README.md) | stable | Avance calculado por hitos. | `.dsg-progress`, `.dsg-progress__bar` |
| [NewsTicker](../components/NewsTicker/README.md) | stable | Cinta de actualizaciones pausable. | `.dsg-ticker`, `.dsg-ticker__track` |
| [Field](../components/Field/README.md) | stable | Entradas con etiqueta visible. | `.dsg-field`, `.dsg-input` |
| [Diff](../components/Diff/README.md) | stable | Cambios publicados vs. propuestos. | `.dsg-del`, `.dsg-ins` |

## 2. Contrato de un componente

Todo componente `stable` debe tener:

| Artefacto | Obligatorio | Propósito |
| --- | --- | --- |
| `components/<Nombre>/README.md` | Sí | Reglas, variantes, accesibilidad. |
| `components/<Nombre>/preview.html` | Sí | Demo aislada con tokens y bundle. |
| Entrada en `components/registry.json` | Sí | Catálogo machine-readable. |
| Clases en `components/bundle.css` | Sí | Implementación CSS. |
| Enlace desde esta página | Sí | Descubrimiento humano. |
| Tokens nuevos documentados | Si aplica | `docs/03-tokens.md`. |

El validador comprueba los archivos, las clases y las relaciones. No comprueba la calidad del copy: eso sigue siendo una revisión humana.

## 3. Reglas de composición

### Vidrio

1. Toda página que use vidrio lleva `.dsg-mesh` en el `body`.
2. No anides `.dsg-glass` dentro de `.dsg-glass`; usa `.dsg-inset`.
3. La jerarquía es `hero > panel > glass > inset`. No inventes un quinto nivel.
4. Un panel no necesita sombra extra: `shadow-glass` ya está en `.dsg-glass`.

### Acciones

1. Una sola acción primaria por vista.
2. Primario + secundario es la pareja estándar; `ghost` para cancelar.
3. `success` y `danger` son decisiones de revisión, no decoración.
4. El texto nombra el resultado: «Aprobar y publicar», no «OK».

### Color y estado

1. El color va con texto o ícono. Nunca solo color.
2. `accent` = acción/en desarrollo; `accent-warm` = piloto/pendiente; `success` = liberado/confirmado; `danger` = bloqueo/rechazo.
3. `admin` es identidad de superficie administrativa, no un estado de proyecto.

### Tipografía

1. Un `h1` por página; los paneles usan `h2`/`h3`.
2. `eyebrow` y `overline` son etiquetas, no párrafos.
3. No uses `display-xl` dentro de cards.
4. `caption` no baja de 13px.

### Movimiento

1. La cinta se pausa con hover y con botón; el botón es obligatorio.
2. Las órbitas del átomo son lentas y decorativas.
3. Todo se detiene con `prefers-reduced-motion: reduce`.
4. No añadas parallax, autoplay de video ni animaciones que duren más de lo necesario.

## 4. Referencia rápida

### Glass

**Usa:** cards, paneles, menú lateral, hero, modales.  
**Evita:** vidrio sin fondo de color o vidrio dentro de vidrio.  
**Clases:** `.dsg-glass`, `.dsg-glass--panel`, `.dsg-glass--hero`, `.dsg-inset`, `.dsg-mesh`, `.dsg-mesh--admin`.  
**Accesibilidad:** texto en `ink`, `ink-muted` o `ink-subtle`; títulos para agrupar.

### Button

**Usa:** acciones y navegación.  
**Evita:** `div` con `onClick`; dos primarios en la misma vista.  
**Clases:** `.dsg-btn`, `--primary`, `--secondary`, `--ghost`, `--success`, `--danger`, `--icon`.  
**Accesibilidad:** 48px mínimo (44px en ícono), foco visible, `aria-label` en botones de ícono.

### SegmentedControl

**Usa:** 2–4 opciones excluyentes visibles.  
**Evita:** más de 4 opciones o navegación entre páginas.  
**Clases:** `.dsg-seg`, `.dsg-seg__btn`.  
**Accesibilidad:** `role=tablist`/`tab` con `aria-selected`, o `role=group` con `aria-pressed`.

### NavItem

**Usa:** menú lateral de app o documentación.  
**Evita:** acciones que no navegan.  
**Clases:** `.dsg-nav-item`, `.dsg-nav-count`; activo con `aria-current="page"`.  
**Accesibilidad:** ícono `aria-hidden`, texto siempre visible, contador solo para acción.

### StatusChip

**Usa:** estado de proyecto, propuesta o rol; `.dsg-tag` para categorías.  
**Evita:** chip sin texto o chip como botón.  
**Clases:** `.dsg-chip`, `--accent`, `--warm`, `--success`, `--danger`, `--admin`, `.dsg-tag`.  
**Accesibilidad:** el texto comunica el estado; el color refuerza.

### DateBadge

**Usa:** fecha comprometida vs. estimada.  
**Evita:** fechas históricas o rangos sin contrato.  
**Clases:** `.dsg-date--confirmed`, `.dsg-date--estimated`.  
**Accesibilidad:** el texto dice «Confirmada» o «Estimada»; la leyenda aparece una vez por sección.

### Notice

**Usa:** bloqueos, dependencias, comunicados y confirmaciones.  
**Evita:** texto informativo sin acción o error de campo (usa Field).  
**Clases:** `.dsg-notice--danger`, `--warning`, `--neutral`, `--success`, `__kind`, `__title`, `__body`.  
**Accesibilidad:** `__kind` dice la severidad; estado en vivo con `role=status`.

### Scorecard

**Usa:** métricas con etiqueta, valor y nota.  
**Evita:** inventar números; usa «—» y badge «Demostrativo».  
**Clases:** `.dsg-kpi`, `__label`, `__value`, `__note`, `.dsg-dot`.  
**Accesibilidad:** el valor se explica con texto; la card entera puede ser un enlace.

### ProgressBar

**Usa:** avance calculado a partir de hitos.  
**Evita:** barras decorativas o sin porcentaje visible.  
**Clases:** `.dsg-progress`, `--lg`, `__bar`, `__bar--gradient`.  
**Accesibilidad:** `role=progressbar`, `aria-valuenow/min/max`, `aria-label` y porcentaje escrito.

### NewsTicker

**Usa:** 3–5 actualizaciones publicadas.  
**Evita:** contenido crítico o más de 5 ítems.  
**Clases:** `.dsg-ticker`, `__label`, `__viewport`, `__track`, `__item`, `__kind`, `__controls`.  
**Accesibilidad:** pausa obligatoria, copia duplicada `aria-hidden`, reduced-motion.

### Field

**Usa:** cualquier entrada de datos.  
**Evita:** placeholder como etiqueta.  
**Clases:** `.dsg-field`, `__hint`, `.dsg-input`.  
**Accesibilidad:** etiqueta visible, error con `aria-describedby`, 48px de alto.

### Diff

**Usa:** revisión campo por campo antes de publicar.  
**Evita:** historial completo o cambios que no son de texto.  
**Clases:** `.dsg-del`, `.dsg-ins`.  
**Accesibilidad:** usa `<del>` e `<ins>`; tachado/subrayado además del color.

### Cover

**Usa:** portada de marca, galería o presentación.  
**Evita:** cabecera de producto.  
**Clases:** no define clases; compone tokens y assets de marca.  
**Accesibilidad:** átomo decorativo, contraste de texto, reduced-motion.

## 5. Patrones

### Hero de portada

```html
<header class="dsg-glass dsg-glass--hero">
  <p class="dsg-eyebrow">Diseño · Sistema · Vidrio</p>
  <h1 class="display-xl">Design System Glass</h1>
  <p class="body-lg">Vidrio, color y claridad para interfaces que se sienten vivas.</p>
  <a class="dsg-btn dsg-btn--primary" href="#componentes">Explorar componentes</a>
</header>
```

### Card de catálogo

```html
<article class="dsg-glass" style="padding:24px">
  <p class="dsg-overline">Proyecto</p>
  <h2 class="heading-sm">Asistente de documentación</h2>
  <p class="body-sm dsg-muted">Publicado hace 2 días.</p>
  <span class="dsg-chip dsg-chip--accent">En desarrollo</span>
  <div class="dsg-progress" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" aria-label="Avance">
    <div class="dsg-progress__bar" style="width:64%"></div>
  </div>
  <span class="caption dsg-subtle">64% · calculado por hitos</span>
</article>
```

### Panel de revisión

```html
<section class="dsg-glass dsg-glass--panel" style="padding:28px">
  <p class="dsg-overline">Revisión</p>
  <h2 class="heading-md">Cambios propuestos · 4 campos</h2>
  <div class="dsg-notice dsg-notice--warning">
    <span class="dsg-notice__kind">Dependencia</span>
    <p class="dsg-notice__title">Espera aprobación de Seguridad.</p>
  </div>
  <p class="body-sm"><del class="dsg-del">Fecha Q1</del> <ins class="dsg-ins">Fecha Q2</ins></p>
  <button class="dsg-btn dsg-btn--success">Aprobar y publicar</button>
  <button class="dsg-btn dsg-btn--danger">Rechazar</button>
</section>
```

### Formulario

```html
<form class="dsg-glass" style="padding:24px;display:grid;gap:16px">
  <label class="dsg-field">Nombre
    <input class="dsg-input" name="nombre" autocomplete="name">
  </label>
  <label class="dsg-field">Correo
    <input class="dsg-input" type="email" name="correo" autocomplete="email">
    <span class="dsg-field__hint">Solo para responderte.</span>
  </label>
  <button class="dsg-btn dsg-btn--primary" type="submit">Enviar solicitud</button>
</form>
```

## 6. Accesibilidad

Checklist mínima por componente:

- [ ] Contraste de texto ≥ 4.5:1 en dark y light.
- [ ] Foco visible en todo control interactivo.
- [ ] Objetivo táctil ≥ 44×44 px.
- [ ] Rol y nombre accesible correctos (`button`, `a`, `progressbar`, `tab`…).
- [ ] Estado no solo por color.
- [ ] Texto alternativo o `aria-hidden` en íconos decorativos.
- [ ] Movimiento detenido con `prefers-reduced-motion`.
- [ ] Orden de tabulación lógico.
- [ ] Mensajes de error asociados con `aria-describedby`.
- [ ] La preview se puede recorrer solo con teclado.

## 7. Antipatrones

| Antipatrón | Por qué falla | Alternativa |
| --- | --- | --- |
| `.dsg-glass` dentro de `.dsg-glass` | Doble blur y texto sucio. | `.dsg-inset`. |
| `bg-accent/20` | La variable es un color completo; la opacidad no aplica. | `color-mix()` o clase de componente. |
| Chip sin texto | El color no comunica estado por sí solo. | Texto + color. |
| Dos botones primarios | La vista no tiene una acción principal. | Primario + secundario. |
| Placeholder como etiqueta | Se pierde al escribir y no es accesible. | `<label>` visible. |
| `div` con `onClick` | No es operable con teclado ni lector. | `<button>` o `<a href>`. |
| Fecha estimada con día exacto | Comunica una precisión que no existe. | Mes o trimestre + «Estimada». |
| Barra de progreso sin `aria-*` | El lector no anuncia el valor. | `role=progressbar` + porcentaje. |

## 8. Añadir un componente

1. Copia la estructura de `components/Glass/`.
2. Escribe el `README.md` con: cuándo usarlo, cuándo evitarlo, variantes, accesibilidad y ejemplo.
3. Crea `preview.html` con `@dsCard`, tokens, bundle, fuentes locales, Tailwind vendorizado y `play-config`.
4. Añade las clases a `components/bundle.css`.
5. Añade la entrada a `components/registry.json`.
6. Enlaza el componente en esta página y, si aplica, en `index.html`.
7. Ejecuta `npm run build && npm run validate`.

La guía detallada está en [`07-contributing.md`](07-contributing.md).
