# Recuperatorio Programacion III - Backend y Frontend

Duracion: 1 hora 30 minutos.

## Contexto

Se entrega el mismo sistema base de inventario utilizado en el examen:

- Backend en NestJS + Prisma.
- Frontend en Astro + Svelte.
- CRUD de usuarios funcionando como ejemplo.

El objetivo es completar una nueva seccion del sistema tomando usuarios como modelo.

Importante: en este recuperatorio no se debe implementar el CRUD de marcas del examen original. La entidad a desarrollar es la indicada en esta consigna.

## Tarea principal

Agregar un CRUD completo de **proveedores**.

La entidad debe tener:

- `id`
- `name`
- `email`
- `phone`
- `createdAt`
- `updatedAt`

## Backend

Crear o completar:

- Modelo Prisma.
- Migracion correspondiente.
- Modulo.
- Controller.
- Service.
- DTO de creacion.
- DTO de actualizacion.
- Rutas REST:

```txt
GET /suppliers
GET /suppliers/:id
POST /suppliers
PATCH /suppliers/:id
DELETE /suppliers/:id
```

Requisitos:

- Validar que `name` sea obligatorio y texto.
- Validar que `email` tenga formato de correo si se envia.
- Validar que `phone` sea texto si se envia.
- No permitir nombres duplicados.
- No permitir correos duplicados si se informa email.
- Si se busca, edita o elimina un registro inexistente, responder con error adecuado.
- Ordenar el listado alfabeticamente por nombre.
- El nombre del proveedor debe guardarse sin espacios sobrantes al inicio o al final.

## Frontend

Crear o completar una pantalla que permita:

- Listar registros.
- Crear un registro.
- Editar un registro.
- Eliminar un registro con confirmacion.
- Mostrar mensajes claros cuando una accion falla.
- Actualizar la tabla luego de cada accion.
- Agregar la ruta al menu lateral.

Pueden usar la pantalla de usuarios como referencia.

## Entrega

Entregar el proyecto con:

- Backend ejecutando sin errores.
- Frontend ejecutando sin errores.
- CRUD probado desde la interfaz.
- Archivo breve `NOTAS-RECUPERATORIO.md` indicando:
  - Que CRUD implementaron.
  - Que partes no llegaron a terminar, si corresponde.

## Puntaje total: 10 puntos

| Criterio | Puntos |
| --- | ---: |
| Modelo Prisma, migracion y estructura backend de proveedores | 1.5 |
| CRUD funcional en backend | 3 |
| Validaciones y manejo de errores | 1.5 |
| CRUD funcional en frontend | 3 |
| Organizacion, claridad y entrega | 1 |
