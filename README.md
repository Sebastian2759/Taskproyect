# Task Manager – Frontend (Angular 19)

## Pasos para ejecutar el proyecto

### Requisitos
- Node.js 18+ (recomendado)
- Angular CLI (o usar `npx`)

### 1) Instalar dependencias
```bash
npm install
```

### 2) Configurar base URL del API
El frontend usa una **base URL única**:
- `http://localhost:7777/api/v1/`

Opciones recomendadas:

#### A) Proxy (recomendado)
Crear/ajustar `proxy.conf.json`:
```json
{
  "/api": {
    "target": "http://localhost:7777",
    "secure": false,
    "changeOrigin": true
  }
}
```

Ejecutar:
```bash
ng serve --proxy-config proxy.conf.json
```

> Con proxy, el front consume `/api/v1/...` sin problemas de CORS.

#### B) Variable de entorno (si no usas proxy)
En `environment.ts`:
```ts
export const environment = {
  apiBaseUrl: 'http://localhost:7777/api/v1'
};
```
Y el `ApiClientService` concatena rutas desde esa base.

### 3) Ejecutar
```bash
ng serve
```
Aplicación: `http://localhost:4200`

---

## Decisiones técnicas
- **Angular 19** con Standalone Components.
- **Servicios por feature**
  - `TasksService`, `UsersService`, `ValuesService`
  - `ApiClientService` centraliza `HttpClient`, base URL y tipado de `ResponseBase<T>`.
- **UI reusable**
  - `Container`, `Paginator`, `ConfirmDialog`, `Toast`
  - Estilos consistentes usando tokens CSS (variables) para colores/spacing/bordes.
- **Formato fecha/hora**
  - Pipe `DateTimePipe` para normalizar la presentación.
- **Combos desde API**
  - Usuarios desde `GET /users` (paginado, se usa un pageSize alto para combo)
  - Status/Priority desde `GET /values/*` (MasterDataDetail)

---

---

## Notas
- Update de estado: el UI solo permite `Pending -> InProgress -> Done` (respeta la regla de negocio).
- Si ves `HttpErrorResponse` con status 200, normalmente es por respuesta no parseable o mismatch de tipado:
  revisar `ApiClientService` y el modelo `ResponseBase<T>`.
