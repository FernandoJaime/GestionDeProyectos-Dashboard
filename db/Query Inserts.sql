-------------------------------------------- Inserccion de datos --------------------------------------------


-- Seleccionar la base de datos --------------------------------------------
use DB_Dashboard;


-- Insertar datos en la tabla Roles --------------------------------------------
insert into Roles (cod_rol, nom_rol) values 
(1, 'Administrador'), 
(2, 'Empleado');


-- Insertar datos en la tabla Departamentos --------------------------------------------
insert into Departamentos (cod_departamento, nom_departamento) values
(1, 'Analistas IT'), 
(2, 'Frontend'), 
(3, 'Backend'), 
(4, 'Marketing'), 
(5, 'Ventas'), 
(6, 'Soporte'),
(7, 'Administracion');


-- Insertar datos en la tabla Estados --------------------------------------------
insert into Estados (cod_estado, desc_estado) values 
(1, 'En Proceso'), 
(2, 'Completado'), 
(3, 'Pendiente'), 
(4, 'Cancelado');


-- Insertar datos en la tabla Tiempos --------------------------------------------
insert into Tiempos (cod_tiempo, desc_tiempo) values 
(1, 'A tiempo'), 
(2, 'Atrasado');


-- Insertar datos en la tabla Clientes --------------------------------------------
insert into Clientes (cod_cliente, nom_cliente, email_cliente, tel_cliente, direc_cliente) values 
(1, 'Tech Solutions', 'info@techsolutions.com', '555-1111', '100 Tech Lane, Silicon Valley'),
(2, 'Creative Agency', 'contact@creativeagency.com', '555-2222', '200 Creative St, New York'),
(3, 'Health Inc.', 'support@healthinc.com', '555-3333', '300 Health Blvd, Chicago'),
(4, 'EduCorp', 'info@educorp.com', '555-4444', '400 Education Rd, Los Angeles'),
(5, 'Finance Group', 'contact@financegroup.com', '555-5555', '500 Finance Ave, Miami'),
(6, 'Retailers Ltd.', 'info@retailersltd.com', '555-6666', '600 Retail St, San Francisco'),
(7, 'AutoTech', 'support@autotech.com', '555-7777', '700 Auto St, Detroit'),
(8, 'Energy Solutions', 'contact@energysolutions.com', '555-8888', '800 Energy Rd, Houston'),
(9, 'Logistics Experts', 'info@logisticsexperts.com', '555-9999', '900 Logistics Dr, Seattle'),
(10, 'Travel Co.', 'support@travelco.com', '555-0000', '1000 Travel Blvd, Orlando');


-- Insertar datos en la tabla Proyectos --------------------------------------------
insert into Proyectos (cod_proyecto, nom_proyecto, desc_proyecto, fecha_inicio, fecha_entrega, cod_tiempo, cod_cliente, cod_estado) values 
(1, 'Desarrollo de App Móvil', 'Creación de una aplicación móvil para la gestión de tareas', '2024-09-01', '2025-03-01', 1, 1, 1),
(2, 'Rediseño de Sitio Web', 'Rediseño completo del sitio web de la empresa', '2024-10-01', '2025-01-15', 1, 2, 3),
(3, 'Sistema de Gestión de Inventarios', 'Desarrollo de un sistema para gestionar el inventario de productos', '2024-08-15', '2024-12-15', 2, 3, 1),
(4, 'Campaña de Publicidad Digital', 'Campaña para promocionar productos a través de medios digitales', '2024-09-15', '2024-11-30', 1, 4, 2),
(5, 'Actualización de Software', 'Actualización del sistema de software existente', '2024-11-01', '2025-05-01', 2, 5, 1),
(6, 'Implementación de CRM', 'Desarrollo e implementación de un sistema de CRM para la gestión de relaciones con clientes', '2024-12-01', '2025-06-01', 1, 6, 3),
(7, 'Automatización de Procesos', 'Automatización de procesos internos para mejorar la eficiencia', '2024-07-01', '2024-10-01', 2, 7, 4),
(8, 'Desarrollo de Plataforma E-commerce', 'Creación de una plataforma de comercio electrónico', '2024-08-01', '2024-12-31', 1, 8, 2),
(9, 'Reestructuración de Red', 'Rediseño y mejora de la infraestructura de red de la empresa', '2024-10-15', '2025-03-15', 2, 9, 1),
(10, 'Desarrollo de Sistema de Seguimiento', 'Sistema para el seguimiento y análisis de datos de proyectos', '2024-09-01', '2025-02-01', 1, 10, 3),
(11, 'Integración de API', 'Integración de APIs externas para mejorar la funcionalidad del sistema', '2024-10-01', '2025-01-31', 1, 1, 1),
(12, 'Desarrollo de Chatbot', 'Desarrollo de un chatbot para soporte al cliente', '2024-09-15', '2025-02-15', 2, 2, 2),
(13, 'Creación de Plataforma de Educación Online', 'Desarrollo de una plataforma para cursos en línea', '2024-08-15', '2024-12-15', 1, 3, 1),
(14, 'Optimización de Base de Datos', 'Mejoras en el rendimiento de las bases de datos existentes', '2024-11-01', '2025-04-01', 2, 4, 1),
(15, 'Desarrollo de Aplicación de Gestión de Proyectos', 'Aplicación para gestionar proyectos y tareas', '2024-09-01', '2025-01-01', 1, 5, 2);


-- Insertar datos en la tabla Tareas --------------------------------------------
insert into Tareas (cod_tarea, nom_tarea, desc_tarea, costo_tarea, duracion_tarea, cod_proyecto, cod_departamento, cod_estado) values 
(1, 'Diseño de Interfaz', 'Diseño de la interfaz de usuario para la app móvil', 2000.00, 45, 1, 2, 1),
(2, 'Desarrollo Backend', 'Desarrollo de la lógica backend para la app móvil', 5000.00, 60, 1, 3, 2),
(3, 'Test de Usabilidad', 'Pruebas de usabilidad de la aplicación móvil', 1500.00, 30, 1, 6, 1),
(4, 'Rediseño de Página de Inicio', 'Rediseño de la página de inicio del sitio web', 1200.00, 20, 2, 2, 3),
(5, 'Desarrollo de Funcionalidad de Pago', 'Implementación del sistema de pago en el sitio web', 3500.00, 40, 2, 3, 1),
(6, 'Optimización SEO', 'Optimización del sitio web para motores de búsqueda', 2000.00, 25, 2, 4, 2),
(7, 'Configuración del Sistema de Inventarios', 'Configuración inicial del sistema de inventarios', 2500.00, 35, 3, 1, 1),
(8, 'Capacitación del Personal', 'Entrenamiento del personal para el nuevo sistema de inventarios', 1000.00, 15, 3, 5, 3),
(9, 'Campaña Publicitaria en Redes Sociales', 'Estrategia y ejecución de campaña en redes sociales', 3000.00, 30, 4, 4, 2),
(10, 'Desarrollo de Material Promocional', 'Creación de material para la campaña publicitaria', 2500.00, 25, 4, 4, 1),
(11, 'Actualización del Sistema de Gestión', 'Actualización de las versiones del software', 4000.00, 50, 5, 2, 1),
(12, 'Desarrollo de Funcionalidades Adicionales', 'Añadir nuevas funcionalidades al software existente', 4500.00, 60, 5, 1, 2),
(13, 'Desarrollo de Modulo de Reportes', 'Crear un módulo de reportes en el CRM', 2200.00, 30, 6, 3, 1),
(14, 'Pruebas de Integración', 'Pruebas de integración del CRM con otros sistemas', 1800.00, 20, 6, 4, 2),
(15, 'Automatización de Reportes', 'Implementar automatización en la generación de reportes', 2700.00, 40, 7, 1, 1);

-- Insertar datos en la tabla Empleados --------------------------------------------
insert into Empleados (cod_empleado, nom_empleado, ape_empleado, fecha_nacimiento, email_empleado, pass_hash, tel_empleado, direc_empleado, fecha_creacion, cod_departamento, debaja, cod_rol) values 
(1, 'Fernando', 'Jaime', '2002-09-11', 'admin@dashboard.com', '$2b$10$/90aDQHbtHt7SpSQwjGgI.UEkKpDQsniTRw1KViHJWSf.zF1.YQgy', '1234567892', 'Calle del admin 123', '2024-09-10', 7, 0, 1)