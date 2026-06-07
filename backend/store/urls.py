from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('categories/', views.category_list, name='category-list'),
    path('products/', views.product_list, name='product-list'),
    path('products/<int:pk>/', views.product_detail, name='product-detail'),
    path('cart/', views.cart_detail, name='cart-detail'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/remove/', views.remove_from_cart, name='remove-from-cart'),
]

