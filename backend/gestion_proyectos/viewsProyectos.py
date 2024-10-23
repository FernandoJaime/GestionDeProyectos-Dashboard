from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Proyecto, Tarea, Tiempo

# Obtener todos los proyectos 
@api_view(['GET'])
# @token_required
def get_proyectos(request):
    try:
        # Obtener la fecha actual (solo la fecha sin la hora)
        fecha_actual = datetime.now().date()

        # Todos los proyectos ordenados por fecha_entrega la mas cercana al dia de hoy
        proyectos = Proyecto.objects.all().order_by('fecha_entrega')

        # Obtener la instancia de "Atrasado" en el modelo Tiempo (cod_tiempo = 2)
        tiempo_atrasado = Tiempo.objects.get(cod_tiempo = 2)
        tiempo_entregado = Tiempo.objects.get(cod_tiempo = 3)
        tiempo_atiempo = Tiempo.objects.get(cod_tiempo = 1)

        for proyecto in proyectos:
            # Si el proyecto tiene una fecha de entrega menor a la fecha actual y su cod_estado es 2 "Completado", lo modifico a cod_tiempo = 3 "Entregado"
            if proyecto.fecha_entrega < fecha_actual and proyecto.cod_estado.cod_estado == 2:
                proyecto.cod_tiempo = tiempo_entregado
                proyecto.save()
            
            # Si el proyecto tiene una fecha de entrega menor a la fecha actual y su cod_estado es distinto de 2 "Completado", lo modifico a cod_tiempo = 2 "Atrasado"
            elif proyecto.fecha_entrega < fecha_actual and proyecto.cod_estado.cod_estado != 2:
                proyecto.cod_tiempo = tiempo_atrasado
                proyecto.save()
            
            # Si el proyecto tiene una fecha de entrega mayor a la fecha actual y su cod_estado no es 4 "Cancelado", lo modifico a cod_tiempo = 1 "A tiempo"
            elif proyecto.fecha_entrega > fecha_actual and proyecto.cod_estado.cod_estado != 4:
                proyecto.cod_tiempo = tiempo_atiempo
                proyecto.save()

            # Si el proyecto tiene una fecha de entrega mayor a la fecha actual y su cod_estado es 4 "Cancelado", lo modifico a cod_tiempo = 2 "Atrasado"
            elif proyecto.fecha_entrega > fecha_actual and proyecto.cod_estado.cod_estado == 4:
                proyecto.cod_tiempo = tiempo_atrasado
                proyecto.save()

        lista_proyectos = Response ([
            {
                "cod_proyecto" : proyecto.cod_proyecto,
                "nom_proyecto" : proyecto.nom_proyecto,
                "desc_proyecto" : proyecto.desc_proyecto,
                "fecha_inicio" : proyecto.fecha_inicio,
                "fecha_entrega" : proyecto.fecha_entrega,
                "cod_tiempo" : proyecto.cod_tiempo.desc_tiempo,
                "cod_cliente" : proyecto.cod_cliente.email_cliente,
                "cod_estado" : proyecto.cod_estado.desc_estado,
                
                # Calcular la ganancia sumando el costo de todas las tareas asociadas al proyecto
                "ganancia": sum(tarea.costo_tarea for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)),
            }
            for proyecto in proyectos
        ])
        
        return lista_proyectos
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
# Obtener todos los proyectos que tienen estado 1 'En Proceso'
@api_view(['GET'])
# @token_required
def get_proyectos_enproceso(request):
    try:
        proyectos = Proyecto.objects.filter(cod_estado = 1) # Obtener todos los proyectos con estado 'En Proceso'

        # Obtengo todas las tareas de cada proyecto para calcular la ganancia
        tareas = Tarea.objects.all()

        # Crear una lista de diccionarios con la información de los proyectos que quiero en el front
        lista_proyectos = Response ([
            {
                "cod_proyecto" : proyecto.cod_proyecto,
                "nom_proyecto" : proyecto.nom_proyecto,
                "desc_proyecto" : proyecto.desc_proyecto,
                "fecha_entrega" : proyecto.fecha_entrega,
                "cod_tiempo" : proyecto.cod_tiempo.desc_tiempo,
                "cod_cliente" : proyecto.cod_cliente.email_cliente,
                "cod_estado" : proyecto.cod_estado.desc_estado,
                
                # Calcular la ganancia sumando el costo de todas las tareas asociadas al proyecto
                "ganancia": sum(tarea.costo_tarea for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)),
            }
            for proyecto in proyectos
        ])
        
        return lista_proyectos
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Obtener cantidad de proyectos completados (2), en proceso (1), pendiente (3), cancelados (4) y su ganacia
@api_view(['GET'])
# @token_required
def get_proyectos_estados_ganancia(request):
    try:
        proyectos_enproceso = Proyecto.objects.filter(cod_estado = 1)
        proyectos_completados = Proyecto.objects.filter(cod_estado = 2)
        proyectos_pendientes = Proyecto.objects.filter(cod_estado = 3)
        proyectos_cancelados = Proyecto.objects.filter(cod_estado = 4)
        
        # Calcular la ganancia por estado de proyectos
        ganancia_enproceso = sum(tarea.costo_tarea for proyecto in proyectos_enproceso for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)) or 0
        ganancia_completados = sum(tarea.costo_tarea for proyecto in proyectos_completados for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)) or 0
        ganancia_pendientes = sum(tarea.costo_tarea for proyecto in proyectos_pendientes for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)) or 0
        ganancia_cancelados = sum(tarea.costo_tarea for proyecto in proyectos_cancelados for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)) or 0

        # Preparar respuesta con los datos necesarios para el gráfico
        lista_proyectos = Response ([
            {"estado": "En Proceso", "cantidad": proyectos_enproceso.count(), "ganancia": ganancia_enproceso},
            {"estado": "Completado", "cantidad": proyectos_completados.count(), "ganancia": ganancia_completados},
            {"estado": "Pendiente", "cantidad": proyectos_pendientes.count(), "ganancia": ganancia_pendientes},
            {"estado": "Cancelado", "cantidad": proyectos_cancelados.count(), "ganancia": - ganancia_cancelados}
        ])
        
        return lista_proyectos
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Obtener por mes que cantidad de proyectos se inicio
@api_view(['GET'])
# @token_required
def get_proyecto_iniciados(request):
    try:
        # Obtener todos los proyectos menos los cancelados
        proyectos = Proyecto.objects.exclude(cod_estado = 4)

        # Obtener el año actual
        current_year = datetime.now().year

        # Separo los proyectos por mes de fecha_inicio
        proyectos_enero = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=1)
        proyectos_febrero = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=2)
        proyectos_marzo = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=3)
        proyectos_abril = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=4)
        proyectos_mayo = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=5)
        proyectos_junio = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=6)
        proyectos_julio = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=7)
        proyectos_agosto = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=8)
        proyectos_septiembre = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=9)
        proyectos_octubre = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=10)
        proyectos_noviembre = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=11)
        proyectos_diciembre = proyectos.filter(fecha_inicio__year=current_year, fecha_inicio__month=12)
        
        lista_proyectos = Response ([
            {"mes": "Ene", "cantidad": proyectos_enero.count()},
            {"mes": "Feb", "cantidad": proyectos_febrero.count()},
            {"mes": "Mar", "cantidad": proyectos_marzo.count()},
            {"mes": "Abr", "cantidad": proyectos_abril.count()},
            {"mes": "May", "cantidad": proyectos_mayo.count()},
            {"mes": "Jun", "cantidad": proyectos_junio.count()},
            {"mes": "Jul", "cantidad": proyectos_julio.count()},
            {"mes": "Ago", "cantidad": proyectos_agosto.count()},
            {"mes": "Sep", "cantidad": proyectos_septiembre.count()},
            {"mes": "Oct", "cantidad": proyectos_octubre.count()},
            {"mes": "Nov", "cantidad": proyectos_noviembre.count()},
            {"mes": "Dic", "cantidad": proyectos_diciembre.count()}
        ])
        
        return lista_proyectos
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
# @token_required
def get_proyecto_terminados_ganancia(request):
    try:
        # Obtener todos los proyectos menos los cancelados
        proyectos = Proyecto.objects.filter(cod_estado = 2) # Obtener todos los proyectos con estado 'Completado'
        
        proyectos_entregados = [] 
        # Si el proyecto tiene estado "Completado" y fecha_entrega > a la fecha actual, lo modifico a cod_tiempo = 3 "Entregado" y lo agrego a la lista
        for proyecto in proyectos:
            if proyecto.fecha_entrega > datetime.now():
                proyecto.cod_tiempo = 3
                proyecto.save() # Guardo el cambio en la base de datos
                
                # Agrego el proyecto a la nueva lista
                proyectos_entregados.append(proyecto)

        lista_proyectos = Response ([
            {
                "mes_entrega" : proyecto.fecha_entrega.strftime("%B"), # Obtener el mes de la fecha de entrega
                # Calcular la ganancia sumando el costo de todas las tareas asociadas al proyecto
                "ganancia": sum(tarea.costo_tarea for tarea in Tarea.objects.filter(cod_proyecto=proyecto.cod_proyecto)),
            }
            for proyecto in proyectos_entregados
        ])
        
        return lista_proyectos
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)