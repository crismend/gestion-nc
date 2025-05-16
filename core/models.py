from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone 
from datetime import timedelta
# --- MODELO DE NO CONFORMIDAD GENERAL (PSM-03-I-03) ---

class NoConformidad(models.Model):
    ESTADO_CHOICES = [
        ('abierta', 'Abierta'),
        ('en_proceso', 'En proceso'),
        ('cerrada', 'Cerrada'),
    ]

    codigo = models.CharField(max_length=20, unique=True)
    fecha_deteccion = models.DateField()
    procedimiento_afectado = models.CharField(max_length=100)
    origen = models.TextField()
    descripcion = models.TextField()
    estudio_causa = models.TextField(blank=True, null=True)
    nivel_riesgo = models.CharField(
        max_length=20,
        choices=[('bajo', 'Bajo'), ('medio', 'Medio'), ('alto', 'Alto')]
    )
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='abierta')
    responsable = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    firma_responsable = models.BooleanField(default=False)
    motivo_cierre = models.TextField(blank=True, null=True)
    evaluacion_eficacia = models.TextField(blank=True, null=True)
    fecha_cierre_seguridad = models.DateField(blank=True, null=True)
    validado_por_seguridad = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.codigo} - {self.estado}"


class Accion(models.Model):
    TIPO_CHOICES = [
        ('correctiva', 'Correctiva'),
        ('preventiva', 'Preventiva'),
    ]

    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En proceso'),
        ('completada', 'Completada'),
        ('vencida', 'Vencida'),
    ]

    no_conformidad = models.ForeignKey(NoConformidad, related_name='acciones', on_delete=models.CASCADE)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    fecha_compromiso = models.DateField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    responsable = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    evaluacion_eficacia = models.TextField(blank=True, null=True)
    fecha_cierre = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Acción ({self.tipo}) - {self.estado}"


class Seguimiento(models.Model):
    accion = models.ForeignKey(Accion, related_name='seguimientos', on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha = models.DateField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Seguimiento - {self.fecha}"


# --- INFORME DE NO CONFORMIDAD (PSM-03-I-03) DOCUMENTO A PARTE ---

class InformeNoConformidad(models.Model):
    ESTADO_CHOICES = [
        ('abierto', 'Abierto'),
        ('en_revision', 'En revisión'),
        ('cerrado', 'Cerrado'),
    ]

    # Identificación general
    codigo = models.CharField(max_length=20, unique=True)
    fecha_deteccion = models.DateField()
    detectado_por = models.CharField(max_length=100)
    requisito_incumplido = models.TextField()

    # Descripción y tratamiento
    descripcion = models.TextField()
    solucion = models.TextField()
    fecha_realizacion = models.DateField(blank=True, null=True)
    realizada_por = models.CharField(max_length=100, blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)

    # Verificación de eficacia
    fecha_verificacion = models.DateField(blank=True, null=True)
    accion_efectiva = models.BooleanField(default=False)
    descripcion_verificacion = models.TextField(blank=True, null=True)
    evidencia_documental = models.TextField(blank=True, null=True)

    # Cierre del informe
    clasificacion = models.CharField(max_length=50, blank=True, null=True)  # puntual / se_repite
    accion_asociada = models.ForeignKey(
    "InformeAccion",  # <- nota las comillas
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="no_conformidades_asociadas"
)
    riesgo_asociado = models.TextField(blank=True, null=True)
    tratamiento_realizado = models.BooleanField(default=False)
    responsable_seguridad = models.CharField(max_length=100, blank=True, null=True)
    firma_administrador = models.BooleanField(default=False)
    fecha_cierre = models.DateField(blank=True, null=True)

    # Info adicional obligatoria
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='abierto')
    usuario_reporta = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='informes_reportados')
    usuario_responsable = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='informes_asignados')

    def __str__(self):
        return f"{self.codigo} - {self.estado}"
    
    def save(self, *args, **kwargs):
        # ✅ Lógica para determinar el estado antes de guardar
        if self.fecha_cierre and self.firma_administrador and self.fecha_cierre <= timezone.now().date():
            self.estado = 'cerrado'
        elif self.fecha_verificacion:
            self.estado = 'en_revision'
        elif self.fecha_realizacion:
            self.estado = 'en_revision'
        else:
            self.estado = 'abierto'

        super().save(*args, **kwargs)

    @property
    def cerrada_en_plazo(self):
        if self.estado == 'cerrado' and self.fecha_cierre and self.fecha_deteccion:
            return self.fecha_cierre <= self.fecha_deteccion + timedelta(days=30)
        return False


# --- INFORME DE ACCIÓN CORRECTIVA/PREVENTIVA (PSM-03-I-05) ---

class InformeAccion(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En proceso'),
        ('cerrada', 'Cerrada'),
    ]

    codigo = models.CharField(max_length=20, unique=True)
    fecha_apertura = models.DateField()
    procedimiento_afectado = models.CharField(max_length=100)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    origen = models.TextField(blank=True, null=True)

    estudio_causa = models.TextField(blank=True, null=True)
    clasificacion_deficiencia = models.CharField(max_length=100, blank=True, null=True)

    responsable_1 = models.CharField(max_length=100, blank=True, null=True)
    firma_responsable_1 = models.BooleanField(default=False)
    responsable_2 = models.CharField(max_length=100, blank=True, null=True)
    firma_responsable_2 = models.BooleanField(default=False)

    evaluacion_eficacia = models.TextField(blank=True, null=True)
    motivo_cierre = models.TextField(blank=True, null=True)
    fecha_cierre_seguridad = models.DateField(blank=True, null=True)
    validado_por_seguridad = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.codigo} - {self.estado}"


class AccionPropuesta(models.Model):
    informe = models.ForeignKey(InformeAccion, related_name="acciones", on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, choices=[('correctiva', 'Correctiva'), ('preventiva', 'Preventiva')])
    descripcion = models.TextField()
    fecha_compromiso = models.DateField()
    responsable = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.tipo.upper()} - {self.descripcion[:30]}"


class SeguimientoAccion(models.Model):
    informe = models.ForeignKey(InformeAccion, related_name="seguimientos", on_delete=models.CASCADE)
    fecha = models.DateField()
    comentario = models.TextField()

    def __str__(self):
        return f"{self.fecha} - {self.comentario[:30]}"
