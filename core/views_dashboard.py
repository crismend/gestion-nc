from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils.timezone import now
from core.models import InformeNoConformidad, InformeAccion

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def indicadores_dashboard(request):
    hoy = now().date()
    inicio_mes = hoy.replace(day=1)

    # 🔹 Totales No Conformidades
    todas_nc = InformeNoConformidad.objects.all()
    total_nc = todas_nc.count()

    # 🔹 Estado de NC
    nc_abiertas = todas_nc.filter(estado='abierta').count()
    nc_revision = todas_nc.filter(estado='en_revision').count()
    nc_cerradas = todas_nc.filter(estado='cerrado').count()

    # 🔹 Porcentajes de estado
    porcentaje_nc_abiertas_revision = round(
        ((nc_abiertas + nc_revision) / total_nc) * 100, 2
    ) if total_nc > 0 else 0

    porcentaje_nc_cerradas = round(
        (nc_cerradas / total_nc) * 100, 2
    ) if total_nc > 0 else 0

    # 🔹 Efectividad (solo en NC cerradas)
    acciones_efectivas = todas_nc.filter(estado='cerrado', accion_efectiva=True).count()
    porcentaje_efectivas = round(
        (acciones_efectivas / nc_cerradas) * 100, 2
    ) if nc_cerradas > 0 else 0

    # 🔹 NC con riesgo sin tratamiento
    riesgo_no_tratado = todas_nc.filter(
        riesgo_asociado__isnull=False,
        tratamiento_realizado=False
    ).count()

    # 🔹 NC nuevas este mes
    nuevas_mes = todas_nc.filter(
        fecha_deteccion__gte=inicio_mes
    ).count()

    # 🔹 InformeAccion - Totales y % por estado
    todas_acciones = InformeAccion.objects.all()
    total_acciones = todas_acciones.count()
    acciones_pendientes = todas_acciones.filter(estado='pendiente').count()
    acciones_proceso = todas_acciones.filter(estado='en_proceso').count()
    acciones_cerradas = todas_acciones.filter(estado='cerrada').count()

    porcentaje_pendientes = round(
        (acciones_pendientes / total_acciones) * 100, 2
    ) if total_acciones > 0 else 0

    porcentaje_proceso = round(
        (acciones_proceso / total_acciones) * 100, 2
    ) if total_acciones > 0 else 0

    porcentaje_acciones_cerradas = round(
        (acciones_cerradas / total_acciones) * 100, 2
    ) if total_acciones > 0 else 0

    return Response({
        "total_nc": total_nc,
        "porcentaje_nc_abiertas_revision": porcentaje_nc_abiertas_revision,
        "porcentaje_nc_cerradas": porcentaje_nc_cerradas,
        "porcentaje_efectividad": porcentaje_efectivas,
        "nc_con_riesgo_sin_tratamiento": riesgo_no_tratado,
        "nc_nuevas_este_mes": nuevas_mes,
        "total_acciones": total_acciones,
        "porcentaje_acciones_pendientes": porcentaje_pendientes,
        "porcentaje_acciones_en_proceso": porcentaje_proceso,
        "porcentaje_acciones_cerradas": porcentaje_acciones_cerradas,
    })
