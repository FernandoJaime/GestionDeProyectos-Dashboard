from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Departamento, Tarea, Proyecto, Empleado



@api_view(['GET'])
def get_departamentos_total(request):
    try:
        departamentos = Departamento.objects.all()
        data = []

        for departamento in departamentos:
            empleados_count = Empleado.objects.filter(cod_departamento=departamento).count()
            proyectos_count = Tarea.objects.filter(cod_departamento=departamento).values('cod_proyecto').distinct().count()

            data.append({
                'cod_departamento': departamento.cod_departamento,
                'nom_departamento': departamento.nom_departamento,
                'empleados_count': empleados_count,
                'proyectos_count': proyectos_count
            })

        return Response(data, status=status.HTTP_200_OK)

    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_departamentos_graficos(request):
    try:
        departamentos = Departamento.objects.all()
        radar_data = []  # Para el radar chart
        scatter_data = []  # Para el scatter chart

        for departamento in departamentos:
            tareas = Tarea.objects.filter(cod_departamento=departamento.cod_departamento)
            proyectos_ids = tareas.values_list('cod_proyecto', flat=True).distinct()
            proyectos = Proyecto.objects.filter(cod_proyecto__in=proyectos_ids)

            costo_total = sum(tarea.costo_tarea for tarea in tareas)
            duracion_total = sum(tarea.duracion_tarea for tarea in tareas)
            num_proyectos = proyectos.count() 
            num_tareas = tareas.count()

            # Datos para el radar chart
            radar_data.append({
                'departamento': departamento.nom_departamento,
                'costo_total': costo_total,
                'duracion_total': duracion_total,
                'num_proyectos': num_proyectos,
                'num_tareas': num_tareas
            })

            # Datos para el scatter chart (puntos en el plano X, Y)
            scatter_data.append({
                'departamento': departamento.nom_departamento,
                'x': costo_total,  # Eje X
                'y': duracion_total  # Eje Y
            })

        return Response({
            'radar_data': radar_data,
            'scatter_data': scatter_data
        }, status=status.HTTP_200_OK)

    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
