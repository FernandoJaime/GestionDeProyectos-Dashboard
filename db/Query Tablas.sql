-------------------------------------------- Creacion de tablas --------------------------------------------


-- Seleccionar la base de datos --------------------------------------------
use DB_Dashboard;


-- Crear tabla Roles --------------------------------------------
create table Roles (
    cod_rol int primary key,
    nom_rol varchar(50) unique not null
);


-- Crear tabla Departamentos --------------------------------------------
create table Departamentos (
	cod_departamento int primary key,
    nom_departamento varchar(80) not null
);


-- Crear tabla Empleados --------------------------------------------
create table Empleados (
    cod_empleado int primary key,
    nom_empleado varchar(50) not null,
    ape_empleado varchar(50) not null,
    fecha_nacimiento date not null,
    email_empleado varchar(80) unique not null,
    pass_hash varchar(250) not null,
    tel_empleado varchar(20) not null,
    direc_empleado varchar(100) not null,
    fecha_creacion date not null,
    debaja boolean not null,
    cod_rol int not null,
    cod_departamento int not null,
    foreign key (cod_rol) references Roles(cod_rol),
    foreign key (cod_departamento) references Departamentos(cod_departamento)
);


-- Crear tabla Clientes --------------------------------------------
create table Clientes (
	cod_cliente int primary key,
    nom_cliente varchar(50) not null,
    email_cliente varchar(100) unique not null,
    tel_cliente varchar(20) not null,
    direc_cliente varchar(100) not null
);


-- Crear tabla Estados --------------------------------------------
create table Estados (
	cod_estado int primary key, 
    desc_estado varchar(100) not null
);


-- Crear tabla Tiempos --------------------------------------------
create table Tiempos (
	cod_tiempo int primary key, 
    desc_tiempo varchar(100) not null
);


-- Crear tabla Proyectos --------------------------------------------
create table Proyectos (
	cod_proyecto int primary key, 
    nom_proyecto varchar(100) not null,
    desc_proyecto varchar(255),
    fecha_inicio date not null,
    fecha_entrega date not null,
    cod_tiempo int not null,
    cod_cliente int not null,
    cod_estado int not null, 
    foreign key (cod_tiempo) references Tiempos(cod_tiempo),
    foreign key (cod_cliente) references Clientes(cod_cliente),
	foreign key (cod_estado) references Estados(cod_estado)
);


-- Crear tabla Tareas --------------------------------------------
create table Tareas (
	cod_tarea int primary key,
    nom_tarea varchar(100) not null,
    desc_tarea varchar(255),
    costo_tarea decimal(10,2) not null,
    duracion_tarea int not null,
	cod_proyecto int not null,
    cod_departamento int not null, 
    cod_estado int not null, 
    foreign key (cod_proyecto) references Proyectos(cod_proyecto),
    foreign key (cod_departamento) references Departamentos(cod_departamento),
    foreign key (cod_estado) references Estados(cod_estado)
);