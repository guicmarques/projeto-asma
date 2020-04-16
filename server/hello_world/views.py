from django.shortcuts import render
from hello_world.forms import imcForm
from hello_world.models import imcModel
from hello_world.tools import calculateIMC
# Create your views here.


def hello_world(request):
    peso = 0
    altura = 0

    form = imcForm()
    if request.method == 'POST':
        form = imcForm(request.POST)
        if form.is_valid():
            peso = float(form.cleaned_data["peso"].replace(",", "."))
            altura = float(form.cleaned_data["altura"].replace(",", "."))

            dados = imcModel(
                peso=peso,
                altura=altura
            )
            dados.save()

    if (altura > 0 and peso > 0):
        imc = calculateIMC(peso, altura)
    else:
        imc = 0

    context = {
        "form": form,
        "imc": imc
    }

    return render(request, 'hello_world.html', context)
