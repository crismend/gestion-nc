from rest_framework import viewsets
from .models import NoConformidad, Accion, Seguimiento, InformeAccion, InformeNoConformidad
from .serializers import NoConformidadSerializer, AccionSerializer, SeguimientoSerializer, InformeAccionSerializer, InformeNoConformidadSerializer
from django.contrib.auth import authenticate
from django.db.models import Func, IntegerField, F, Value
from django.db.models.functions import Substr, Cast
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.models import User

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
    queryset = InformeAccion.objects.annotate(
        codigo_num=Cast(Substr('codigo', 4), IntegerField())
    ).order_by('fecha_apertura', 'codigo_num')
    serializer_class = InformeAccionSerializer

class InformeNoConformidadViewSet(viewsets.ModelViewSet):
    queryset = InformeNoConformidad.objects.all().order_by('fecha_deteccion', 'codigo')
    serializer_class = InformeNoConformidadSerializer


# @csrf_exempt
# def reset_password(request):
#     try:
#         user = User.objects.get(username="cristian")
#         user.set_password("")  # ✅ Pon la que tú quieras aquí
#         user.save()
#         return JsonResponse({"status": "contraseña actualizada"})
#     except User.DoesNotExist:
#         return JsonResponse({"error": "usuario no encontrado"})