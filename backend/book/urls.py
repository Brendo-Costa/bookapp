""" Book urls. """
from django.urls import path
from .views import get_books, create_book, BookDeleteAPIView

app_name = 'book'

urlpatterns = [
    path('books/', get_books, name='all'),
    path('books/create/', create_book, name='create'),
    path('books/delete/<int:id>/', BookDeleteAPIView.as_view(), name='delete'),
]
