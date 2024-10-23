""" Book views. """
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Book
from .serializer import BookSerializer
from django.shortcuts import get_object_or_404




@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializer_data = BookSerializer(books, many=True).data
    return Response(serializer_data)

@api_view(['POST'])
def create_book(request):
    data = request.data
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

class BookDeleteAPIView(APIView):
    
    def delete(self, request, id, format=None):  
        book = get_object_or_404(Book, id=id)
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_200_OK)
        