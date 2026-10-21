# 07 · Contribuir

Este documento describe cómo cambiar el sistema sin romperlo. La regla general: **cada cambio deja el repo en un estado validable**. Para el flujo rápido, consulta [`../CONTRIBUTING.md`](../CONTRIBUTING.md); para convivencia y seguridad, [`../CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) y [`../SECURITY.md`](../SECURITY.md).

## 1. Antes de empezar

```bash
npm run validate
```

Si falla en `main`, no empieces una rama nueva sin entender por qué.

Requisitos:

- Node 20 o superior.
- Un navegador moderno para revisar la galería y las previews.
- Ninguna dependencia externa: el build y el validador son Node puro.

## 2. Flujo

```text
1. Descubrir  →  busca el componente/token existente
2. Diseñar    →  decide composición vs. extensión
3. Implementar→  código + docs en el mismo cambio
4. Validar    →  npm run build && npm run validate
5. Revisar    →  dark/light, teclado, reduced-motion
6. Reportar   →  qué cambió, por qué y qué queda abierto
```

## 3. Cambiar un token

1. Edita `tokens.json`.
2. Ejecuta `npm run build`.
3. Actualiza `docs/03-tokens.md` si cambia el valor o el uso.
4. Revisa contraste en dark y light.
5. Ejecuta `npm run validate`.

**No edites** `tokens.css` ni `tailwind/globals.css`: son generados.

Checklist:

- [ ] El token tiene valores dark/light.
- [ ] El `usage` explica cuándo usarlo.
- [ ] No duplica otro token.
- [ ] Si necesita utilidad Tailwind, está mapeado en `tailwind/dsg-preset.js`.
- [ ] La documentación está actualizada.

## 4. Añadir un componente

### 4.1. Estructura

```text
components/MiComponente/
├── README.md
└── preview.html
```

### 4.2. README

Debe incluir:

```markdown
# MiComponente

Resumen en una frase.

## Cuándo usarlo
- …

## Cuándo evitarlo
- …

## Variantes
| Clase | Uso |
| --- | --- |

## Reglas
- …

## Accesibilidad
- …

## Tailwind
```html
…
```
```

### 4.3. Preview

```html
<!-- @dsCard group="Grupo" height=160 subtitle="Descripción corta" -->
<!doctype html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="utf-8">
  <title>MiComponente — vista previa</title>
  <link rel="stylesheet" href="../../tokens.css">
  <link rel="stylesheet" href="../bundle.css">
  <link rel="stylesheet" href="../../assets/fonts/fonts.css">
  <script src="../../tailwind/vendor/tailwind-play-3.4.17.js"></script>
  <script src="../../tailwind/play-config.js"></script>
</head>
<body class="dsg-mesh" style="margin:0">
  <div style="padding:24px">…</div>
</body>
</html>
```

Convención `@dsCard`:

| Atributo | Uso |
| --- | --- |
| `group` | Agrupación visual. |
| `height` | Altura sugerida en px. |
| `subtitle` | Descripción corta para la tarjeta. |

### 4.4. CSS

Añade las clases en `components/bundle.css`, en el bloque del componente. Usa tokens:

```css
.dsg-mi-componente {
  background: var(--dsg-glass);
  color: var(--dsg-ink);
  border: 1px solid var(--dsg-glass-rim);
  border-radius: var(--dsg-radius-md);
}
```

Reglas:

- Prefijo `dsg-`.
- BEM: `dsg-bloque__elemento--variante`.
- Nada de hexadecimales.
- Foco visible en todo control.
- `prefers-reduced-motion` si hay animación.

### 4.5. Registro

Añade la entrada a `components/registry.json`:

```json
{
  "id": "mi-componente",
  "name": "MiComponente",
  "status": "stable",
  "since": "2.1.0",
  "summary": "…",
  "files": {
    "readme": "components/MiComponente/README.md",
    "preview": "components/MiComponente/preview.html"
  },
  "classes": [".dsg-mi-componente"],
  "variants": [],
  "useWhen": ["…"],
  "avoidWhen": ["…"],
  "composition": ["…"],
  "accessibility": ["…"],
  "example": "<div class=\"dsg-mi-componente\">…</div>",
  "related": ["Glass"]
}
```

### 4.6. Documentación

- Enlaza el componente en `docs/04-components.md`.
- Añade un ejemplo si representa un patrón nuevo.
- Si la galería lo necesita, añade la sección a `index.html`.

### 4.7. Validación

```bash
npm run build
npm run validate
```

El validador exige README, preview, entrada en el registro y clases existentes.

## 5. Cambiar la marca

1. Actualiza `assets/brand/`.
2. Actualiza `docs/05-brand.md`.
3. Actualiza `README.md`, `index.html` y `components/Cover/preview.html` si cambia la portada.
4. No cambies el namespace `dsg-*`: es técnico.
5. Revisa contraste y reduced-motion.
6. Ejecuta `npm run validate`.

## 6. Documentación

- Español, frases cortas, voz activa.
- Nombres técnicos en inglés (`Glass`, `StatusChip`, `accent`).
- Enlaces relativos, nunca absolutos al repo.
- Un documento = una responsabilidad.
- Si una regla es verificable, añádela al validador.

### Estilo de tablas

```markdown
| Columna | Uso |
| --- | --- |
| … | … |
```

### Estilo de código

- 2 espacios.
- Comillas simples en JS, dobles en HTML.
- Punto y coma en JS.
- Sin dependencias si se puede resolver con Node puro.

## 7. Commits

Formato sugerido:

```text
tipo(alcance): resumen en imperativo

Cuerpo opcional: qué y por qué.
```

Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `brand`.

Ejemplos:

```text
feat(button): añade variante quiet
docs(tokens): documenta el alias warning
fix(glass): corrige el borde en modo claro
brand(cover): actualiza el banner animado
```

## 8. Releases

El repo usa versionado semántico:

| Cambio | Versión |
| --- | --- |
| Nuevo componente o token | minor |
| Cambio incompatible (namespace, token renombrado) | major |
| Corrección de documentación o bug | patch |

Antes de un release:

- [ ] `npm run validate` pasa.
- [ ] `package.json` tiene la versión correcta.
- [ ] `tokens.json` tiene `version` y `updated`.
- [ ] `components/registry.json` tiene la versión y `updated`.
- [ ] `README.md` refleja el estado.
- [ ] La galería abre en dark y light.
- [ ] No hay referencias al namespace anterior fuera de `docs/08-migration.md`.
- [ ] `CHANGELOG.md` describe el cambio.
- [ ] La galería y las previews cargan sin red.

### Publicación npm

El paquete se llama `@dannyaceves/design-system-glass` y declara `license: MIT`. Es open source; publicarlo mantiene la licencia MIT. Conserva `LICENSE` y los avisos de las fuentes OFL y de Tailwind Play.

```bash
npm login
npm run validate
npm pack --dry-run
npm publish --access public
git tag v2.0.0
git push origin main --tags
```

Antes de publicar, confirma que el scope `@dannyaceves` existe y que la versión de `package.json` no está ya publicada. El `files` del paquete incluye tokens, componentes, preset, fuentes y marca; no incluye la galería, las previews, `docs/` ni Tailwind Play vendorizado.

## 9. Revisión de accesibilidad

Checklist mínima:

- [ ] Contraste ≥ 4.5:1 en texto normal y ≥ 3:1 en grande/íconos.
- [ ] Foco visible y orden de tabulación lógico.
- [ ] Roles y nombres accesibles.
- [ ] Estado no solo por color.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Formularios con etiqueta y errores asociados.
- [ ] Imágenes decorativas con `alt=""` o `aria-hidden`.
- [ ] La preview se puede usar solo con teclado.

## 10. Checklist de PR

- [ ] El cambio resuelve un problema real.
- [ ] Usa tokens y clases existentes o documenta la extensión.
- [ ] Dark y light revisados.
- [ ] Teclado y foco revisados.
- [ ] Reduced-motion revisado.
- [ ] README/preview/registro actualizados si aplica.
- [ ] `npm run build && npm run validate` pasa.
- [ ] El reporte explica qué quedó abierto.
