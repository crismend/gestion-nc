from django.contrib import admin
from .models import (
    NoConformidad, Accion, Seguimiento,
    InformeNoConformidad, InformeAccion,
    AccionPropuesta, SeguimientoAccion
)

admin.site.register(InformeAccion)
admin.site.register(AccionPropuesta)
admin.site.register(SeguimientoAccion)

# Si no lo hiciste antes:
admin.site.register(NoConformidad)
admin.site.register(Accion)
admin.site.register(Seguimiento)
@admin.register(InformeNoConformidad)
class InformeNoConformidadAdmin(admin.ModelAdmin):
    list_display = ("codigo", "estado", "fecha_deteccion")
    actions = ["delete_selected"]  # habilita opción eliminar


