# Field

Campo de formulario con etiqueta visible, control de vidrio y ayuda opcional; aplica a input, select y textarea.

## Reglas
- Toda entrada va dentro de un `<label class="dsg-field">` o enlazada con `for`/`id`. Nunca uses el placeholder como etiqueta.
- Control `.dsg-input`: 48px de alto, radius-md, fondo glass, borde line, texto ink.
- Ayuda y límites en `.dsg-field__hint` (ink-subtle, 12px). Los opcionales se marcan «(opcional)»; los demás son obligatorios.
- Errores: borde y texto en danger, mensaje que dice qué corregir, enlazado con `aria-describedby`.
- Opciones excluyentes visibles (tipo de solicitud) como radios en tarjetas de 48px, con la elegida en accent.
- Dos columnas en escritorio con `repeat(auto-fit, minmax(min(220px, 100%), 1fr))`; una en móvil.
