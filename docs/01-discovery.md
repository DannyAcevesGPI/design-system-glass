# 01 · Discovery del repositorio

**Fecha:** 21 de octubre de 2026  
**Alcance:** revisión estática de todos los archivos del repo, sin ejecutar la aplicación original.  
**Resultado:** el repositorio contenía un sistema de diseño sólido en lo visual y en las reglas, pero con deuda de mantenibilidad, una marca heredada y poca superficie para agentes. La versión 2.0 resuelve lo estructural y deja explícito lo que falta.

---

## 1. Resumen ejecutivo

El repo era un **design system en formato de archivos copiables**: tokens en JSON y CSS, un preset de Tailwind, una capa de componentes y una galería HTML autocontenida. La calidad de las decisiones visuales era alta: vidrio con cinco capas, temas claro/oscuro, tipografía con intención y componentes con reglas de accesibilidad escritas.

Los problemas no estaban en el diseño, sino en el **gobierno del sistema**:

- Los tokens vivían duplicados en cuatro lugares y podían desincronizarse.
- No había build, tests, CI ni validación de enlaces.
- La marca visible seguía atada al producto original, no al sistema.
- No existía una capa machine-readable para que un agente eligiera componentes sin adivinar.
- La galería era un snapshot autocontenido de 96 KB con CSS embebido.

La v2.0 convierte ese material en un sistema mantenible: **una fuente de verdad, artefactos generados, validación automática, marca propia y contrato para agentes**.

## 2. Método

| Paso | Qué se hizo |
| --- | --- |
| Inventario | Listado completo de archivos, tamaños, roles y referencias cruzadas. |
| Lectura | Revisión de tokens, CSS, preset, 13 componentes, previews, galería y documentación existente. |
| Búsqueda de duplicación | Conteo de ocurrencias de marca, prefijo y variables en todo el repo. |
| Contraste de contratos | Comparación entre lo que la documentación decía y lo que el CSS implementaba. |
| Migración | Reemplazo sistemático de marca, prefijo y variables, con corrección de colisiones. |
| Verificación | Validación de artefactos generados, variables, registro, previews y enlaces. |

## 3. Inventario inicial

| Activo | Estado inicial | Rol |
| --- | --- | --- |
| `tokens.json` | Fuente de verdad declarada, sin build | Valores de color, tipo, espacio, radios, sombra y backdrop. |
| `tokens.css` | Copia manual de los tokens | Variables CSS y clases tipográficas. |
| `tailwind/dsg-preset.js` | Preset completo | Mapeo de tokens a utilidades de Tailwind. |
| `tailwind/globals.css` | Tokens + componentes embebidos | `app/globals.css` para Next.js. |
| `tailwind/play-config.js` | Duplicado parcial del preset | Configuración para Tailwind Play CDN en previews. |
| `components/bundle.css` | Capa de clases con el prefijo anterior | Clases de vidrio, botones, chips, menú, cinta, etc. |
| `components/<Nombre>/` | 12 README + 13 previews | Documentación y demo aislada por componente. |
| `index.html` (antes, galería con otro nombre) | Galería autocontenida de 96 KB | Documentación visual con temas. |
| `README.md` | Guía de marca y uso | Puerta de entrada. |
| `INSTALACION.md` | Instalación en Next.js | Guía de integración. |
| `package.json` | No existía | — |
| CI / validación | No existía | — |
| Licencia | No existía | — |

## 4. Lo que ya estaba bien

1. **Principios con consecuencias.** No eran eslóganes: cada principio se traducía en reglas de color, contraste o composición.
2. **Tokens semánticos.** `ink`, `glass`, `accent`, `success`, `danger` nombran intención, no valores. Eso permitió el rebrand sin tocar la semántica.
3. **Vidrio con anatomía explícita.** Relleno, borde, luz, sombra y desenfoque estaban separados y documentados.
4. **Accesibilidad en el diseño, no como parche.** Foco visible, objetivos táctiles de 44/48 px, estado con texto, `<del>`/`<ins>` en diffs.
5. **Movimiento con propósito.** Cinta pausable, órbitas lentas y respeto por `prefers-reduced-motion`.
6. **Previews aisladas.** Cada componente se podía abrir sin montar la aplicación completa.
7. **Documentación de decisiones.** Las reglas de uso estaban escritas, no solo implícitas en el CSS.

## 5. Hallazgos

| ID | Hallazgo | Severidad | Evidencia | Estado en v2.0 |
| --- | --- | --- | --- | --- |
| F-01 | Tokens duplicados en `tokens.json`, `tokens.css`, `globals.css`, la galería y el preset. | Alta | Cuatro copias de los mismos valores. | **Resuelto.** `tokens.css`, `globals.css` y `play-config.js` se generan; la galería carga CSS externo. |
| F-02 | Sin build, tests, CI ni validación. | Alta | No había `package.json` ni scripts. | **Resuelto.** `scripts/build.mjs`, `scripts/validate.mjs`, `package.json` y workflow de CI. |
| F-03 | Marca visible atada al producto original. | Alta | Nombre y copy en README, galería, portada y componentes. | **Resuelto.** Marca «Design System Glass», copy genérico y assets propios. |
| F-04 | Namespace técnico heredado en 858 referencias. | Alta | Clases, variables, archivos y storage key. | **Resuelto.** `dsg-*` y `--dsg-*`; guía de migración en `08-migration.md`. |
| F-05 | Cobertura documental desigual. | Media | `Cover` sin README; componentes con distinto nivel de detalle. | **Resuelto.** 13 README, registro machine-readable y docs transversales. |
| F-06 | Sin contrato para agentes. | Alta | No había instrucciones, índice ni catálogo estructurado. | **Resuelto.** `AGENTS.md`, `llms.txt`, `registry.json`, schemas y recetas. |
| F-07 | Galería autocontenida con CSS embebido. | Media | 96 KB con tokens y componentes duplicados. | **Resuelto.** `index.html` enlaza `tokens.css` y `components/bundle.css`. |
| F-08 | Board histórico de 4.2 MB dentro de la raíz. | Baja | 16 pantallas del producto original, con su marca. | **Resuelto.** Eliminado del repo; no queda material histórico fuera de la guía de migración. |
| F-09 | Sin licencia. | Media | No había `LICENSE`. | **Resuelto.** `LICENSE` MIT (Daniel Aceves, 2026) y `license: MIT` en `package.json`; paquete preparado para npm. |
| F-10 | Accesibilidad declarada, no auditada con herramientas. | Alta | Reglas WCAG 2.2 AA escritas, sin evidencia de auditoría. | **Resuelto parcialmente.** Contraste y estructura automatizados; foco y teclado revisados. La prueba con lector de pantalla sigue pendiente. Evidencia en `09-audit.md`. |
| F-11 | Sin pruebas de regresión visual. | Media | No había screenshots ni comparación entre temas. | **Mitigado.** Revisión manual de las 13 previews en dark/light y a 500px; sin snapshots automáticos. |
| F-12 | Dependencia de CDN y Google Fonts en la galería. | Baja | Tailwind Play CDN y fuentes externas. | **Resuelto.** Tailwind Play y fuentes vendorizados; la galería y las previews funcionan sin red. |
| F-13 | `play-config.js` duplica un subconjunto del preset. | Media | Colores, fuentes y radios repetidos. | **Resuelto.** Se genera desde `tailwind/dsg-preset.js` en `npm run build`. |
| F-14 | Convención `@dsCard` sin documentar. | Baja | Solo aparecía en comentarios de previews. | **Resuelto.** Documentada en `07-contributing.md`. |
| F-15 | Copy de componentes específico del producto. | Baja | «portal público», «panel interno», `/idi-panel`. | **Resuelto.** Lenguaje genérico de producto/superficie. |
| F-16 | Colisión entre modificadores BEM y nombres de tokens durante la migración. | Media | `--accent` dentro de `.dsg-chip--accent` se convirtió en `--dsg-accent`. | **Resuelto.** Modificadores restaurados y validador de variables. |
| F-17 | `type.fonts` vacío en `tokens.json`. | Baja | Campo sin uso. | **Resuelto.** Eliminado. |

## 6. Riesgos

| Riesgo | Impacto | Probabilidad | Mitigación |
| --- | --- | --- | --- |
| Deriva entre `tokens.json` y CSS generado | Alto | Media | `npm run validate` compara artefactos y falla en CI. |
| Un agente inventa una variante o un color | Alto | Alta | `AGENTS.md`, `registry.json` y validador de clases/variables. |
| El rebrand rompe consumidores existentes | Alto | Alta | Cambio mayor v2 + guía de migración + tabla de equivalencias. |
| Bajo contraste en modo claro | Alto | Media | `npm run validate` calcula contraste de texto, rellenos y tintes en dark/light. |
| La galería se rompe sin red | Bajo | Baja | Tailwind Play y fuentes vendorizados; previews sin peticiones externas. |
| Se cuela material histórico o marca anterior | Bajo | Baja | Board eliminado y validador que bloquea el prefijo anterior fuera de la guía de migración. |
| La documentación se desactualiza | Medio | Media | Enlaces validados; registro obligatorio; docs como parte del definition of done. |

## 7. Decisiones tomadas

| Decisión | Razón |
| --- | --- |
| **Marca:** «Design System Glass». | Nombre correcto en inglés, descriptivo y escalable. Se corrigió la grafía «Desing». |
| **Namespace:** `dsg-*` para clases y `--dsg-*` para variables. | Evita colisiones, hace visible el origen y permite migrar sin ambigüedad. |
| **Tokens semánticos sin prefijo en el nombre lógico** (`canvas`, `ink`, `glass`). | El prefijo vive en la variable CSS; el nombre lógico sigue siendo legible en JSON y Tailwind. |
| **`tokens.json` como fuente de verdad.** | Un solo lugar para cambiar valores; el CSS se genera. |
| **`components/bundle.css` como fuente de las clases.** | La capa de componentes no se edita en `globals.css`; se compone. |
| **`index.html` como galería navegable.** | Revisión visual inmediata, sin Storybook ni build. |
| **Capa de agentes explícita.** | `AGENTS.md`, `llms.txt`, `registry.json`, schemas y validador. |
| **Material histórico eliminado.** | El board de 4.2 MB no forma parte del sistema actual ni de su distribución. |

## 8. Decisiones cerradas y preguntas abiertas

Cerradas:

1. **Licencia:** MIT, con `LICENSE` a nombre de Daniel Aceves (2026). El código y la documentación son open source; las fuentes conservan su licencia OFL, Tailwind Play su licencia MIT y las marcas se rigen por `TRADEMARKS.md`.
2. **Publicación:** paquete preparado como `@dannyaceves/design-system-glass`, con `publishConfig.access: public`. La publicación real queda pendiente de credenciales y del scope npm.
3. **Soporte de navegadores:** evergreen moderno (Chrome/Edge 111+, Firefox 113+, Safari 16.4+). Sin polyfills.
4. **Board histórico:** eliminado del repositorio.

Abiertas:

1. **Tailwind 4:** el preset está escrito para 3.4; migrar a CSS-first de Tailwind 4 es una decisión aparte.
2. **Tema por defecto:** el producto declara oscuro por defecto; la galería sigue la preferencia del sistema. Confirmar si la galería debe abrir siempre en oscuro.

## 9. Hoja de ruta recomendada

### P0 — antes de publicar

- Revisión manual con lector de pantalla en la galería y las previews.
- Publicar el paquete con credenciales y scope npm válidos, o confirmar el canal interno.
- Automatizar snapshots de regresión visual para las 13 previews.

### P1 — siguiente iteración

- Añadir un componente de tabla y un patrón de página completa.

### P2 — escalado

- Storybook o equivalente si el número de componentes crece.
- Tokens para densidad y tamaños de control.
- Guía de contenido y microcopy.
- Tests de accesibilidad en CI con axe o equivalente.

## 10. Criterio de cierre

La v2.0 se considera completa cuando:

1. `npm run validate` pasa sin errores.
2. La galería abre y cambia de tema sin CSS roto.
3. Los 13 componentes tienen README, preview y registro.
4. `README.md`, `AGENTS.md` y `llms.txt` permiten a una persona o agente empezar sin contexto previo.
5. No quedan referencias a la marca o al prefijo anterior fuera de la guía de migración y el codemod.
