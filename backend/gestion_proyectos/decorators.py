from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken

# Decorador para verificar que el token esté presente en la cookie
def token_required(view_func):
    def wrapper(request, *args, **kwargs):
        # Primero, intenta obtener el token desde la cookie
        token = request.COOKIES.get('access_token')
        
        if not token:
            return Response({'error': 'Token no encontrado. Acceso denegado.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            # Verificar la validez del token
            access_token = AccessToken(token)
            request.user_id = access_token['cod_empleado']  # Verificar que el campo cod_empleado está presente
            
            print(f"Token validado para el empleado {request.user_id}") # Imprime el id del empleado para ver quién está accediendo

        except KeyError:
            return Response({'error': 'Campo cod_empleado no encontrado en el token.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            print(f"Error en la verificación del token: {str(e)}")  # Imprime el error
            return Response({'error': 'Token inválido o expirado. Acceso denegado.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return view_func(request, *args, **kwargs)
    
    return wrapper

# Decorador para verificar que el token esté presente en la cookie y que el usuario sea administrador
def token_required_admin(view_func):
    def wrapper(request, *args, **kwargs):
        # Obtener el token desde la cookie
        token = request.COOKIES.get('access_token')
        
        if not token:
            return Response({'error': 'Token no encontrado. Acceso denegado.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            # Verificar la validez del token
            access_token = AccessToken(token)

            # Obtener el cod_empleado y el rol del token
            request.user_id = access_token['cod_empleado']
            user_role = access_token['rol']
            
            print(f"Token validado para el empleado {request.user_id} con rol {user_role}")  # Imprime el rol del empleado

            # Verificar si el rol es de administrador
            if user_role != 'Administrador':  # Suponiendo que 'Administrador' es el valor para el rol de admin
                return Response({'error': 'Acceso denegado. Se requiere rol de administrador.'}, status=status.HTTP_403_FORBIDDEN)

        except KeyError as e:
            return Response({'error': f'Campo {str(e)} no encontrado en el token.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            print(f"Error en la verificación del token: {str(e)}")  # Imprime error en consola por las dudas
            return Response({'error': 'Token inválido o expirado. Acceso denegado.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Si todo está correcto, procedo con la vista
        return view_func(request, *args, **kwargs)
    
    return wrapper