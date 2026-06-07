from rest_framework.response import Response
from .models import Category, Product, Cart, CartItem
from .Serializers import CategorySerializer, ProductSerializer, CartItemSerializer, CartSerializer
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def api_root(request):
    return Response({
        'categories': request.build_absolute_uri('/api/categories/'),
        'products': request.build_absolute_uri('/api/products/'),
        'message': 'Welcome to E-commerce API'
    })

@api_view(['GET'])
def category_list(request):
     categories = Category.objects.all()
     serializer = CategorySerializer(categories, many=True)
     return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, context={'request': request})
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)
    return Response(serializer.data)

@api_view(['GET'])
def product_list(request):
     products = Product.objects.all()
     serializer = ProductSerializer(products, many=True)
     return Response(serializer.data)


@api_view(['GET'])
def cart_detail(request):
    cart, created = Cart.objects.get_or_create(user=None)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
     try:
         product_id = request.data.get('product_id')
         product = Product.objects.get(id=product_id)
     except Product.DoesNotExist:
         return Response({'error': 'Product not found'}, status=404)
     cart, created = Cart.objects.get_or_create(user=None)
     cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
     if not created:
      cart_item.quantity += 1
      cart_item.save()
     return Response({'message': 'Product added to cart'})

@api_view(['POST'])
def remove_from_cart(request):
     try:
         item_id = request.data.get('item_id')
         cart_item = CartItem.objects.filter(id=item_id)
         if cart_item:
             cart_item.delete()
             return Response({'message': 'Product removed from cart'})
     except CartItem.DoesNotExist:
         return Response({'error': 'Item not found'}, status=404)