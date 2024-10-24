from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Tarea, Empleado, Proyecto

# Obtener las tareas de un empleado
@api_view(['GET'])
# @token_required
def get_tareas_emp(request, id):
    try:
        empleado = Empleado.objects.get(cod_empleado = id)
        
        # Obtengo todas las tareas del departamento del empleado
        tareas = Tarea.objects.filter(cod_departamento = empleado.cod_departamento)

        # Crear una lista de diccionarios con la información de las tareas
        lista_tareas = Response ([
            {
                "cod_tarea": tarea.cod_tarea,
                "nom_tarea": tarea.nom_tarea,
                "desc_tarea": tarea.desc_tarea,
                "costo_tarea": tarea.costo_tarea,
                "duracion_tarea": tarea.duracion_tarea,
                "cod_proyecto": tarea.cod_proyecto.nom_proyecto,
                "cod_departamento": tarea.cod_departamento.nom_departamento,
                "cod_estado": tarea.cod_estado.desc_estado,
            }
            for tarea in tareas
        ])
        
        return lista_tareas
    
    except Empleado.DoesNotExist:
        return Response({'error': "Empleado no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Obtener las tareas de un proyecto
@api_view(['GET'])
# @token_required
def get_tareas_proyecto(request, id):
    try:
        proyecto = Proyecto.objects.get(cod_proyecto = id)
    
        tareas = Tarea.objects.filter(cod_proyecto = proyecto.cod_proyecto)

        lista_tareas = Response ([
            {
                "cod_tarea": tarea.cod_tarea,
                "nom_tarea": tarea.nom_tarea,
                "desc_tarea": tarea.desc_tarea,
                "costo_tarea": tarea.costo_tarea,
                "duracion_tarea": tarea.duracion_tarea,
                "cod_proyecto": tarea.cod_proyecto.nom_proyecto,
                "nom_departamento": tarea.cod_departamento.nom_departamento,
                "cod_estado": tarea.cod_estado.desc_estado,
                "cod_departamento": tarea.cod_departamento.cod_departamento
            }
            for tarea in tareas
        ])
        
        return lista_tareas
    
    except Proyecto.DoesNotExist:
        return Response({'error': "Proyecto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Obtener el % de las tareas por estado
@api_view(['GET'])
# @token_required
def get_tareas_porcentaje_estados(request, id):
    try:

        # Total tareas del proyecto
        total_tareas = Tarea.objects.filter(cod_proyecto = id).count()

        # Cantidad de proyectos por estado
        tareas_enproceso = Tarea.objects.filter(cod_proyecto = id, cod_estado = 1).count()
        tareas_completadas = Tarea.objects.filter(cod_proyecto = id, cod_estado = 2).count()
        tareas_pendientes = Tarea.objects.filter(cod_proyecto = id, cod_estado = 3).count()
        tareas_canceladas = Tarea.objects.filter(cod_proyecto = id, cod_estado = 4).count()
        
        porcentaje_enproceso = (tareas_enproceso / total_tareas) * 100
        porcentaje_completados = (tareas_completadas / total_tareas) * 100
        porcentaje_pendiente = (tareas_pendientes / total_tareas) * 100
        porcentaje_cancelado = (tareas_canceladas / total_tareas) * 100

        return Response ([
            {"name": "En proceso", "value": porcentaje_enproceso.__round__(0)},
            {"name": "Completado", "value": porcentaje_completados.__round__(0)},
            {"name": "Pendiente", "value": porcentaje_pendiente.__round__(0)},
            {"name": "Cancelado", "value": porcentaje_cancelado.__round__(0)} 
        ])
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    