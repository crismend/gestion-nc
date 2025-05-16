from rest_framework import serializers
from .models import (NoConformidad, Accion, Seguimiento, InformeNoConformidad, InformeAccion, AccionPropuesta, SeguimientoAccion) 


class SeguimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seguimiento
        fields = '__all__'


class AccionSerializer(serializers.ModelSerializer):
    seguimientos = SeguimientoSerializer(many=True, read_only=True)

    class Meta:
        model = Accion
        fields = '__all__'


class NoConformidadSerializer(serializers.ModelSerializer):
    acciones = AccionSerializer(many=True, read_only=True)

    class Meta:
        model = NoConformidad
        fields = '__all__'


class InformeNoConformidadSerializer(serializers.ModelSerializer):
    accion_asociada = serializers.PrimaryKeyRelatedField(
        queryset=InformeAccion.objects.all(),
        required=False,
        allow_null=True
    )
    accion_asociada_codigo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = InformeNoConformidad
        fields = '__all__'  # Esto ya incluye 'accion_asociada'
        # DRF incluirá también 'accion_asociada_codigo' automáticamente

    def get_accion_asociada_codigo(self, obj):
        return obj.accion_asociada.codigo if obj.accion_asociada else None


class AccionPropuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccionPropuesta
        exclude = ['informe']


class SeguimientoAccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguimientoAccion
        exclude = ['informe']


class InformeAccionSerializer(serializers.ModelSerializer):
    acciones = AccionPropuestaSerializer(many=True, read_only=False)
    seguimientos = SeguimientoAccionSerializer(many=True, read_only=False)

    class Meta:
        model = InformeAccion
        fields = '__all__'

    def create(self, validated_data):
        acciones_data = validated_data.pop('acciones', [])
        seguimientos_data = validated_data.pop('seguimientos', [])

        # Acceder al usuario autenticado si lo necesitas
        request = self.context.get('request', None)
        #! user = request.user if request else None

        informe = InformeAccion.objects.create(**validated_data)

        for accion in acciones_data:
            AccionPropuesta.objects.create(informe=informe, **accion)
        for seguimiento in seguimientos_data:
            SeguimientoAccion.objects.create(informe=informe, **seguimiento)

        return informe
    
    def update(self, instance, validated_data):
        acciones_data = validated_data.pop('acciones', [])
        seguimientos_data = validated_data.pop('seguimientos', [])

        # Actualizar campos simples
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Eliminar acciones y seguimientos existentes
        instance.acciones.all().delete()
        instance.seguimientos.all().delete()

        # Crear nuevas acciones
        for accion in acciones_data:
            AccionPropuesta.objects.create(informe=instance, **accion)

        # Crear nuevos seguimientos
        for seguimiento in seguimientos_data:
            SeguimientoAccion.objects.create(informe=instance, **seguimiento)

        return instance



