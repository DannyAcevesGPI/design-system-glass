# Diff

Comparación campo por campo entre la versión publicada y una propuesta de cambio, para flujos de revisión.

## Reglas
- Tres columnas: campo, «Publicado · vN», «Propuesta». En móvil, el campo arriba y las dos versiones apiladas.
- Usa los elementos semánticos `<del class="dsg-del">` e `<ins class="dsg-ins">`: el lector de pantalla anuncia eliminado/agregado.
- Eliminado: tachado sobre danger al 22%. Agregado: subrayado de 2px en success sobre success al 22%. Tachado y subrayado distinguen sin depender del color.
- Muestra solo los campos que cambiaron y su conteo en el título («Cambios propuestos · 4 campos»).
- Encima del diff, un Notice indica si hay conflicto con la versión publicada.
