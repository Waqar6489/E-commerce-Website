
from django.urls import path
from . import views
from rest_framework_simplejwt.views import  TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('register/', views.register_view, name= 'register'),
    path('token/', TokenObtainPairView.as_view(), name= 'TokenRefreshView' ),
    path('Refreshtoken/', TokenRefreshView.as_view(), name= 'TokenObtainPairView' ),
    path('categories/', views.category_list, name='category-list'),
    path('products/', views.product_list, name='product-list'),
    path('products/<int:pk>/', views.product_detail, name='product-detail'),
    path('cart/', views.cart_detail, name='cart-detail'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/remove/', views.remove_from_cart, name='remove-from-cart'),
    path('create-order/', views.create_order),
]

