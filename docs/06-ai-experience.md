# 06 · AI Experience

«AI Experience» no significa poner un chatbot en la documentación. Significa que **un agente puede entender el sistema, elegir las piezas correctas y verificar su trabajo** sin depender de contexto que solo está en la cabeza de una persona.

Este repo lo consigue con cinco piezas:

| Pieza | Archivo | Para qué |
| --- | --- | --- |
| Contrato | [`../AGENTS.md`](../AGENTS.md) | Reglas no negociables, mapa y definición de terminado. |
| Índice | [`../llms.txt`](../llms.txt) | Contexto mínimo para empezar. |
| Catálogo | [`../components/registry.json`](../components/registry.json) | Componentes, clases, cuándo usarlos y cuándo no. |
| Referencia | [`03-tokens.md`](03-tokens.md), [`04-components.md`](04-components.md), [`05-brand.md`](05-brand.md) | Detalle humano y técnico. |
| Verificación | [`../scripts/validate.mjs`](../scripts/validate.mjs) | Comprueba que el cambio no rompió el sistema. |

## 1. Orden de lectura

### Siempre

1. [`../AGENTS.md`](../AGENTS.md): reglas y mapa.
2. [`../llms.txt`](../llms.txt): índice corto.
3. El `README.md` del componente que vas a tocar.
4. Su entrada en `components/registry.json`.
5. Su `preview.html` y sus clases en `components/bundle.css`.

### Según la tarea

| Tarea | Añade a la lectura |
| --- | --- |
| Crear una pantalla | `docs/02-architecture.md`, `docs/04-components.md`, `docs/03-tokens.md` |
| Cambiar un token | `tokens.json`, `docs/03-tokens.md`, `tailwind/dsg-preset.js` |
| Añadir un componente | `docs/04-components.md` (contrato), `docs/07-contributing.md` |
| Tocar la marca | `docs/05-brand.md`, `assets/brand/`, `README.md`, `index.html` |
| Migrar código existente | `docs/08-migration.md` |
| Auditar accesibilidad | `docs/04-components.md` (checklist), previews |

No leas todo el repo por defecto. El sistema está diseñado para que el **registro + README + preview** sean suficientes para el 80% de las tareas.

## 2. Jerarquía de verdad

Cuando dos fuentes discrepan, gana la de arriba:

```text
1. tokens.json                    ← valores
2. components/bundle.css          ← clases y comportamiento
3. components/registry.json       ← catálogo y reglas
4. README del componente          ← detalle de uso
5. docs/                          ← contexto y decisiones
6. index.html                     ← demostración visual
```

Si `tokens.css` o `tailwind/globals.css` no coinciden con `tokens.json`, no los edites: ejecuta `npm run build`.

## 3. Bucle de trabajo

```text
Descubrir → Planificar → Implementar → Validar → Reportar
```

### 3.1. Descubrir

- Identifica el componente o token existente más cercano.
- Busca en `components/registry.json` por `id`, `name` o `summary`.
- Revisa `useWhen` y `avoidWhen` antes de escribir CSS.
- Si la tarea pide algo que no existe, decide: **componer** con lo existente o **crear** un componente nuevo.

### 3.2. Planificar

Antes de editar, escribe un plan corto:

```text
Objetivo: tarjeta de proyecto con estado y avance.
Piezas: Glass + StatusChip + ProgressBar + tokens.
Archivos: src/components/ProjectCard.tsx (nuevo), docs/04-components.md (patrón).
Riesgos: no anidar vidrio; el progreso debe tener aria-*.
Validación: npm run validate + revisión visual.
```

Si el plan requiere un token o una variante nueva, decláralo explícitamente. No lo improvises dentro del componente.

### 3.3. Implementar

- Usa clases `dsg-*` y utilidades del preset.
- Usa tokens, nunca hexadecimales.
- Respeta la estructura semántica (`button`, `a`, `label`, `del`, `ins`).
- Añade la documentación en el mismo cambio, no después.
- Si tocas un componente, actualiza preview, README y registro.

### 3.4. Validar

```bash
npm run build
npm run validate
```

Además, revisa manualmente:

- La preview en dark y light.
- El foco con teclado.
- El comportamiento con `prefers-reduced-motion`.
- Que no haya texto que dependa solo del color.
- Que los enlaces locales del README no estén rotos.

### 3.5. Reportar

El reporte final debe incluir:

1. Qué cambió y por qué.
2. Archivos tocados.
3. Cómo se validó.
4. Qué queda abierto o requiere decisión humana.

## 4. Guardrails

### Prohibido

| Prohibido | Por qué | Alternativa |
| --- | --- | --- |
| Inventar tokens o colores | Rompe temas y consistencia. | Añade el token a `tokens.json` o usa uno existente. |
| Editar `tokens.css` o `tailwind/globals.css` | Son generados. | `npm run build`. |
| Usar el prefijo anterior | Namespace heredado. | `dsg-*`. |
| Anidar `.dsg-glass` | Doble blur y texto sucio. | `.dsg-inset`. |
| `bg-accent/20` | La variable no admite opacidad de Tailwind. | `color-mix()` o clase de componente. |
| Estado solo por color | Falla WCAG. | Texto + color + ícono. |
| `div` con `onClick` | No operable con teclado. | `<button>` o `<a href>`. |
| Placeholder como etiqueta | Inaccesible. | `<label>` visible. |
| Nuevo componente sin registro | El agente y el validador no lo ven. | README + preview + registry. |
| Dependencia nueva sin justificar | Aumenta el costo y el riesgo. | Composición con lo existente. |
| Cambiar la marca sin docs | El sistema pierde coherencia. | `docs/05-brand.md` + assets. |

### Permitido con criterio

- Añadir una utilidad Tailwind si falta y es estable.
- Añadir una variante si resuelve un caso real, no una preferencia.
- Crear un patrón de página si se repite tres veces.
- Cambiar un token si se documenta el impacto en ambos temas.

## 5. Recetas

### Receta A · Crear una card de proyecto

**Piezas:** `Glass` + `StatusChip` + `ProgressBar` + `DateBadge`.

```tsx
export function ProjectCard() {
  return (
    <article className="dsg-glass p-6">
      <p className="font-mono text-overline uppercase text-ink-subtle">Proyecto</p>
      <h2 className="font-display text-heading-sm text-ink">Asistente de documentación</h2>
      <p className="mt-2 text-body-sm text-ink-muted">Publicado hace 2 días.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="dsg-chip dsg-chip--accent">En desarrollo</span>
        <span className="dsg-date dsg-date--estimated">Q2 2027 · Estimada</span>
      </div>
      <div className="mt-4">
        <div className="dsg-progress" role="progressbar" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100} aria-label="Avance del proyecto">
          <div className="dsg-progress__bar" style={{ width: '64%' }} />
        </div>
        <span className="mt-2 block text-caption text-ink-subtle">64% · calculado por hitos</span>
      </div>
    </article>
  );
}
```

**No hagas:** una card dentro de otra card de vidrio, ni un chip sin texto.

### Receta B · Añadir una variante de botón

1. Añade la clase en `components/bundle.css`, junto a las demás variantes.
2. Añade la variante al README del componente.
3. Añade la entrada en `components/registry.json` (`classes` y `variants`).
4. Añade un ejemplo en `components/Button/preview.html`.
5. Ejecuta `npm run build && npm run validate`.

```css
.dsg-btn--quiet {
  background: transparent;
  color: var(--dsg-ink-muted);
  border-color: transparent;
}
```

**Criterio:** una variante nueva debe resolver una jerarquía que las existentes no cubren. Si solo cambia el color, probablemente no es una variante.

### Receta C · Cambiar un token de color

1. Edita `tokens.json` (dark y light).
2. Ejecuta `npm run build`.
3. Revisa contraste en ambos temas.
4. Actualiza `docs/03-tokens.md` si cambia el uso o el valor.
5. Ejecuta `npm run validate`.

**No hagas:** cambiar el valor solo en `tokens.css`; se perderá en el siguiente build.

### Receta D · Crear una página

```tsx
export default function Page() {
  return (
    <main className="dsg-mesh min-h-screen p-5">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="font-mono text-eyebrow uppercase text-accent">Sección</p>
          <h1 className="font-display text-display-lg text-ink">Título</h1>
          <p className="mt-2 max-w-[62ch] text-body-lg text-ink-muted">Descripción breve.</p>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          <article className="dsg-glass p-6">…</article>
          <article className="dsg-glass p-6">…</article>
        </section>
      </div>
    </main>
  );
}
```

Checklist: `dsg-mesh`, un `h1`, una acción primaria, foco visible, sin vidrio anidado.

### Receta E · Auditar accesibilidad

1. Recorre la preview solo con teclado.
2. Verifica foco visible en cada control.
3. Revisa contraste de texto en dark y light.
4. Comprueba nombres accesibles (`aria-label`, `<label>`, texto del botón).
5. Comprueba que el estado no dependa solo del color.
6. Comprueba `prefers-reduced-motion`.
7. Anota hallazgos en `docs/01-discovery.md` o abre un issue.

### Receta F · Migrar código existente

1. Lee `docs/08-migration.md`.
2. Reemplaza las clases y variables del prefijo anterior por `dsg-*` y `--dsg-*`.
3. Reemplaza el preset anterior por `dsg-preset`.
4. Reemplaza la storage key.
5. Ejecuta la app y revisa dark/light.
6. No mezcles namespaces en el mismo cambio.

## 6. Plantilla de prompt

Cuando pidas trabajo a un agente, incluye:

```text
Contexto: [producto, pantalla, usuario, restricción]
Objetivo: [qué debe lograr la persona]
Piezas permitidas: [Glass, StatusChip, ProgressBar…]
Datos: [qué es real, qué es demostrativo]
Restricciones: [no nuevos tokens, no nuevas dependencias, español, etc.]
Criterios de aceptación: [accesibilidad, responsive, copy, estados]
Validación: npm run build && npm run validate
```

Ejemplo:

```text
Contexto: pantalla de detalle de proyecto en una app Next.js.
Objetivo: mostrar estado, fecha estimada y avance calculado por hitos.
Piezas permitidas: Glass, StatusChip, DateBadge, ProgressBar, Notice.
Datos: el avance es real; la fecha es estimada.
Restricciones: no anidar vidrio, no inventar tokens, dark y light.
Criterios: fecha con texto «Estimada», progreso con aria-*, foco visible.
Validación: npm run build && npm run validate.
```

## 7. Definición de terminado

Un cambio está terminado cuando:

- [ ] Usa tokens y clases existentes, o documenta la extensión.
- [ ] Funciona en dark y light.
- [ ] Es operable con teclado y tiene foco visible.
- [ ] No comunica estado solo por color.
- [ ] Respeta `prefers-reduced-motion`.
- [ ] Tiene preview si es un componente.
- [ ] Tiene README y entrada en el registro si es un componente.
- [ ] `npm run build && npm run validate` pasa.
- [ ] El reporte final explica qué cambió y qué queda abierto.

## 8. Evaluación de una respuesta de agente

| Criterio | Peso | Qué mirar |
| --- | --- | --- |
| Corrección técnica | 30% | Usa las clases correctas, no rompe el layout, no inventa APIs. |
| Adherencia a tokens | 20% | Cero hexadecimales, cero valores mágicos. |
| Accesibilidad | 20% | Semántica, foco, contraste, estado, reduced-motion. |
| Documentación | 15% | README, registry, docs y previews actualizados. |
| Validación | 10% | `npm run validate` pasa y se reporta. |
| Juicio | 5% | Pregunta cuando falta contexto; no inventa datos. |

## 9. Adaptación a otras herramientas

| Herramienta | Punto de entrada |
| --- | --- |
| Claude Code / agentes con `AGENTS.md` | `AGENTS.md` en la raíz. |
| Claude Code con `CLAUDE.md` | `CLAUDE.md` importa `AGENTS.md`. |
| GitHub Copilot | `.github/copilot-instructions.md`. |
| Cursor | `.cursor/rules/design-system.mdc`. |
| Asistentes con `llms.txt` | `llms.txt`. |
| Scripts propios | `components/registry.json` + `scripts/validate.mjs`. |

## 10. Límites

- El registro describe componentes, no layouts completos.
- El validador comprueba estructura y contraste de tokens; no estética ni contraste renderizado sobre imágenes.
- La galería y las previews funcionan sin red; Tailwind Play y las fuentes están vendorizados.
- No hay un servidor MCP ni una API de componentes: el contrato es el repo.
- La calidad del copy y de las decisiones de producto sigue requiriendo criterio humano.
