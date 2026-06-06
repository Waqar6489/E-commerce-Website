from rest_framework.response import Response
from .models import Category, Product
from .Serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def category_list(request):
     categories = Category.objects.all()
     serializer = CategorySerializer(categories, many=True)
     return Response(serializer.data)

@api_view(['GET'])
def product_list(request):
     products = Product.objects.all()
     serializer = ProductSerializer(products, many=True)
     return Response(serializer.data)