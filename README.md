## Requirements

- Node.js 22
- PostgreSQL

## How to run in local

- Copy the `.env-example` environment variables into you local `.env` file
- Then run `npm i` to install the dependencies
- Then run `npx ts-node src/app.ts` to run the application

## Prisma commands

### Crear nueva migración (sin aplicar cambios en db)
```bash
npx prisma migrate dev --name init --create-only
```

### Aplicar migraciones y generar cliente
```bash
npx prisma migrate dev
```

**Este comando hace lo siguiente:**

1. **Aplica las migraciones pendientes:**
   - Ejecuta todas las migraciones SQL que aún no se han aplicado en la base de datos local.

2. **Genera una nueva migración (si hay cambios):**
   - Si detecta diferencias entre tu modelo en `schema.prisma` y la base de datos actual, te permite crear un nuevo archivo de migración para reflejar esos cambios.
   - Usa el flag `--create-only` si solo quieres crear la migración sin aplicarla.

3. **Actualiza Prisma Client:**
   - Luego de aplicar las migraciones, Prisma genera automáticamente el cliente (`@prisma/client`) actualizado.
   - Puedes usar este cliente en tu código para consultar la base de datos con tipos actualizados.

### Otros comandos útiles

#### Generar Prisma Client
```bash
npx prisma generate
```
Genera el cliente Prisma basado en el schema actual. Útil cuando solo necesitas actualizar el cliente sin hacer migraciones.

#### Ver el estado de las migraciones
```bash
npx prisma migrate status
```
Muestra el estado de todas las migraciones en tu base de datos.

#### Resetear la base de datos
```bash
npx prisma migrate reset
```
⚠️ **Cuidado:** Este comando elimina todos los datos y aplica todas las migraciones desde cero.

#### Cargar datos de prueba (seeds)
```bash
npm run prisma:seed
```
Carga datos de prueba en la base de datos usando el archivo `prisma/seed.ts`. Útil para poblar la base de datos con datos iniciales para desarrollo y testing.

#### Abrir Prisma Studio
```bash
npx prisma studio
```
Abre una interfaz web para visualizar y editar los datos de tu base de datos.

#### Validar el schema
```bash
npx prisma validate
```
Valida que tu archivo `schema.prisma` esté correctamente formateado y sea válido.

#### Formatear el schema
```bash
npx prisma format
```
Formatea automáticamente tu archivo `schema.prisma` para que sea consistente y legible.

#### Generar diagrama de la base de datos
```bash
npx prisma db pull
```
Extrae el esquema actual de la base de datos y lo convierte en un archivo `schema.prisma`.

#### Aplicar cambios directamente (solo desarrollo)
```bash
npx prisma db push
```
⚠️ **Solo para desarrollo:** Aplica cambios del schema directamente a la base de datos sin crear migraciones. No usar en producción.

