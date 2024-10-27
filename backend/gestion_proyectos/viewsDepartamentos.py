from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Departamento, Tarea, Proyecto

@api_view(['GET'])
def get_departamentos_full(request):
    try:
        departamentos = Departamento.objects.all()  # Obtengo todos los departamentos
        data = []

        for departamento in departamentos:
            tareas = Tarea.objects.filter(cod_departamento=departamento)
            proyectos_dict = {}

            for tarea in tareas:
                proyecto = tarea.cod_proyecto # En Django, cuando tienes una clave foránea, puedes acceder directamente a la instancia del modelo relacionado a través de esa clave.
                if proyecto.cod_proyecto not in proyectos_dict:
                    proyectos_dict[proyecto.cod_proyecto] = {
                        'cod_proyecto': proyecto.cod_proyecto,
                        'nom_proyecto': proyecto.nom_proyecto,
                        'desc_proyecto': proyecto.desc_proyecto,
                        'fecha_inicio': proyecto.fecha_inicio,
                        'fecha_entrega': proyecto.fecha_entrega,
                        'tareas': []
                    }
                if proyecto.cod_proyecto in proyectos_dict:
                    proyectos_dict[proyecto.cod_proyecto]['tareas'].append({
                        'cod_tarea': tarea.cod_tarea,
                        'nom_tarea': tarea.nom_tarea,
                        'desc_tarea': tarea.desc_tarea,
                        'costo_tarea': tarea.costo_tarea,
                        'duracion_tarea': tarea.duracion_tarea,
                    })

            proyectos_list = list(proyectos_dict.values())
            data.append({
                'cod_departamento': departamento.cod_departamento,
                'nom_departamento': departamento.nom_departamento,
                'proyectos': proyectos_list
            })

        return Response(data, status=status.HTTP_200_OK)

    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

