# 08 · Migración a la v2

La versión 2 de Design System Glass es un **cambio mayor**: la marca, el namespace de clases y las variables CSS cambiaron. Este documento es la única parte del repo que conserva el prefijo anterior, porque existe para migrarlo.

## 1. Qué cambia

| Área | Antes | Ahora |
| --- | --- | --- |
| Marca | Nombre del producto original | Design System Glass |
| Clases CSS | `hub-*` | `dsg-*` |
| Variables CSS | `--canvas`, `--ink`, `--glass`, `--accent`… | `--dsg-canvas`, `--dsg-ink`, `--dsg-glass`, `--dsg-accent`… |
| Preset | `tailwind/hub-preset.js` | `tailwind/dsg-preset.js` |
| Galería | `hub-idi-design-system.html` | `index.html` |
| Storage key | `hub-ds-theme` | `dsg-theme` |
| Tokens lógicos | `canvas`, `ink`, `glass`… | Sin cambio |
| Componentes | `Button`, `Glass`… | Sin cambio |
| `data-theme` | `dark` / `light` | Sin cambio |

## 2. Tabla de equivalencias

### Clases

| Antes | Ahora |
| --- | --- |
| `.hub-glass` | `.dsg-glass` |
| `.hub-glass--panel` | `.dsg-glass--panel` |
| `.hub-glass--hero` | `.dsg-glass--hero` |
| `.hub-inset` | `.dsg-inset` |
| `.hub-mesh` | `.dsg-mesh` |
| `.hub-mesh--admin` | `.dsg-mesh--admin` |
| `.hub-btn` | `.dsg-btn` |
| `.hub-btn--primary` | `.dsg-btn--primary` |
| `.hub-btn--danger` | `.dsg-btn--danger` |
| `.hub-chip--accent` | `.dsg-chip--accent` |
| `.hub-notice--warning` | `.dsg-notice--warning` |
| `.hub-nav-item` | `.dsg-nav-item` |
| `.hub-ticker__track` | `.dsg-ticker__track` |

La regla es simple: **`hub-` → `dsg-`**. Los modificadores BEM no se tocan: `hub-chip--accent` se convierte en `dsg-chip--accent`, no en `dsg-chip--dsg-accent`.

### Variables

| Antes | Ahora |
| --- | --- |
| `--canvas` | `--dsg-canvas` |
| `--ink` | `--dsg-ink` |
| `--ink-muted` | `--dsg-ink-muted` |
| `--ink-subtle` | `--dsg-ink-subtle` |
| `--glass` | `--dsg-glass` |
| `--glass-strong` | `--dsg-glass-strong` |
| `--glass-rim` | `--dsg-glass-rim` |
| `--glass-highlight` | `--dsg-glass-highlight` |
| `--line` | `--dsg-line` |
| `--accent` | `--dsg-accent` |
| `--accent-warm` | `--dsg-accent-warm` |
| `--on-accent` | `--dsg-on-accent` |
| `--success` | `--dsg-success` |
| `--warning` | `--dsg-warning` |
| `--danger` | `--dsg-danger` |
| `--admin` | `--dsg-admin` |
| `--shadow-glass` | `--dsg-shadow-glass` |
| `--font-display` | `--dsg-font-display` |
| `--font-sans` | `--dsg-font-sans` |
| `--font-mono` | `--dsg-font-mono` |
| `--space-*` | `--dsg-space-*` |
| `--radius-*` | `--dsg-radius-*` |
| `--backdrop-glass` | `--dsg-backdrop-glass` |
| `--backdrop-glass-light` | `--dsg-backdrop-glass-light` |

`--c` **no cambia**: es una variable local de los chips, avisos y barras para inyectar el tono semántico.

## 3. Codemod

El repo incluye un codemod sin dependencias:

```bash
# Simulación (no escribe)
node scripts/codemod-v1-to-v2.mjs ./src

# Aplicar
node scripts/codemod-v1-to-v2.mjs ./src --write
```

Qué hace:

- `hub-` → `dsg-` en clases, strings y nombres de archivo referenciados.
- `--token` → `--dsg-token` sin tocar modificadores BEM.
- Corrige `dsg-*--dsg-*` si ya se había aplicado un reemplazo ingenuo.
- No renombra archivos: los renombrados son manuales y están en la tabla de arriba.

Después del codemod:

1. Revisa los archivos con `git diff`.
2. Busca restos: `grep -R "hub-" ./src`.
3. Busca variables sin prefijo: `grep -R "var(--accent" ./src`.
4. Ejecuta `npm run build && npm run validate` en el repo del sistema.
5. Abre la app y revisa dark/light.

## 4. Migración manual paso a paso

### 4.1. Dependencias

```diff
- presets: [require('./tailwind/hub-preset')]
+ presets: [require('./tailwind/dsg-preset')]
```

### 4.2. CSS global

Si copiaste el `globals.css` anterior, reemplázalo por el nuevo. No mezcles tokens viejos y nuevos: el tema claro puede quedar a medias.

### 4.3. HTML

```diff
-<html data-theme="dark">
-  <body class="hub-mesh">
-    <article class="hub-glass">
-      <span class="hub-chip hub-chip--accent">En desarrollo</span>
+<html data-theme="dark">
+  <body class="dsg-mesh">
+    <article class="dsg-glass">
+      <span class="dsg-chip dsg-chip--accent">En desarrollo</span>
```

### 4.4. Tema persistido

```diff
-localStorage.setItem('hub-ds-theme', theme);
+localStorage.setItem('dsg-theme', theme);
```

Si quieres conservar la preferencia de usuarios existentes, lee la clave vieja una vez y migra:

```js
const legacy = localStorage.getItem('hub-ds-theme');
if (legacy && !localStorage.getItem('dsg-theme')) {
  localStorage.setItem('dsg-theme', legacy);
  localStorage.removeItem('hub-ds-theme');
}
```

### 4.5. Tokens en JS

```diff
-const accent = getComputedStyle(root).getPropertyValue('--accent');
+const accent = getComputedStyle(root).getPropertyValue('--dsg-accent');
```

### 4.6. Imágenes y marca

- Reemplaza el logo anterior por `assets/brand/logo.svg` o `logo-on-light.svg`.
- Reemplaza la portada por `assets/brand/banner.svg`.
- No uses capturas o material histórico como referencia de marca actual; la única fuente es `docs/05-brand.md` y `assets/brand/`.

## 5. Cambios incompatibles

| Cambio | Impacto |
| --- | --- |
| Namespace `hub-*` → `dsg-*` | Cualquier selector, test o CSS externo que use las clases viejas deja de aplicar. |
| Variables `--*` → `--dsg-*` | Cualquier estilo que lea las variables viejas deja de funcionar. |
| Preset renombrado | El `require` del preset cambia. |
| Storage key | La preferencia de tema se pierde si no se migra. |
| Galería renombrada | Los enlaces a `hub-idi-design-system.html` se rompen. |

## 6. Checklist

- [ ] `hub-` no aparece en el código de la app.
- [ ] `var(--accent)` y demás variables viejas no aparecen.
- [ ] El preset es `dsg-preset`.
- [ ] La storage key es `dsg-theme` (o se migró).
- [ ] La app abre en dark y light.
- [ ] Los componentes con vidrio siguen teniendo `.dsg-mesh` detrás.
- [ ] Las previews y la galería cargan.
- [ ] `npm run build && npm run validate` pasa en el repo del sistema.
- [ ] La marca visible es Design System Glass.

## 7. Rollback

Si necesitas volver atrás, el cambio es simétrico:

```bash
# En una rama, con el codemod adaptado o con git
git revert <commit>
```

No mantengas ambos namespaces en producción: duplica CSS, confunde a los agentes y rompe la validación de variables.
