# Bienestar Analytics — Piura 2026

## Navegación agrupada v20

Los menús del administrador y coordinador se organizan en grupos desplegables por similitud: Gestión estudiantil, Coordinación, Análisis y reportes, Comunicación, Encuestas y Administración. El grupo de la página activa se abre automáticamente. No requiere migración SQL.

## Ajuste funcional v19

La ficha socioeconómica fue retirada del menú y del acceso para todos los usuarios. La estructura histórica permanece en la base de datos para evitar pérdida accidental de información. No requiere una nueva migración SQL.

## Rediseño de acceso v18

El inicio de sesión incorpora una presentación institucional profesional, mensajes claros de seguridad e inactividad, diseño adaptable para dispositivos móviles y eliminación de las credenciales de demostración visibles. No requiere migración SQL adicional.

## Actualización v17

Importe una sola vez `sql/upgrade_v15.sql` después de `upgrade_v14.sql`. Incluye bloqueo temporal después de cinco intentos fallidos, cambio seguro de contraseña, configuración institucional, control de calidad de datos y matriz de permisos por rol.

## Actualización v16

Respalde la base de datos e importe una sola vez `sql/upgrade_v14.sql` después de `upgrade_v13.sql`. Incluye reportes configurables, análisis comparativo de encuestas, copias de respaldo SQL, control y revocación de sesiones activas, y guía rápida según el rol. Después de actualizar, los usuarios deben volver a iniciar sesión para que sus equipos aparezcan en el control de sesiones.

## Ajuste de reportes oficiales v15

Los reportes oficiales impresos, PDF y Excel incorporan tres espacios de firma: Responsable del reporte, Jefe de Unidad de Bienestar y Empleabilidad y Dirección Institucional. Este ajuste no requiere migración SQL.

## Ajuste de permisos v14

Evaluación inicial, ficha socioeconómica, comparación de periodos y actas quedan disponibles solo para el administrador. Reasignar casos está disponible para administrador y docente consejero; el docente únicamente puede trasladar al administrador un caso abierto bajo su propia responsabilidad. No requiere una nueva migración SQL después de `upgrade_v13.sql`.

## Actualización v13

Respalde la base de datos e importe una sola vez `sql/upgrade_v13.sql` después de `upgrade_v12.sql`. Incluye evaluación inicial, ficha socioeconómica ampliada, reasignación trazable de casos, comparación de periodos y actas institucionales con confidencialidad.

## Actualización v12

Respalde la base de datos e importe una sola vez `sql/upgrade_v12.sql` después de `upgrade_v11.sql`. Luego reemplace los archivos y recargue con `Ctrl + F5`.

Incluye supervisión, escalación de casos, prioridad y referencia de estudiante en mensajes, confirmación de lectura, auditoría consultable, cierre por 30 minutos de inactividad y desplazamiento vertical del menú lateral.

Aplicación web en PHP y MySQL para apoyar la gestión del bienestar estudiantil. Incluye autenticación, roles, panel institucional, directorio por programa, perfil 360° del estudiante, registro de atenciones, analítica, reportes CSV e impresión.

## Requisitos

- XAMPP con PHP 8.1 o superior y MySQL/MariaDB.
- Extensión PHP PDO MySQL habilitada (incluida normalmente en XAMPP).
- Navegador moderno.

## Instalación en XAMPP (Windows)

1. Descomprima la carpeta `bienestar-analytics` dentro de `C:\xampp\htdocs\`.
2. Inicie **Apache** y **MySQL** desde el panel de XAMPP.
3. Abra `http://localhost/phpmyadmin`.
4. Entre a **Importar**, seleccione `bienestar-analytics/sql/database.sql` y ejecute la importación.
5. Abra `bienestar-analytics/config/config.php` y verifique las credenciales de MySQL. La configuración predeterminada usa usuario `root` sin contraseña.
6. Visite `http://localhost/bienestar-analytics/`.

Si cambia el nombre de la carpeta, actualice `base_url` en `config/config.php`.

## Credenciales de demostración

- Administrador / Jefe de Bienestar: `admin@bienestar.test` — `Admin2026*`
- Docente: `docente@bienestar.test` — `Consejero2026*`

Cambie las contraseñas desde **Docentes** antes de usar el sistema con información real.

## Roles

- **Jefe de Bienestar (administrador):** acceso a todos los módulos y gestión de usuarios.
- **Docente consejero:** consulta exclusivamente a los estudiantes de su programa y ciclo asignados para el periodo académico. Puede registrarlos individualmente o importar grupos mediante CSV y registrar nuevas atenciones; no puede editar ni eliminar estudiantes.

## Actualización desde la primera versión

Si instaló la primera versión, ejecute primero `sql/upgrade_v2.sql` y luego `sql/upgrade_v3.sql`. Si ya tenía la versión con docentes y programas, ejecute solamente `sql/upgrade_v3.sql`. Después cierre la sesión e ingrese nuevamente y asigne el ciclo correcto a cada docente. No importe `database.sql`, porque ese archivo reinicia la base de datos.

## Actualización de esta versión (periodos y coordinadores)

Si ya utiliza el sistema, haga una copia de seguridad de MySQL y ejecute **solo** `sql/upgrade_v4.sql` desde phpMyAdmin (pestaña Importar). Luego reemplace la carpeta del sistema y vuelva a iniciar sesión. No importe `database.sql` en una instalación existente: eliminaría los datos actuales. La migración asigna a los estudiantes existentes el periodo 2026-I o 2026-II según su ciclo y ajusta las asignaciones docentes antiguas cuya paridad no coincidía. Revise estas asignaciones en **Usuarios y asignaciones**.

Desde **Periodos**, registre periodos nuevos (por ejemplo 2027-I). Los docentes se asignan a un solo programa, ciclo y periodo; el coordinador ve todos los ciclos del programa asignado en ese periodo, con acceso de consulta. El administrador puede registrar más administradores. El coordinador puede designar docentes consejeros ya registrados en su programa desde **Designar consejeros**, asignándoles un ciclo del periodo vigente.

## Actualización de asignación individual de estudiantes

Para una instalación que ya usa `upgrade_v4.sql`, haga copia de seguridad y ejecute **una sola vez** `sql/upgrade_v5.sql` desde phpMyAdmin **antes** de copiar el código actualizado. Esta migración agrega el consejero asignado a cada estudiante y vincula los estudiantes existentes con el docente activo que coincida en programa, ciclo y periodo. El administrador o coordinador puede cambiar la asignación desde **Estudiantes → Asignar**. El docente solo podrá consultar, atender y reportar los estudiantes asignados a su cuenta. No importe `database.sql` en instalaciones existentes.

## Actualización de periodo activo y migración

Para una instalación que ya aplicó `upgrade_v5.sql`, realice una copia de seguridad e importe **una sola vez** `sql/upgrade_v6.sql` desde phpMyAdmin. Después reemplace el código. La migración deja un solo periodo activo (el más reciente de los habilitados) y alinea las asignaciones de coordinadores y consejeros. Revise el periodo en **Periodos** y las asignaciones antes de migrar estudiantes.

La pantalla **Migración** permite trasladar un estudiante o todos los elegibles de un programa desde el periodo anterior al periodo activo. Avanza un ciclo y actualiza el mismo registro; su perfil, DNI, código e historial permanecen. El sexto ciclo se excluye del traslado automático. El administrador puede migrar todos los programas y el coordinador únicamente el suyo. Los paneles, listados, perfiles, reportes y analítica muestran únicamente estudiantes del periodo activo.

## Encuestas obligatorias programadas

En instalaciones que ya usaron `upgrade_v6.sql`, realice una copia de seguridad e importe **una sola vez** `sql/upgrade_v7.sql` antes de reemplazar el código. Desde **Encuestas**, el administrador crea un borrador, programa la fecha, selecciona docentes y/o coordinadores, añade preguntas de selección con al menos dos alternativas y activa la encuesta. Desde la fecha programada, los usuarios destinatarios deben responderla por completo antes de acceder a los módulos. La encuesta se registra una sola vez por cuenta. La pantalla de gestión muestra el número de respuestas por alternativa. Una encuesta con respuestas se puede pausar, pero sus preguntas no se modifican para preservar los resultados.

## Actualización de códigos, mensajes e idioma

Si la instalación ya tiene `upgrade_v7.sql`, haga una copia de seguridad e importe **una sola vez** `sql/upgrade_v8.sql`. Esta migración permite repetir el código institucional en ciclos diferentes; dentro del mismo ciclo el código continúa siendo único. Después reemplace el código del sistema. Los mensajes de encuesta y registro se muestran como ventanas integradas, el docente solo dispone de su ciclo asignado al registrar estudiantes y el selector **ES/EN** conserva el idioma en el navegador sin utilizar cookies. Las cookies de sesión se eliminan automáticamente al cerrar el sistema.

## Actualización de reportes de encuestas e interfaz

Esta actualización no requiere un nuevo archivo SQL. Las encuestas pueden editarse y eliminarse desde su listado, con confirmación visual antes del borrado. Cada encuesta incorpora un reporte de participación y resultados por alternativa, impresión y exportación CSV. El selector **ES/EN** también procesa ventanas y contenido dinámico; la navegación lateral utiliza transiciones suaves y los formularios administrativos bloquean las sugerencias de información escrita anteriormente.

## Seguridad y privacidad

La aplicación incorpora contraseñas con hash, consultas preparadas PDO, tokens CSRF, control de sesión, autorización por rol, escape de salida y bitácora de acciones. Por tratar datos personales y socioemocionales, debe instalarse sobre HTTPS en producción, limitar accesos, realizar copias de seguridad cifradas y establecer reglas institucionales de conservación y confidencialidad. Los indicadores de riesgo son orientativos y no sustituyen una valoración profesional.

## Módulos incluidos

- Inicio de sesión y cierre seguro de sesión.
- Dashboard con indicadores, alertas y actividad reciente.
- Directorio con búsqueda y filtros por programa, riesgo y estado.
- Alta y actualización de estudiantes.
- Perfil detallado con indicadores y línea de acompañamiento.
- Registro de consejerías, tutorías, apoyos y derivaciones.
- Analítica comparativa por programa, ciclo y tipo de atención.
- Reportes filtrables, exportación CSV e impresión.
- Administración completa de docentes: registro, edición, eliminación, activación, contraseña y asignación por programa.
- Administración de programas de estudio.
- Alta, edición y eliminación de estudiantes mediante controles administrativos.
- Contadores de gestión y alertas destacadas para estudiantes con riesgo alto.
- Datos ficticios de demostración para los cuatro programas.

## Estructura principal

- `config/`: conexión y parámetros generales.
- `includes/`: autenticación, base de datos, diseño y utilidades.
- `modules/`: estudiantes, perfiles, analítica, reportes y usuarios.
- `assets/`: estilos y JavaScript sin dependencias externas.
- `sql/database.sql`: estructura y datos demostrativos.
## Actualización v10: expediente y seguimiento

En instalaciones existentes, importe una sola vez `sql/upgrade_v10.sql` después de `upgrade_v9.sql`. Esta actualización agrega planes de seguimiento, recordatorios, derivaciones, documentos del expediente, trazabilidad y permisos temporales de edición. No vuelva a importar `database.sql`.

## Actualización v16: coordinador y docente consejero

En instalaciones existentes, importe una sola vez `sql/upgrade_v16.sql`. Luego ingrese como administrador, edite la cuenta correspondiente y seleccione el rol **Coordinador y docente consejero**, junto con su programa, ciclo y periodo activo. El perfil conserva la supervisión del programa y agrega una vista diferenciada para sus estudiantes y casos personales de consejería.

## Actualización visual del menú lateral

El menú lateral utiliza encabezados compactos, secciones desplegables con mayor contraste, subopciones alineadas mediante una guía visual, estado activo destacado y mejor aprovechamiento del espacio. Esta actualización es únicamente visual y no requiere importar un archivo SQL adicional.
