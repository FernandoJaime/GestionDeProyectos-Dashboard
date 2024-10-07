SELECT * FROM db_dashboard.empleados;
SELECT * FROM db_dashboard.roles;
-- call sp_Eliminar_Empleado(1);
delete from Empleados where cod_empleado = 1;

use db_dashboard
update Empleados set debaja = 1 where cod_empleado = 3
update Roles set nom_rol = 'Empleado' where cod_rol = 2

call sp_ObtenerEmpleados()
call sp_Eliminar_Empleado(3)
call sp_ObtenerPorCod(3)
call sp_DealtaEmpleado(5)
call sp_Obtener_TareasDepartamento(2)