from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import NoConformidadViewSet, AccionViewSet, SeguimientoViewSet, InformeAccionViewSet, InformeNoConformidadViewSet
from core.views_dashboard import indicadores_dashboard


router = DefaultRouter()
router.register(r'noconformidades', NoConformidadViewSet)
router.register(r'acciones', AccionViewSet)
router.register(r'seguimientos', SeguimientoViewSet)
router.register(r'informes-nc', InformeNoConformidadViewSet)
router.register(r'informes-accion', InformeAccionViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # 👇 Endpoints de login y refresh con JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # dashboard-indicadores
    path('api/dashboard/indicadores/', indicadores_dashboard, name='indicadores'),
    # path('api/reset-password/', reset_password),
]
