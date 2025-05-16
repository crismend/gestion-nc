from rest_framework import viewsets
from .models import NoConformidad, Accion, Seguimiento, InformeAccion, InformeNoConformidad
from .serializers import NoConformidadSerializer, AccionSerializer, SeguimientoSerializer, InformeAccionSerializer, InformeNoConformidadSerializer

class NoConformidadViewSet(viewsets.ModelViewSet):
    queryset = NoConformidad.objects.all()
    serializer_class = NoConformidadSerializer


class AccionViewSet(viewsets.ModelViewSet):
    queryset = Accion.objects.all()
    serializer_class = AccionSerializer


class SeguimientoViewSet(viewsets.ModelViewSet):
    queryset = Seguimiento.objects.all()
    serializer_class = SeguimientoSerializer

class InformeAccionViewSet(viewsets.ModelViewSet):
    queryset = InformeAccion.objects.all()
    serializer_class = InformeAccionSerializer

class InformeNoConformidadViewSet(viewsets.ModelViewSet):
    queryset = InformeNoConformidad.objects.all()
    serializer_class = InformeNoConformidadSerializer