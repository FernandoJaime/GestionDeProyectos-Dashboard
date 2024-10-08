from django.db import models

########## Tabla Roles ##########

class Rol(models.Model):
    cod_rol = models.IntegerField(primary_key=True)
    nom_rol = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'Roles'

########## Tabla Departamentos ##########

class Departamento(models.Model):
    cod_departamento = models.IntegerField(primary_key=True)
    nom_departamento = models.CharField(max_length=80)

    class Meta:
        db_table = 'Departamentos'

########## Tabla Empleados ##########

class Empleado(models.Model):
    cod_empleado = models.IntegerField(primary_key=True)
    nom_empleado = models.CharField(max_length=50)
    ape_empleado = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField()
    email_empleado = models.EmailField(max_length=80, unique=True)
    pass_hash = models.CharField(max_length=250)
    tel_empleado = models.CharField(max_length=20)
    direc_empleado = models.CharField(max_length=100)
    fecha_creacion = models.DateField()
    debaja = models.BooleanField()
    cod_rol = models.ForeignKey(Rol, on_delete=models.CASCADE, db_column='cod_rol')
    cod_departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, db_column='cod_departamento')

    class Meta:
        db_table = 'Empleados'

########## Tabla Clientes ##########

class Cliente(models.Model):
    cod_cliente = models.IntegerField(primary_key=True)
    nom_cliente = models.CharField(max_length=50)
    email_cliente = models.EmailField(max_length=100, unique=True)
    tel_cliente = models.CharField(max_length=20)
    direc_cliente = models.CharField(max_length=100)

    class Meta:
        db_table = 'Clientes'

########## Tabla Estados ##########

class Estado(models.Model):
    cod_estado = models.IntegerField(primary_key=True)
    desc_estado = models.CharField(max_length=100)

    class Meta:
        db_table = 'Estados'

########## Tabla Tiempos ##########

class Tiempo(models.Model):
    cod_tiempo = models.IntegerField(primary_key=True)
    desc_tiempo = models.CharField(max_length=100)

    class Meta:
        db_table = 'Tiempos'

########## Tabla Proyectos ##########

class Proyecto(models.Model):
    cod_proyecto = models.IntegerField(primary_key=True)
    nom_proyecto = models.CharField(max_length=100)
    desc_proyecto = models.TextField(null=True, blank=True)
    fecha_inicio = models.DateField()
    fecha_entrega = models.DateField()
    cod_tiempo = models.ForeignKey(Tiempo, on_delete=models.CASCADE, db_column='cod_tiempo')
    cod_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='cod_cliente')
    cod_estado = models.ForeignKey(Estado, on_delete=models.CASCADE, db_column='cod_estado')

    class Meta:
        db_table = 'Proyectos'

########## Tabla Tareas ##########

class Tarea(models.Model):
    cod_tarea = models.IntegerField(primary_key=True)
    nom_tarea = models.CharField(max_length=100)
    desc_tarea = models.TextField(null=True, blank=True)
    costo_tarea = models.DecimalField(max_digits=10, decimal_places=2)
    duracion_tarea = models.IntegerField()
    cod_proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, db_column='cod_proyecto')
    cod_departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, db_column='cod_departamento')
    cod_estado = models.ForeignKey(Estado, on_delete=models.CASCADE, db_column='cod_estado')

    class Meta:
        db_table = 'Tareas'