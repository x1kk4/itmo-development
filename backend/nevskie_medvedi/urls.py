from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from coach.views import CoachViewSet, EventViewSet, SessionViewSet, TrainingSessionViewSet, BranchViewSet
from client.views import ClientViewSet, ChildViewSet

from django.conf import settings
from django.conf.urls.static import static

# Setup the router
router = DefaultRouter()
router.register(r'coaches', CoachViewSet)
router.register(r'sessions', SessionViewSet)
router.register(r'events', EventViewSet)
router.register(r'training_sessions', TrainingSessionViewSet)
router.register(r'branches', BranchViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'children', ChildViewSet)

# Setup Swagger view
schema_view = get_schema_view(
    openapi.Info(
        title="Project API",
        default_version='v1',
        description="API documentation for all available endpoints",
        terms_of_service="https://www.yourcompany.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourcompany.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    # Swagger URLs
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
