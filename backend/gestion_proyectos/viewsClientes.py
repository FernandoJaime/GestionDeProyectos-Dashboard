from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status

from .models import Cliente
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