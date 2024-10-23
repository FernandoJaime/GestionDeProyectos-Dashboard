from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Tarea, Empleado

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