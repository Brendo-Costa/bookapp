""" Book urls. """
from django.urls import path
from .views import get_books, create_book, BookDeleteAPIView, delete_book

app_name = 'book'

urlpatterns = [
    path('books/', get_books, name='all'),
    path('books/create/', create_book, name='create'),
    path('books/delete/<int:id>/', delete_book, name='delete'),
]
