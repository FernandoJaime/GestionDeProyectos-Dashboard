from rest_framework.response import Response
from rest_framework.decorators import api_view # Para poder usar el decorador @api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from .serializer import LoginSerializer
import bcrypt

from .models import Empleado

# Login - auntenticación y devolución de token JWT
@api_view(['POST'])
def login(request):
    print(request.data)
    serializer = LoginSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        email_empleado = serializer.validated_data['email_empleado']
        pass_hash = serializer.validated_data['pass_hash']
        try:
            print(email_empleado)
            empleado = Empleado.objects.get(email_empleado=email_empleado)

            if empleado.debaja:
                return Response({'error': 'El empleado está de baja'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Verificacion de contraseña
            if not bcrypt.checkpw(pass_hash.encode('utf-8'), empleado.pass_hash.encode('utf-8')):
                return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Genero el token JWT
            refresh = RefreshToken.for_user(empleado)

            # Datos de perfil del empleado
            refresh['cod_empleado'] = empleado.cod_empleado
            refresh['email_empleado'] = empleado.email_empleado
            refresh['rol'] = empleado.cod_rol.nom_rol
            
            # Crea la respuesta
            response = Response({
                'success': True,
                'cod_empleado': empleado.cod_empleado,
                'nom_empleado': empleado.nom_empleado,
                'ape_empleado': empleado.ape_empleado,
                'email_empleado': empleado.email_empleado,
            })

            # Establece el token en una cookie
            response.set_cookie('access_token', str(refresh.access_token), httponly=True)

            return response
        
        except Empleado.DoesNotExist: # Si no existe el empleado
            return Response({'error': 'Empleado incorrecto'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Logout - invalidación de token JWT
@api_view(['POST'])
def logout(request): 
    response = Response({'success': 'Logout exitoso'}, status=status.HTTP_200_OK)
    
    # Elimina el token del cliente (cookie)
    response.delete_cookie('access_token')
    
    return response