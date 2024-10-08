# En este archivo defino las clases serializadoras de los modelos de la aplicación

from rest_framework import serializers
from .models import Empleado

class LoginSerializer(serializers.Serializer):
    email_empleado = serializers.EmailField(required=True)
    pass_hash = serializers.CharField(write_only=True, min_length=8) # write_only=True para que no se muestre en la respuesta

class EmpleadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = (
              'nom_empleado',
              'ape_empleado',
              'fecha_nacimiento',
              'email_empleado',
              'tel_empleado',
              'direc_empleado',
              'fecha_creacion',
              'debaja',
              'cod_departamento'
            )