# AGENTS.md · Design System Glass

Contrato operativo para agentes que trabajen en este repositorio. Si una instrucción de este archivo choca con una suposición tuya, gana este archivo. Si choca con `tokens.json` o `components/bundle.css`, gana el código y hay que actualizar la documentación.

## 1. Qué es este repo

Design System Glass es un sistema de diseño front-end en archivos copiables: tokens semánticos, superficies de vidrio, componentes accesibles y documentación para personas y agentes. No es una aplicación: no hay servidor de desarrollo ni framework obligatorio.

- **Stack de referencia:** Next.js + Tailwind CSS 3.4.
- **Lenguaje de documentación:** español.
- **Namespace:** `dsg-` para clases, `--dsg-` para variables CSS.
- **Marca:** Design System Glass (nunca «Desing»).
- **Fuente de verdad:** `tokens.json` para valores; `components/bundle.css` para clases.

## 2. Reglas no negociables

1. **No inventes tokens, colores, variantes ni clases.** Usa lo que existe o documenta la extensión.
2. **No edites archivos generados:** `tokens.css`, `tailwind/globals.css` y `tailwind/play-config.js`. Ejecuta `npm run build`.
3. **No uses hexadecimales ni `rgb()` en componentes.** Usa `var(--dsg-*)` o una clase.
4. **No uses el prefijo heredado.** Todo va con `dsg-*`.
5. **No anides `.dsg-glass` dentro de `.dsg-glass`.** Usa `.dsg-inset`.
6. **No uses el color como única señal de estado.** Acompaña con texto o ícono.
7. **No uses `div` con `onClick`.** Usa `<button>` o `<a href>`.
8. **No uses el placeholder como etiqueta.** Usa `<label>` visible.
9. **No crees un componente sin README, preview y entrada en `components/registry.json`.**
10. **No añadas dependencias sin justificar por qué la composición existente no alcanza.**
11. **No cambies la marca sin actualizar `docs/05-brand.md` y los assets.**
12. **No mezcles namespaces.** Si migras, migra todo el archivo/módulo.

## 3. Mapa del repo

```text
.
├── tokens.json                 # Fuente de verdad de valores
├── tokens.css                  # GENERADO: variables + tipografía
├── components/
│   ├── bundle.css              # FUENTE: clases .dsg-*
│   ├── registry.json           # Catálogo machine-readable
│   ├── registry.schema.json
│   └── <Nombre>/README.md + preview.html
├── tailwind/
│   ├── dsg-preset.js           # Preset de Tailwind
│   ├── globals.css             # GENERADO: base + components
│   ├── play-config.js          # GENERADO: config para previews
│   └── vendor/                 # Tailwind Play 3.4.17 local (MIT)
├── docs/                       # Documentación extensa
├── assets/brand/               # SVG de marca
├── assets/fonts/               # WOFF2, fonts.css y licencias OFL
├── index.html                  # Galería visual
├── scripts/build.mjs           # Genera tokens.css, globals.css y play-config.js
├── scripts/validate.mjs        # Valida integridad
├── README.md                   # Puerta de entrada
└── llms.txt                    # Índice para modelos
```

## 4. Comandos

```bash
npm run build      # regenera tokens.css, globals.css y play-config.js
npm run validate   # valida artefactos, tokens, contraste, a11y, registro y previews
npm run check      # alias de validate
npm run serve      # sirve el repo en http://localhost:4173
npm run codemod    # ayuda de migración (ver docs/08-migration.md)
```

No hay `npm install` obligatorio: no hay dependencias.

## 5. Orden de lectura

1. Este archivo.
2. `llms.txt`.
3. El `README.md` del componente objetivo.
4. Su entrada en `components/registry.json`.
5. `components/bundle.css` y `preview.html`.
6. Según la tarea: `docs/03-tokens.md`, `docs/04-components.md`, `docs/05-brand.md`, `docs/06-ai-experience.md`.

No leas todo el repo si la tarea es pequeña. El registro y el README del componente deben bastar para el 80% de los cambios.

## 6. Jerarquía de verdad

```text
tokens.json > components/bundle.css > components/registry.json > README del componente > docs/ > index.html
```

Si `tokens.css`, `globals.css` o `play-config.js` no coinciden con sus fuentes, no los corrijas a mano: ejecuta `npm run build`.

## 7. Flujo de trabajo

### Descubrir

- Busca el componente o token más cercano en `registry.json`.
- Lee `useWhen` y `avoidWhen`.
- Decide: componer con lo existente o crear una extensión documentada.

### Planificar

Antes de editar, define:

```text
Objetivo:
Piezas:
Archivos:
Riesgos:
Validación:
```

Si falta contexto de producto (datos reales vs. demo, copy, flujo), pregunta. No inventes datos.

### Implementar

- Usa clases `dsg-*` y utilidades del preset.
- Usa tokens.
- Mantén la semántica HTML.
- Actualiza documentación en el mismo cambio.
- Si tocas un componente, actualiza preview + README + registro.

### Validar

```bash
npm run build
npm run validate
```

Además:

- Revisa dark y light.
- Recorre con teclado.
- Comprueba `prefers-reduced-motion`.
- Comprueba que no haya estado solo por color.
- Comprueba enlaces locales.

### Reportar

Incluye:

1. Qué cambió y por qué.
2. Archivos tocados.
3. Cómo se validó.
4. Qué queda abierto o requiere decisión humana.

## 8. Reglas de tokens

- Los tokens lógicos viven en `tokens.json` sin prefijo (`canvas`, `ink`, `glass`).
- Las variables CSS llevan `--dsg-` (`--dsg-canvas`).
- Cada token debe tener dark, light y `usage`.
- `warning` es alias de `accent-warm`; no es un color nuevo.
- No uses `bg-accent/20`: la variable es un color completo. Usa `color-mix()` o una clase.
- Si añades un token, mapea la utilidad Tailwind si hace falta y documenta en `docs/03-tokens.md`.

## 9. Reglas de componentes

- Cada componente tiene `README.md`, `preview.html` y entrada en `registry.json`.
- La preview carga `../../tokens.css`, `../bundle.css`, `../../assets/fonts/fonts.css`, `../../tailwind/vendor/tailwind-play-3.4.17.js` y `../../tailwind/play-config.js`.
- La preview declara `<!-- @dsCard group="…" height=… subtitle="…" -->`.
- Las clases siguen BEM: `dsg-bloque__elemento--variante`.
- El foco visible es obligatorio en todo control.
- El objetivo táctil mínimo es 44×44 px (48 px en botones).
- Las animaciones respetan `prefers-reduced-motion`.
- No anides vidrio; usa `.dsg-inset`.

## 10. Accesibilidad

Antes de dar por terminado:

- [ ] Contraste ≥ 4.5:1 en texto normal y ≥ 3:1 en grande/íconos.
- [ ] Foco visible y orden de tabulación lógico.
- [ ] Rol y nombre accesible correctos.
- [ ] Estado no solo por color.
- [ ] Formularios con etiqueta y errores asociados.
- [ ] Imágenes decorativas con `alt=""` o `aria-hidden`.
- [ ] Movimiento detenido con reduced-motion.
- [ ] La preview se puede usar solo con teclado.

## 11. Documentación

- Español, frases cortas, voz activa.
- Nombres técnicos en inglés.
- Enlaces relativos.
- Un documento = una responsabilidad.
- Si una regla es verificable, añádela a `scripts/validate.mjs`.
- No dupliques la fuente de verdad: enlaza a `tokens.json`, `bundle.css` o `registry.json`.

## 12. Definition of done

- [ ] Usa tokens y clases existentes, o documenta la extensión.
- [ ] Funciona en dark y light.
- [ ] Es operable con teclado y tiene foco visible.
- [ ] No comunica estado solo por color.
- [ ] Respeta reduced-motion.
- [ ] Tiene preview + README + registro si es un componente.
- [ ] `npm run build && npm run validate` pasa.
- [ ] El reporte final explica qué cambió y qué queda abierto.

## 13. Cuándo preguntar

Pregunta si:

- El cambio requiere un token o una variante que no existe.
- Hay que elegir entre dos patrones válidos y la decisión afecta al producto.
- Falta saber si un dato es real o demostrativo.
- Hay que romper compatibilidad o cambiar la marca.
- La tarea pide una dependencia nueva.
- El copy puede interpretarse de más de una forma.

No preguntes por cosas que ya están en `tokens.json`, `registry.json` o los READMEs.

## 14. Prohibido explícitamente

- `hub-*`, `--canvas` sin prefijo, `--accent` sin prefijo.
- Editar `tokens.css`, `tailwind/globals.css` o `tailwind/play-config.js`.
- Colores crudos en componentes.
- Vidrio anidado.
- `div` clicable.
- Placeholder como etiqueta.
- Chip o estado sin texto.
- Componente sin registro.
- Dependencia nueva sin justificación.
- Animación sin reduced-motion.
- Documentación desactualizada.

## 15. Versión

- Sistema: v2.0.0.
- Tokens: v2.
- Registro: v2.
- Cambios incompatibles: ver `docs/08-migration.md`.

Si algo de este contrato no se puede cumplir, dilo antes de implementar. Un cambio incompleto y honesto es mejor que uno que rompe el sistema en silencio.
