from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    # path('', views.home, name='home'),
    path('categories/', views.category_list, name='category-list'),
    path('products/', views.product_list, name='product-list'),
]