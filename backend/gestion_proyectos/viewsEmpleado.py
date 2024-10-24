from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework import status
from .serializer import EmpleadosSerializer
import bcrypt

from .models import Empleado, Departamento
from .decorators import token_required, token_required_admin # Importo el decorador de validacion de token

# Obtener todos los empleados
@api_view(['GET'])
# @token_required
def get_empleados(request):
    try:
        empleados = Empleado.objects.all() # Obtener todos los empleados

        # Agarro todos los empleados y los serializo como hice en serializer.py
        serializer = EmpleadosSerializer(empleados, many = True) # El many en true para indiar que tengo varios empleados

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Obtener un empleado por su id
@api_view(['GET'])
# @token_required
def get_empleado(request, id):
    try:
        empleado = Empleado.objects.get(cod_empleado = id)

        # serializer = EmpleadosSerializer(empleado)  # Serializo el empleado
        # return Response(serializer.data, status=status.HTTP_200_OK)

        response = Response({
            'cod_empleado': empleado.cod_empleado,
            'nom_empleado': empleado.nom_empleado,
            'ape_empleado': empleado.ape_empleado,
            'fecha_nacimiento': empleado.fecha_nacimiento,
            'email_empleado': empleado.email_empleado,
            'tel_empleado': empleado.tel_empleado,
            'direc_empleado': empleado.direc_empleado,
            'fecha_creacion': empleado.fecha_creacion,
            'cod_departamento': empleado.cod_departamento.nom_departamento
        })
        
        return response
    
    except Empleado.DoesNotExist:
        return Response({'error': "Empleado no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Metodo para generar empleados e encriptar la contraseña (No se usaria en el front)
@api_view(['POST'])
def crear_empleado(request):
    
    # Datos que debería recibir
    data = request.data
    cod_empleado = data.get('cod_empleado')
    nom_empleado = data.get('nom_empleado')
    ape_empleado = data.get('ape_empleado')
    fecha_nacimiento = data.get('fecha_nacimiento')
    email_empleado = data.get('email_empleado')
    pass_hash = data.get('pass_hash')
    tel_empleado = data.get('tel_empleado')
    direc_empleado = data.get('direc_empleado')
    cod_departamento = data.get('cod_departamento')

    try:
        # Validaciones
        if Empleado.objects.filter(cod_empleado=cod_empleado).exists():
            return Response({'error': "Código del empleado en uso"}, status=status.HTTP_400_BAD_REQUEST)

        if Empleado.objects.filter(email_empleado=email_empleado).exists():
            return Response({'error': "Email en uso"}, status=status.HTTP_400_BAD_REQUEST)

        # Hasheo la contraseña
        passhash = bcrypt.hashpw(pass_hash.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Crear nuevo empleado
        empleado = Empleado.objects.create(
            cod_empleado = cod_empleado,
            nom_empleado = nom_empleado,
            ape_empleado = ape_empleado,
            fecha_nacimiento = fecha_nacimiento,
            email_empleado = email_empleado,
            pass_hash = passhash,
            tel_empleado = tel_empleado,
            direc_empleado = direc_empleado,
            fecha_creacion = datetime.now(),
            debaja = False,
            cod_rol_id = 2, # Rol de empleado
            cod_departamento_id = cod_departamento
        )

        empleado_data = {
            'cod_empleado': empleado.cod_empleado,
            'nom_empleado': empleado.nom_empleado,
            'ape_empleado': empleado.ape_empleado,
            'fecha_nacimiento': empleado.fecha_nacimiento,
            'email_empleado': empleado.email_empleado,
            'tel_empleado': empleado.tel_empleado,
            'direc_empleado': empleado.direc_empleado,
            'cod_departamento': empleado.cod_departamento.cod_departamento
        }

        return Response(empleado_data, status=status.HTTP_201_CREATED)
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Obtener todos los empleados de un departamento
@api_view(['GET'])
# @token_required
def get_empleados_departamento(request, id):
    try:
        empleados = Empleado.objects.filter(cod_departamento = id)

        response = Response([
            {
                'cod_empleado': empleado.cod_empleado,
                'nom_empleado': empleado.nom_empleado,
                'ape_empleado': empleado.ape_empleado,
                'fecha_nacimiento': empleado.fecha_nacimiento,
                'email_empleado': empleado.email_empleado,
                'tel_empleado': empleado.tel_empleado,
                'direc_empleado': empleado.direc_empleado,
                'fecha_creacion': empleado.fecha_creacion,
                'nom_departamento': empleado.cod_departamento.nom_departamento,
                'cod_departamento': empleado.cod_departamento.cod_departamento 
            }
            for empleado in empleados
        ])
        
        return response
    
    except Exception as error:
        return Response({'message': "Algo anduvo mal!", 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)