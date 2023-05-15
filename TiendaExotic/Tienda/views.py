from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from Tienda.models import Categoria

# Create your views here.

def inicio(request):
    return render(request, 'index.html')

def agregarCategoria(request):
    nombre = request.POST["txtNombre"]
    try:
        categoria = Categoria(catNombre=nombre)
        categoria. save()
        mensaje="Categoria agregada correctamente"
    except:
        mensaje="Problemas a la hora de agregar la categoría"
    retorno={"mensaje": mensaje}
    return render(request, "frmCategoria. html", retorno)