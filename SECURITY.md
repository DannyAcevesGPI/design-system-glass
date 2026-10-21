# Política de seguridad

## Versiones soportadas

| Versión | Soporte |
| --- | --- |
| 2.x | Sí |
| 1.x | No |

## Reportar una vulnerabilidad

No abras un issue público con detalles explotables. Usa el reporte privado de GitHub:

https://github.com/DannyAcevesGPI/design-system-glass/security/advisories/new

Si esa opción no está disponible, contacta al mantenedor por GitHub:

https://github.com/DannyAcevesGPI

Incluye, si puedes:

- Versión afectada.
- Navegador y sistema operativo.
- Pasos mínimos para reproducir.
- Impacto esperado.
- Una propuesta de corrección, si la tienes.

## Alcance

Design System Glass es una librería de tokens, CSS, documentación y previews estáticas. No incluye servidor, autenticación ni almacenamiento de datos. Los problemas relevantes incluyen:

- XSS en previews o documentación.
- Dependencias vendorizadas con vulnerabilidades conocidas.
- Enlaces o assets que permitan ejecución no deseada.
- Contenido que exponga datos privados.

## Respuesta

El mantenedor confirmará la recepción, evaluará el impacto y coordinará una corrección y un aviso público cuando corresponda. No se promete un plazo fijo, pero se dará seguimiento.
