from rest_framework import viewsets
from .models import NoConformidad, Accion, Seguimiento, InformeAccion, InformeNoConformidad
from .serializers import NoConformidadSerializer, AccionSerializer, SeguimientoSerializer, InformeAccionSerializer, InformeNoConformidadSerializer
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

@csrf_exempt
def test_login(request):
    user = authenticate(username="cristian", password="Juan.vero")
    if user is not None:
        return JsonResponse({'login': 'OK'})
    else:
        return JsonResponse({'login': 'fallido'})