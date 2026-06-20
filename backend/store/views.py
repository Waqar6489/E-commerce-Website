from rest_framework.response import Response
from .models import Category, Product, Cart, CartItem, Order, OrderItem,ContactForm
from .Serializers import CategorySerializer, ProductSerializer, CartItemSerializer, CartSerializer,UserSerializer, RegistrationSerializer,ContactFormSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.conf import settings

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
@permission_classes([IsAuthenticated])
def cart_detail(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
     try:
         item_id = request.data.get('item_id')
         cart_item = CartItem.objects.filter(id=item_id)
         if cart_item:
             cart_item.delete()
             return Response({'message': 'Product removed from cart'})
     except CartItem.DoesNotExist:
         return Response({'error': 'Item not found'}, status=404)
     

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
         data = request.data
         name = data.get('name')
         phone = data.get('phone')
         address = data.get('address')
         payment_method = data.get('payment_method','COD')

         #validate phone
         if not phone.isdigit() or len(phone)<11:
             return Response({'error':'invalid phone number'}, status=400)
         
         cart, created = Cart.objects.get_or_create(user=request.user)

         if  not cart  or cart.items.exists():
           return Response({'error': 'Cart is empty'}, status=404)     
         total = sum(float(item.product.price) * item.quantity for item in cart.items.all())
        #create oder
         order = Order.objects.create(
            user = None,
            total_price= total,
        ) 
         #create orderitems
         for item in cart.items.all():
             OrderItem.objects.create(
                 order = order,
                 product = item.product,
                 quantity = item.quantity,
                 price = item.product.price,
             )
         #clear cart
         cart.items.all().delete()
         return Response(
             {'message': 'your order sucessfully placed', 'order_id': order.id})
    except Exception as e:
        return Response({
            "error":str(e)}, status=500
        )
    

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegistrationSerializer( data = request.data)
    if serializer.is_valid():
        user_serializer = serializer.save()
        return Response({'message':"user Sucessfully created", 'user': UserSerializer(user_serializer).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def contact(resquest):
    serializer = ContactFormSerializer(data = resquest.data)
    if serializer.is_valid():
        data= serializer.validated_data
        
        # Construct the email content
      
        email_subject = f"New Contact Form: {data['subject']}"
        email_message = f"You received a new message from your website contact form:\n\n" \
                            f"Name: {data['name']}\n" \
                            f"Email: {data['email']}\n\n" \
                            f"Message:\n{data['message']}" 
        try:
            send_mail(
                subject=email_subject,
                message=email_message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.ADMIN_RECEIVER_EMAIL],
                fail_silently=False,
            )
            return Response({"success": "Message sent successfully!"}, status= status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Failed to send email. Please try again later."}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)        