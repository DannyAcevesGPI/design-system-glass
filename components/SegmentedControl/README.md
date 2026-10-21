# SegmentedControl

Grupo de 2 a 4 opciones excluyentes para cambiar de vista (Roadmap, Equipo) o de periodo (Resumen).

## Reglas
- Para vistas: `role="tablist"`, cada botón `role="tab"` con `aria-selected`.
- Para filtros de periodo: `role="group"` con `aria-label`, botones con `aria-pressed`.
- La opción activa usa accent + on-accent; las inactivas, ink-muted sobre transparente.
- Contenedor: `.dsg-glass .dsg-seg`. No más de 4 opciones; para más, usa un `<select>`.

## Tailwind
```html
<div role="tablist" class="dsg-glass dsg-seg">
  <button role="tab" aria-selected="true" class="dsg-seg__btn">Por horizonte</button>
</div>
```
