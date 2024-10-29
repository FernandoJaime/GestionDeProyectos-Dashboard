from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Cliente, Proyecto
from django.db.models import Count

# Obtener los 5 clientes con mas proyectos
@api_view(['GET'])
# @token_required
def get_clientes_principales(request):
    try:
        # Contar la cantidad de proyectos por cliente, ordenarlos de mayor a menor, y limitar a los 5 principales
        clientes = Cliente.objects.annotate(num_proyectos=Count('proyecto')).order_by('-num_proyectos')[:5]

        lista_clientes = Response ([
            {
                "cod_cliente": cliente.cod_cliente,
                "nom_cliente": cliente.nom_cliente,
                "email_cliente": cliente.email_cliente,
                "tel_cliente": cliente.tel_cliente,
                "direc_cliente": cliente.direc_cliente,
                "cantidad_proyectos": cliente.num_proyectos
            }
            for cliente in clientes
        ])
        
        return lista_clientes
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Traigo todos los clientes
@api_view(['GET'])
def get_clientes(request):
    try:
        clientes = Cliente.objects.all()

        if not clientes.exists():
            return Response({'message': "No hay clientes registrados!"}, status=status.HTTP_404_NOT_FOUND)
        
        lista_clientes = []
    
        for cliente in clientes:
            cliente_data = {
                "cod_cliente": cliente.cod_cliente,
                "nom_cliente": cliente.nom_cliente,
                "email_cliente": cliente.email_cliente,
                "tel_cliente": cliente.tel_cliente,
                "direc_cliente": cliente.direc_cliente
            }
            lista_clientes.append(cliente_data)
        return Response(lista_clientes)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Traigo los proyectos de un cliente
@api_view(['GET'])
def get_cliente_proyectos(request, id):
    try:
        cliente = Cliente.objects.filter(cod_cliente=id).values('cod_cliente').first()
        id_cliente = cliente['cod_cliente']

        proyectos = Proyecto.objects.filter(cod_cliente=id_cliente)

        print(proyectos)
        if not proyectos.exists():
            return Response({'message': "El cliente no tiene proyectos registrados!"}, status=status.HTTP_404_NOT_FOUND)
        
        lista_proyectos = []
    
        for proyecto in proyectos:
            proyecto_data = {
                "cod_cliente": proyecto.cod_cliente.cod_cliente,
                "cod_proyecto": proyecto.cod_proyecto,
                "nom_proyecto": proyecto.nom_proyecto,
                "desc_proyecto": proyecto.desc_proyecto,
                "fecha_inicio": proyecto.fecha_inicio,
                "fecha_entrega": proyecto.fecha_entrega,
                "estado": proyecto.cod_estado.desc_estado,
                "tiempo": proyecto.cod_tiempo.desc_tiempo
            }
            lista_proyectos.append(proyecto_data)
        return Response(lista_proyectos)
    
    except Cliente.DoesNotExist:
        return Response({'message': "El cliente no existe!"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)