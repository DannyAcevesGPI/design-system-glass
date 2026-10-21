# Instalación en Next.js + Tailwind CSS 3.4

Design System Glass se distribuye como archivos copiables y, si tienes acceso, como paquete npm. No requiere un paso de compilación propio. El contrato es siempre el mismo: tokens como variables CSS, preset de Tailwind y la capa de componentes.

## 1. Copia los archivos

La vía principal sigue siendo copiar los archivos. Si usas el paquete npm, consulta la alternativa al final de esta guía.

| Archivo | Destino sugerido |
| --- | --- |
| `tailwind/dsg-preset.js` | `tailwind/dsg-preset.js` |
| `tailwind/globals.css` | `app/globals.css` |
| `tokens.css` | Solo si no usas `globals.css` (contiene los tokens y las clases tipográficas). |
| `components/bundle.css` | Solo si prefieres componer las capas a mano. |

`tailwind/globals.css` ya incluye `tokens.css` y `components/bundle.css` dentro de `@layer base` y `@layer components`. Es el camino recomendado.

## 2. Configura Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require('./tailwind/dsg-preset')],
  content: ['./src/**/*.{ts,tsx}'],
};
```

El preset registra colores, fuentes, tamaños, radios, sombra y blur. Los colores apuntan a variables CSS, así que cambian con el tema sin escribir variantes `dark:`.

## 3. Carga las fuentes

El paquete incluye `assets/fonts/` con WOFF2 y licencias OFL; también puedes usar `next/font/google` como en el ejemplo.

Con `next/font/google`:

```ts
// app/fonts.ts
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

export const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700'], variable: '--dsg-font-display' });
export const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--dsg-font-sans' });
export const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--dsg-font-mono' });
```

Aplica las variables en `<html>` o `<body>`:

```tsx
<html lang="es" data-theme="dark" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
```

Las variables ya existen en `tokens.css` con valores de respaldo; `next/font` solo las sustituye por las fuentes optimizadas.

## 4. Activa el tema

```tsx
// app/layout.tsx
const theme = cookies().get('dsg-theme')?.value ?? 'dark';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme={theme}>
      <body className="dsg-mesh font-sans text-ink">{children}</body>
    </html>
  );
}
```

Sin `data-theme`, el sistema sigue `prefers-color-scheme`. El modo oscuro es el predeterminado del producto.

Para evitar el parpadeo, aplica el tema guardado antes de pintar con un script en `<head>`:

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem('dsg-theme');
      var theme = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
</script>
```

## 5. Usa un componente

```tsx
export function ProjectCard() {
  return (
    <article className="dsg-glass p-6">
      <p className="font-mono text-eyebrow uppercase text-accent">Catálogo</p>
      <h2 className="font-display text-heading-md text-ink">Proyectos</h2>
      <p className="mt-2 text-body-sm text-ink-muted">24 proyectos con al menos un hito en curso.</p>
      <span className="dsg-chip dsg-chip--accent mt-4">En desarrollo</span>
    </article>
  );
}
```

## 6. Verifica

```bash
npm run build
npm run validate
```

Abre `index.html` para comparar con la galería. Cada componente tiene su vista previa aislada en `components/<Nombre>/preview.html`.

## Notas

- No anides `.dsg-glass` dentro de `.dsg-glass`; usa `.dsg-inset`.
- No uses valores hexadecimales directamente en componentes: usa tokens.
- Los modificadores de opacidad de Tailwind (`bg-accent/20`) no aplican a variables con valor completo; usa `color-mix()` o una clase de componente.
- Para agentes: `AGENTS.md` es el contrato; `components/registry.json` es la fuente de verdad de clases y reglas.

## Alternativa: paquete npm

El paquete se llama `@dannyaceves/design-system-glass` y declara `license: MIT`. Es open source; conserva el aviso de copyright y la licencia al redistribuirlo.

```bash
npm install @dannyaceves/design-system-glass
```

Copia `tailwind/globals.css` y `tailwind/dsg-preset.js` desde `node_modules/@dannyaceves/design-system-glass/`, o importa los archivos con la ruta del paquete según tu bundler. Las fuentes están en `assets/fonts/`.
