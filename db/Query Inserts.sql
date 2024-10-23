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
(2, 'Atrasado'),
(3, 'Entregado');


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
(15, 'Desarrollo de Aplicación de Gestión de Proyectos', 'Aplicación para gestionar proyectos y tareas', '2024-09-01', '2025-01-01', 1, 5, 2),
(16, 'Sistema de Gestión Escolar', 'Plataforma para la gestión de instituciones educativas', '2024-05-10', '2024-12-15', 1, 3, 1),
(17, 'Portal de Comercio Electrónico', 'Desarrollo de un e-commerce para ventas en línea', '2024-07-05', '2024-11-20', 2, 1, 3),
(18, 'Aplicación de Reservas Hoteleras', 'Sistema de reservas para hoteles y hospedajes', '2024-08-10', '2025-02-10', 1, 7, 2),
(19, 'Plataforma de Elearning', 'Sistema de educación a distancia para instituciones', '2024-06-01', '2024-11-01', 2, 4, 4),
(20, 'CRM para Pymes', 'Sistema de gestión de relaciones con clientes', '2024-03-15', '2024-09-15', 1, 2, 2),
(21, 'Gestión de Inventarios', 'Aplicación para gestionar inventarios y stock', '2024-02-20', '2024-08-20', 2, 6, 1),
(22, 'Sistema de Facturación Electrónica', 'Aplicación para emisión de facturas electrónicas', '2024-04-01', '2024-10-01', 1, 9, 3),
(23, 'Sistema de Turnos Médicos', 'Aplicación para gestionar citas médicas en hospitales', '2024-05-01', '2024-11-01', 2, 8, 2),
(24, 'Portal de Noticias', 'Desarrollo de un sitio web de noticias', '2024-06-10', '2024-12-25', 1, 4, 1),
(25, 'Aplicación de Fitness', 'Desarrollo de una app para seguimiento de rutinas de ejercicio', '2024-07-20', '2024-12-20', 2, 10, 4),
(26, 'Marketplace de Servicios', 'Plataforma para ofrecer y contratar servicios', '2024-08-01', '2025-01-15', 1, 5, 3),
(27, 'Sistema de Gestión de Pedidos', 'Aplicación para gestionar pedidos en línea', '2024-04-20', '2024-09-20', 2, 3, 2),
(28, 'Aplicación de Gestión de Finanzas Personales', 'App para control y planificación de finanzas personales', '2024-03-01', '2024-08-01', 1, 1, 1),
(29, 'Portal de Encuestas', 'Desarrollo de una plataforma para encuestas en línea', '2024-05-25', '2024-10-25', 2, 7, 4),
(30, 'Plataforma de Gestión de Eventos', 'Sistema para la planificación y gestión de eventos', '2024-06-15', '2024-12-01', 1, 9, 2),
(31, 'Aplicación de Telemedicina', 'Plataforma para consultas médicas a distancia', '2024-04-10', '2024-11-10', 2, 6, 3),
(32, 'Sistema de Gestión Documental', 'Aplicación para gestión de documentos en empresas', '2024-07-01', '2024-12-15', 1, 2, 4),
(33, 'Aplicación de Gestión de Recursos Humanos', 'Sistema para gestionar empleados y nóminas', '2024-02-10', '2024-07-10', 2, 10, 2),
(34, 'Portal de Freelancers', 'Plataforma para ofrecer servicios como freelance', '2024-03-05', '2024-09-05', 1, 5, 3),
(35, 'Sistema de Ventas con Pagos en Línea', 'Desarrollo de un sistema de ventas con integraciones de pagos en línea', '2024-06-01', '2024-12-01', 2, 8, 1),
(36, 'Aplicación de Gestión de Propiedades', 'Plataforma para la gestión de alquileres y propiedades', '2024-07-15', '2025-01-15', 1, 3, 4),
(37, 'Aplicación de Logística de Envíos', 'Sistema de gestión de envíos y rastreo de productos', '2024-05-01', '2024-11-01', 2, 9, 2),
(38, 'Desarrollo de Portal de Turismo', 'Plataforma para reservar actividades turísticas', '2024-03-25', '2024-08-25', 1, 1, 3),
(39, 'Sistema de Gestión de Proyectos Colaborativos', 'Aplicación para la gestión de proyectos en equipo', '2024-04-10', '2024-10-10', 2, 7, 1),
(40, 'Portal de Trabajo Remoto', 'Plataforma para gestionar trabajos a distancia', '2024-06-05', '2024-12-05', 1, 5, 2),
(41, 'Aplicación de Recaudación de Fondos', 'Sistema para campañas de recaudación de fondos', '2024-07-25', '2025-01-25', 2, 2, 4),
(42, 'Plataforma de Gestión de Redes Sociales', 'Aplicación para gestionar múltiples cuentas de redes sociales', '2024-05-15', '2024-11-15', 1, 6, 3),
(43, 'Sistema de Gestión de Bibliotecas', 'Aplicación para la gestión de préstamos en bibliotecas', '2024-02-01', '2024-08-01', 2, 4, 2),
(44, 'Aplicación de Gestión de Reservas de Restaurantes', 'Sistema para gestionar reservas de mesas en restaurantes', '2024-03-20', '2024-09-20', 1, 8, 1),
(45, 'Plataforma de Gestión de Pagos', 'Sistema para gestionar pagos recurrentes en empresas', '2024-06-10', '2024-12-10', 2, 9, 2),
(46, 'Desarrollo de un Chatbot Inteligente', 'Aplicación para un asistente virtual basado en IA', '2024-08-05', '2025-02-05', 1, 3, 3),
(47, 'Aplicación de Gestión de Compras en Grupo', 'Plataforma para compras en grupo con descuentos', '2024-05-30', '2024-11-30', 2, 1, 4),
(48, 'Sistema de Control de Calidad', 'Aplicación para gestión de control de calidad en empresas', '2024-02-15', '2024-08-15', 1, 7, 2),
(49, 'Portal de Subastas en Línea', 'Plataforma para organizar subastas en línea', '2024-04-05', '2024-10-05', 2, 5, 3),
(50, 'Sistema de Gestión de Transporte Público', 'Aplicación para gestionar rutas y horarios de transporte público', '2024-07-01', '2025-01-01', 1, 10, 1),
(51, 'Plataforma de Gestión de Incidentes', 'Sistema para el reporte y seguimiento de incidentes', '2024-06-20', '2024-12-20', 2, 4, 2),
(52, 'Desarrollo de un Sistema de Encuestas de Satisfacción', 'Plataforma para medir la satisfacción del cliente', '2024-03-15', '2024-09-15', 1, 6, 4),
(53, 'Sistema de Gestión de Auditorías', 'Aplicación para la gestión y seguimiento de auditorías', '2024-05-10', '2024-11-10', 2, 8, 2),
(54, 'Aplicación de Gestión de Clases Virtuales', 'Plataforma para organizar y gestionar clases virtuales', '2024-04-25', '2024-10-25', 1, 10, 3),
(55, 'Sistema de Registro de Asistencia', 'Aplicación para el registro de asistencia de empleados', '2024-07-20', '2025-01-20', 2, 2, 1),
(56, 'Desarrollo de un Portal de Donaciones', 'Plataforma para la recaudación de donaciones en línea', '2024-03-10', '2024-09-10', 1, 9, 4),
(57, 'Sistema de Gestión de Almacenes', 'Aplicación para gestionar almacenes y bodegas', '2024-02-20', '2024-08-20', 2, 5, 2),
(58, 'Plataforma de Gestión de Contratos', 'Aplicación para la gestión de contratos en empresas', '2024-04-01', '2024-10-01', 1, 3, 3),
(59, 'Sistema de Gestión de Cuentas por Cobrar', 'Aplicación para la gestión de cuentas por cobrar', '2024-05-15', '2024-11-15', 2, 7, 2),
(60, 'Aplicación de Planificación de Viajes', 'Plataforma para la planificación de itinerarios de viajes', '2024-06-01', '2024-12-01', 1, 4, 1); 

-- Ejecutar esto tambien ya que hubo modificaciones
update Proyectos set cod_tiempo = 3 where cod_estado = 2;


-- Insertar datos en la tabla Empleados --------------------------------------------
insert into Empleados (cod_empleado, nom_empleado, ape_empleado, fecha_nacimiento, email_empleado, pass_hash, tel_empleado, direc_empleado, fecha_creacion, debaja, cod_rol, cod_departamento) values 
(1, 'Fernando', 'Jaime', '2002-09-11', 'admin@dashboard.com', '$2b$10$/90aDQHbtHt7SpSQwjGgI.UEkKpDQsniTRw1KViHJWSf.zF1.YQgy', '1234567892', 'Calle del admin 123', '2024-09-10', 0, 1, 7),
(2, 'Rodrigo', 'James', '2002-11-30', 'Emp02@dashboard.com', '$2b$12$mdS8FQtuqrU4XsFwoHWpbOH0k4SfKkH.bd4cu19BmkL5RBZR.HJvu', '5555555555', 'Calle del emp 02', '2024-10-08', 0, 2, 3),
(3, 'Carolina', 'Martínez', '1990-05-12', 'Emp03@dashboard.com', '$2b$12$UwJ7Y3OmAu9KvSFWndUxR.SRv6v.A4bGoMyVQlJeYejRzRd7LLx/m', '5555555556', 'Calle del emp 03', '2024-10-08', 0, 2, 1),
(4, 'Miguel', 'Fernández', '1985-08-20', 'Emp04@dashboard.com', '$2b$12$.ND8x6I8BBPv0Gx8.8Nm2esowAcJmJSA35qN/U6sRr.YmUfRGwfGm', '5555555557', 'Calle del emp 04', '2024-10-08', 0, 2, 2),
(5, 'Lucía', 'García', '1978-03-15', 'Emp05@dashboard.com', '$2b$12$hrVtsj5rL/r1a/LNTBodueXY9CTpR7tATljy8fb.02X3wWo0TdKtu', '5555555558', 'Calle del emp 05', '2024-10-08', 0, 2, 3),
(6, 'Javier', 'López', '1992-09-25', 'Emp06@dashboard.com', '$2b$12$pYl.kviTsii9J358gpHEIeHvrlJQ7W.qIpiMoHcsEN6EyqW0hEf0e', '5555555559', 'Calle del emp 06', '2024-10-08', 0, 2, 4),
(7, 'Ana', 'Torres', '1988-12-10', 'Emp07@dashboard.com', '$2b$12$4NoF0Mf.DmDrfdbTC66PN.sR3cSVYUQOMOll41V/7y796daG.0e.y', '5555555560', 'Calle del emp 07', '2024-10-17', 1, 2, 1),
(8, 'Pablo', 'González', '1980-06-05', 'Emp08@dashboard.com', '$2b$12$HClVqS1AgB3dTM940kBLFOl1ROF7/5Q.6KezraFkMLMTFG//m1HLO', '5555555561', 'Calle del emp 08', '2024-10-19', 0, 2, 2),
(9, 'Laura', 'Hernández', '1995-02-17', 'Emp09@dashboard.com', '$2b$12$qtgVec04Ai1X3Sm2rpmBpei/ptUwawao08XmM.H7olBC/tOYNSw.2', '5555555562', 'Calle del emp 09', '2024-10-19', 0, 2, 3),
(10, 'Sergio', 'Ramírez', '1998-11-22', 'Emp10@dashboard.com', '$2b$12$PAJlz/VLvkOU40Qqlv0GG.yAHZKrGz6yOfFI1orsbxLS5uc//l8g6', '5555555563', 'Calle del emp 10', '2024-10-19', 0, 2, 4),
(11, 'Patricia', 'Vargas', '1982-04-30', 'Emp11@dashboard.com', '$2b$12$zI/qkohypkf5NFXTW6brQeC55MMwVerIRDiyB4tRuBMhntX1qLmHm', '5555555564', 'Calle del emp 11', '2024-10-19', 0, 2, 1),
(12, 'Diego', 'Morales', '1975-07-07', 'Emp12@dashboard.com', '$2b$12$Lh.p5fkRTpWYOtv019wTueOzYuJqLMX.fx5vvAPpHguiOZ0JVOzDi', '5555555565', 'Calle del emp 12', '2024-10-19', 0, 2, 2),
(13, 'Ana', 'González', '1980-01-12', 'Emp13@dashboard.com', '$2b$12$izDoEupfcYUwhstmiNYYVOxtgusJ2y2k.to9RekvJBtVGC0lee2iu', '5555555566', 'Calle del emp 13', '2024-10-19', 0, 2, 1),
(14, 'Juan', 'Pérez', '1990-05-23', 'Emp14@dashboard.com', '$2b$12$U2TVxiG9eDqiygF0.r87Q.fweYsLqUHg4RC.Jmfz3qMdzjA6ChtNO', '5555555567', 'Calle del emp 14', '2024-10-19', 1, 2, 2),
(15, 'Lucía', 'Martínez', '1985-09-14', 'Emp15@dashboard.com', '$2b$12$XXe8fvn/DonYALtgBcZLZeckvn5ecXTHIweRW1d8lU1k8.cqpEEbi', '5555555568', 'Calle del emp 15', '2024-10-19', 1, 2, 3),
(16, 'Carlos', 'Ramírez', '1978-11-02', 'Emp16@dashboard.com', '$2b$12$nXKliUeww78spHih.jkxEOcC.t9PQtq8OsHjT23xCPgrdWUkNPc2y', '5555555569', 'Calle del emp 16', '2024-10-19', 0, 2, 4),
(17, 'Marta', 'López', '1995-03-15', 'Emp17@dashboard.com', '$2b$12$UeUY4hPAEZJ7tp8w3sw50.tSPoWn.olT49oYD4DaaBlODAFKaUlGe', '5555555570', 'Calle del emp 17', '2024-10-19', 1, 2, 5),
(18, 'Luis', 'Hernández', '1983-08-07', 'Emp18@dashboard.com', '$2b$12$EMF9vrKo9zQIaBabP7WUtuQrEZAfM3lXaVr6qEjHtep9F40if9d/6', '5555555571', 'Calle del emp 18', '2024-10-19', 0, 2, 6),
(19, 'Sofía', 'Torres', '1992-12-29', 'Emp19@dashboard.com', '$2b$12$J3Bg65MrKXqiX69AZCixgeEgw0gj6sIjvikHj3KAl.K6byQR/91Tq', '5555555572', 'Calle del emp 19', '2024-10-19', 0, 2, 7),
(20, 'Pedro', 'Vargas', '1987-04-19', 'Emp20@dashboard.com', '$2b$12$Dje5fRJZcdS.ID.Ytidf2.I4Ow1rtBBhQqbCS/2J6lEXc384.7vRW', '5555555573', 'Calle del emp 20', '2024-10-19', 0, 2, 1),
(21, 'María', 'Flores', '1993-06-05', 'Emp21@dashboard.com', '$2b$12$RpgCrjS0IYmJVYq3qLq85u6Z8kJTWbAH0O5DXN3znAsQwNtjuEdtq', '5555555574', 'Calle del emp 21', '2024-10-19', 0, 2, 2),
(22, 'Pablo', 'Sánchez', '1976-10-22', 'Emp22@dashboard.com', '$2b$12$Ishfo6jCx/gRcuWrr9OjvenZjwU8CwCJCSeRMAISah4NVpHcb8HiW', '5555555575', 'Calle del emp 22', '2024-10-19', 1, 2, 3),
(23, 'Julia', 'Moreno', '1981-09-30', 'Emp23@dashboard.com', '$2b$12$R5NOLhWdijohtTOtIjEEFuL/tfvqs6yQ5dG.mMVKTK6YzEpqLA0d2', '5555555576', 'Calle del emp 23', '2024-10-19', 0, 2, 4),
(24, 'David', 'Ortiz', '1998-01-10', 'Emp24@dashboard.com', '$2b$12$.4rHqYrxrk.ZpOi4u4DRROsbRvxbcXmhb70.STwo6RUcSzrzdAbcm', '5555555577', 'Calle del emp 24', '2024-10-19', 0, 2, 5),
(25, 'Elena', 'Castro', '1989-11-25', 'Emp25@dashboard.com', '$2b$12$cwilPfra3PebTl0C7wUXzOvPC.Xqm1/n0gU30oIpQ2Rr1Ur2naPMG', '5555555578', 'Calle del emp 25', '2024-10-19', 0, 2, 6),
(26, 'Roberto', 'Méndez', '1977-02-16', 'Emp26@dashboard.com', '$2b$12$UL82MTyq8VY3lryH.aTMcOLfRq04rDpzFjbVPoQNRz.EmlC5GJzkG', '5555555579', 'Calle del emp 26', '2024-10-19', 0, 2, 7),
(27, 'Verónica', 'Silva', '1982-12-06', 'Emp27@dashboard.com', '$2b$12$KU1NEvA2MEvHRqUyWmT/gOuBv6PM2wnFHif72jqKBL./nsdEzsc4G', '5555555580', 'Calle del emp 27', '2024-10-19', 0, 2, 1),
(28, 'Fernando', 'Luna', '1984-03-24', 'Emp28@dashboard.com', '$2b$12$ikXh90DbETJ18mu9akadJeAK25tHFZ4t3EmucNVj9Om6ag8oy6.8S', '5555555581', 'Calle del emp 28', '2024-10-19', 0, 2, 2),
(29, 'Raquel', 'Ríos', '1979-07-12', 'Emp29@dashboard.com', '$2b$12$WLmGJenvmZpxOAeysLxE5ubQWW7JpU5vZAkpP3CWM3t3rNPvmNlRS', '5555555582', 'Calle del emp 29', '2024-10-19', 0, 2, 3),
(30, 'Guillermo', 'Mora', '1997-09-01', 'Emp30@dashboard.com', '$2b$12$xVku68C7sKiMIJCbzMCrZeWLOuUT4bQxYNtmOjblsIba3WzRMQ10W', '5555555583', 'Calle del emp 30', '2024-10-19', 0, 2, 4),
(31, 'Sandra', 'Reyes', '1986-08-21', 'Emp31@dashboard.com', '$2b$12$91KKKdSeiHXzd0KaL4JTku22qp9gNUfUfqynIOGXlitKSDo4Hpj6C', '5555555584', 'Calle del emp 31', '2024-10-19', 0, 2, 5),
(32, 'Rodrigo', 'Núñez', '1988-05-29', 'Emp32@dashboard.com', '$2b$12$ZE6bu/ocCdXW9nhbT5u7Ku/pqipyA5OO7zqfxp.gsocJ2G79yK4em', '5555555585', 'Calle del emp 32', '2024-10-19', 0, 2, 6),
(33, 'Paula', 'Romero', '1991-11-03', 'Emp33@dashboard.com', '$2b$12$Jm.tJ4nbnfGqzdG/0w.VQ.p8X8ODHtGkE7KzrQpRcGfkvAof8RJNi', '5555555586', 'Calle del emp 33', '2024-10-19', 1, 2, 7),
(34, 'Emilio', 'Delgado', '1975-02-09', 'Emp34@dashboard.com', '$2b$12$0XB4PE2SZEfOxQ3HavOBc.wI8mtP8SZ3mNfEOcdFoPlivd8WJXatK', '5555555587', 'Calle del emp 34', '2024-10-19', 0, 2, 1),
(35, 'Claudia', 'Ibarra', '1994-06-18', 'Emp35@dashboard.com', '$2b$12$dDdIJKEd0MHg7879GV3nfO4mTC/PKzhPmYQ5RF2V.9WS0Vt9wvTqy', '5555555588', 'Calle del emp 35', '2024-10-19', 0, 2, 2),
(36, 'Gabriel', 'Suárez', '1980-10-28', 'Emp36@dashboard.com', '$2b$12$pBIa3zvl.VLKgKLZ5WB9EerzfpDFDDQ/noeQahJUPjltnwQoxNVQm', '5555555589', 'Calle del emp 36', '2024-10-19', 0, 2, 3),
(37, 'Isabel', 'Cortés', '1985-09-25', 'Emp37@dashboard.com', '$2b$12$nGz637Duu3ZhCtIfQsGyIuC0/ZxBa8upT/ZZIb3/ygMltIphFEU.2', '5555555590', 'Calle del emp 37', '2024-10-19', 0, 2, 4),
(38, 'Adrián', 'Escobar', '1979-08-16', 'Emp38@dashboard.com', '$2b$12$WG0FEXn8TgLI3T3wpMVWPOV1g51MvdY5tuWKhp/vhWgAp6iWZWG/a', '5555555591', 'Calle del emp 38', '2024-10-19', 0, 2, 5),
(39, 'Patricia', 'Sosa', '1996-07-19', 'Emp39@dashboard.com', '$2b$12$Q5/bncDvMJ87XrYkkGa42.JxGyfPvDHYYY2ReDsyYjnpbztceBd06', '5555555592', 'Calle del emp 39', '2024-10-19', 0, 2, 6),
(40, 'Enrique', 'Ramos', '1982-04-02', 'Emp40@dashboard.com', '$2b$12$wvuUfGqkQPx4Xr6y3BYoKunR2oicw72y7.eTgUCL.IkGfzJUNoGMq', '5555555593', 'Calle del emp 40', '2024-10-19', 0, 2, 7),
(41, 'Valeria', 'Morales', '1990-01-12', 'Emp41@dashboard.com', '$2b$12$6jacOp.UPoqpGV6nu87AF.OYchLe4wB18y08Ii6zPqo.rkVjQfqwa', '5555555594', 'Calle del emp 41', '2024-10-19', 0, 2, 1),
(42, 'Sebastián', 'López', '1985-03-19', 'Emp42@dashboard.com', '$2b$12$wV.aMA9xTOyYiqDa3So9me64y4VPaIaPlg2f/xwJU7c89LAwfo6gC', '5555555595', 'Calle del emp 42', '2024-10-19', 0, 2, 2),
(43, 'Ana', 'Fernández', '1993-07-24', 'Emp43@dashboard.com', '$2b$12$OUXnAwExgKQVSir.ZpAuseOywL72NPJXiaZr0AtyhSBPqTg0zUYgO', '5555555596', 'Calle del emp 43', '2024-10-19', 0, 2, 3),
(44, 'Raúl', 'Martínez', '1982-09-14', 'Emp44@dashboard.com', '$2b$12$gKm4K/50McttVsf4xdNlS.8TIH4heWSnLoet/zT79CiBVxQ5QHiOy', '5555555597', 'Calle del emp 44', '2024-10-19', 0, 2, 4),
(45, 'Lucía', 'Pérez', '1998-02-11', 'Emp45@dashboard.com', '$2b$12$vV7TCKeZqhag7T1mwXUtIO/OxZT3URITDCvBgt6Qlw7IDgZKeXuXi', '5555555598', 'Calle del emp 45', '2024-10-19', 0, 2, 5),
(46, 'Carlos', 'Giménez', '1987-11-29', 'Emp46@dashboard.com', '$2b$12$odMZlaFY6D6GwCp8gJJt0.9mWhzvAT8VUPSjEjMAxrBna/fzPJ5Cm', '5555555599', 'Calle del emp 46', '2024-10-19', 0, 2, 6),
(47, 'Marta', 'Vargas', '1995-05-05', 'Emp47@dashboard.com', '$2b$12$rDXZCNutLLOMYxmqG9jl1eURcoRMIgraAxQXS4DLXN5DftUX1zMwO', '5555555600', 'Calle del emp 47', '2024-10-19', 0, 2, 7),
(48, 'Felipe', 'Salazar', '1991-08-07', 'Emp48@dashboard.com', '$2b$12$m/ulylZO2y49by9J2QVQ6.kxlp0fkhd91eDCGNKw8Y0wWaWisbgqu', '5555555601', 'Calle del emp 48', '2024-10-19', 0, 2, 1),
(49, 'Verónica', 'Domínguez', '1980-04-25', 'Emp49@dashboard.com', '$2b$12$Ohs43WKCcG2.W.mA49FOP.NnyLkuM2qLanp2twFC8ckK7z9EpZdSa', '5555555602', 'Calle del emp 49', '2024-10-19', 0, 2, 2),
(50, 'Jorge', 'Mendoza', '1978-06-30', 'Emp50@dashboard.com', '$2b$12$ARQ71lA785vtBQVBntmxmepmOdgECMzLx7QgsL6HmxCFc6nL9bGF2', '5555555603', 'Calle del emp 50', '2024-10-19', 0, 2, 3),
(51, 'Clara', 'Navarro', '1989-12-13', 'Emp51@dashboard.com', '$2b$12$HUPtB2CRgc6MoJgAbn9TjeyGvOHd4cWy0V2OrepFREKZsOVuT0NFi', '5555555604', 'Calle del emp 51', '2024-10-19', 0, 2, 4),
(52, 'Juan', 'Ortega', '1975-10-21', 'Emp52@dashboard.com', '$2b$12$ih5FUK4Cn0aKq3HueEUucuJl24/UnakKEfhq17sTX6/c1iHtmDZ6C', '5555555605', 'Calle del emp 52', '2024-10-19', 0, 2, 5),
(53, 'Natalia', 'Rivas', '1983-09-30', 'Emp53@dashboard.com', '$2b$12$h6Hvz5kdi5oXBPWH5g2L/.Zj434c7BkdpPvJh9TuOhaFxRVhJq5.W', '5555555606', 'Calle del emp 53', '2024-10-19', 0, 2, 6),
(54, 'Hugo', 'Serrano', '1992-03-17', 'Emp54@dashboard.com', '$2b$12$C.BLd/uunygyu2GAKj3icOrY0IOCHsTeNNWHeODK0tO/uUKYK2U8O', '5555555607', 'Calle del emp 54', '2024-10-19', 0, 2, 7),
(55, 'María', 'Reyes', '1986-11-06', 'Emp55@dashboard.com', '$2b$12$NvY.0iAT9ggREgHwzukeCeCIR5pRiFCss8d.ZhqGPnolXjSXioCj2', '5555555608', 'Calle del emp 55', '2024-10-19', 1, 2, 1),
(56, 'David', 'Silva', '1981-07-22', 'Emp56@dashboard.com', '$2b$12$ZOdZV8zrfGcYAM5qFuXFfuZXHfJrC9.QGQc8ja.3B/p6/hZAC6Vqy', '5555555609', 'Calle del emp 56', '2024-10-19', 0, 2, 2),
(57, 'Daniela', 'Castro', '1999-01-04', 'Emp57@dashboard.com', '$2b$12$vYOhZCW5yWNeaIDoC0kAo.6yBkMGi8Cgv.EdyTRSt3bk/48hRgUYy', '5555555610', 'Calle del emp 57', '2024-10-19', 0, 2, 3),
(58, 'Alejandro', 'Guerrero', '1994-09-09', 'Emp58@dashboard.com', '$2b$12$b4iCzBvdeB3HOVt4ZNWzZeUR8T6v/dD5Z97QlJTJg8GBkzaJZQcYa', '5555555611', 'Calle del emp 58', '2024-10-19', 1, 2, 4),
(59, 'Sofía', 'Vega', '1984-05-14', 'Emp59@dashboard.com', '$2b$12$CW43y06yM0.S0uZGgezqKuIzaxF6IwlVz3Z.BBVxZhpa3JzfVIpIe', '5555555612', 'Calle del emp 59', '2024-10-19', 0, 2, 5),
(60, 'Federico', 'Romero', '1976-12-01', 'Emp60@dashboard.com', '$2b$12$Su1tdS3SrGiNxiRwladh1e68..S25I9Kpr3YdywEQfas.A54LriTG', '5555555613', 'Calle del emp 60', '2024-10-19', 1, 2, 6);
