SELECT * FROM db_dashboard.empleados;
SELECT * FROM db_dashboard.roles;
-- call sp_Eliminar_Empleado(1);
delete from Empleados where cod_empleado = 1;

use db_dashboard
update Empleados set debaja = 1 where cod_empleado = 7
update Roles set nom_rol = 'Empleado' where cod_rol = 2
update Proyectos set cod_tiempo = 3 where cod_estado = 2
update Empleados set fecha_nacimiento = '2002-11-30' where cod_empleado = 2

select * from Tareas where cod_proyecto = 1