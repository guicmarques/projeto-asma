from django.shortcuts import render
from health_team.forms import UserForm, UserProfileInfoForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from plotly.offline import plot
from plotly.graph_objs import Scatter
from plotly.graph_objs import Line
import plotly.graph_objects as go
import numpy as np
import pandas as pd

from server.models import User, UserProfileInfo, AsthmaControlQuestionnaire, FitbitFile, DailyControl

def index(request):
    return render(request, 'health_team/index.html')


@login_required
def special(request):
    return HttpResponse("You are logged in !")


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


def register(request):
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileInfoForm(data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
        else:
            print(user_form.errors, profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileInfoForm()
    return render(request, 'health_team/registration.html',
                  {'user_form': user_form,
                   'profile_form': profile_form,
                   'registered': registered})


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('table'))
            else:
                return HttpResponse("Your account was inactive.")
        else:
            print("Someone tried to login and failed.")
            print("They used username: {} and password: {}".format(
                username, password))
            return HttpResponse("Invalid login details given")
    else:
        return render(request, 'health_team/login.html', {})

def forgot_password(request):
    return render(request, 'health_team/forgot-password.html', {})

def register_account2(request):
    return render(request, 'health_team/register.html', {})

def register_account(request):
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            registered = True
        else:
            print(user_form.errors)
    else:
        user_form = UserForm()
    return render(request, 'health_team/register2.html',
                  {'user_form': user_form,
                   'registered': registered})
    #return render(request, 'health_team/register.html', {})

def erro_404(request):
    return render(request, 'health_team/404_error.html', {})

@login_required
def table(request):
    lista = UserProfileInfo.objects.all()
    print(len(lista))
    return render(request, 'logged/table2.html', {'lista':lista})


@login_required
def profile(request):
    return render(request, 'logged/profile.html', {})


@login_required
def cadastroPaciente2(request):
    return render(request, 'logged/blank-1.html', {})

@login_required
def cadastroPaciente(request):
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileInfoForm(data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
        else:
            print(user_form.errors, profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileInfoForm()
    return render(request, 'logged/blank-12.html',
                  {'user_form': user_form,
                   'profile_form': profile_form,
                   'registered': registered})
    #return render(request, 'logged/blank-12.html', {})


@login_required
def pacienteGraficos(request):
    #https://www.youtube.com/watch?v=vCX6Tpb9sP8
    #https://www.youtube.com/watch?v=B4Vmm3yZPgc
    #https://stackoverflow.com/questions/55832576/how-to-integrate-chart-js-in-django
    #https://www.codingwithricky.com/2019/08/28/easy-django-plotly/


    
    #Grafico Demo
    x_data = [0,1,2,3]
    y_data = [x**2 for x in x_data]
    """plot_div = plot([Scatter(x=x_data, y=y_data,
                        mode='lines', name='test',
                        opacity=0.8, marker_color='green')],
               output_type='div', include_plotlyjs=False, show_link=False, link_text="", auto_open=False)"""

    labels = ['Fuera del intervalo','Quema de grasas','Zona cardio','Zona máxima']
    values = [462, 84, 3, 0]

    fig = go.Figure(data=[go.Pie(labels=labels, values=values)])
    plot_div = plot(go.Figure(data=[go.Pie(labels=labels, values=values, title = "Tempo de atividades (minutos)")]),
               output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)
    ##################
    fig2 = go.Bar(y=[7, 5, 4], x=["Dormindo","Exercicio","Parado"])
    fig2 = plot([fig2],
               output_type='div', include_plotlyjs=False, show_link=False, link_text="", auto_open=False)

    ##################
    fig3 = go.Bar(y=[240, 659, 881], x=["activityCalories","caloriesBMR","caloriesOut"])
    fig3 = plot([fig3],
               output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)
    
    return render(request, "logged/view-graph.html", context={'plot_div': plot_div, 'fig':fig2, 'fig3':fig3})

@login_required
def pacienteGraficos2(request,username):
    #https://www.youtube.com/watch?v=vCX6Tpb9sP8
    #https://www.youtube.com/watch?v=B4Vmm3yZPgc
    #https://stackoverflow.com/questions/55832576/how-to-integrate-chart-js-in-django
    #https://www.codingwithricky.com/2019/08/28/easy-django-plotly/

    #print((UserProfileInfo.objects))

    #asthmaQuestionaire = AsthmaControlQuestionnaire.objects.get_or_create(id=username)
    user_data = UserProfileInfo.objects.get(user_id=username)
    print(user_data.user, user_data.user_id, UserProfileInfo.objects.get(user_id=username).user_id)
    try:
        listaData = []
        listaTosse = []
        listaChiado = []
        listaFaltaDeAr = []
        listaAcordar = []
        listaBombinha = []
        listaPico1 = []
        listaPico2 = []
        listaPico3 = []
        listaNotes = []
        dailycontrol = DailyControl.objects.all().filter(user_id=username)
        if len(dailycontrol)!=0:
            for day in dailycontrol:
                print("Certo")
                listaData.append(day.date.strftime("%Y-%m-%d"))
                listaTosse.append(int(day.tosse))
                listaChiado.append(int(day.chiado))
                listaFaltaDeAr.append(int(day.faltaDeAr))
                listaAcordar.append(int(day.acordar))
                listaBombinha.append(int(day.bombinha))
                listaPico1.append(day.pico1)
                listaPico2.append(day.pico2)
                listaPico3.append(day.pico3)
                listaNotes.append(day.notes)
        else:
            print("Errado")
            listaData = ["0000-00-00"]
            listaTosse = [False]
            listaChiado = [False]
            listaFaltaDeAr = [False]
            listaAcordar = [False]
            listaBombinha = [False] 
            listaPico1 = [0]
            listaPico2 = [0]
            listaPico3 = [0]
            listaNotes = ["No data"]


    except:
        print("Errado2")
        listaData = ["0000-00-00"]
        listaTosse = [False]
        listaChiado = [False]
        listaFaltaDeAr = [False]
        listaAcordar = [False]
        listaBombinha = [False]
        listaPico1 = [0]
        listaPico2 = [0]
        listaPico3 = [0]
        listaNotes = ["Fail to load Data"]

    
    #print(len(dailycontrol),dailycontrol[0],dailycontrol[0].all())

    #GRafico
    dates = listaData
    a = listaTosse
    b = listaChiado
    c = listaFaltaDeAr
    d = listaAcordar
    e = listaBombinha
    fig = go.Figure()
    # Add traces, one for each slider step
    for step in range(len(dates)):
        fig_inside = go.Bar(
                visible=False,
                name=dates[step],
                x= ["Apresentou tosse?","Apresentou chiado?","Teve falta de ar?","Teve problemas ao dormir?","Usou a bombinha?"],
                y= [a[step],b[step],c[step],d[step],e[step]])
        fig.add_trace(fig_inside)
        fig.update_layout(
            yaxis= dict(
                range=[0, 1],
                ticktext=["Não", "Sim"],
                tickvals=[0, 1]
            )
        )

    # Make 10th trace visible
    fig.data[0].visible = True

    # Create and add slider
    steps = []
    for i in range(len(fig.data)):
        step = dict(
            method="update",
            args=[{"visible": [False] * len(fig.data)},
                {"title": "Day: " + dates[i]}],  # layout attribute
        )
        step["args"][0]["visible"][i] = True  # Toggle i'th trace to "visible"
        steps.append(step)

    sliders = [dict(
        active=10,
        currentvalue={"prefix": "Frequency: "},
        pad={"t": 50},
        steps=steps
    )]

    fig.update_layout(
        sliders=sliders
    )

    # Edit slider labels
    fig['layout']['sliders'][0]['currentvalue']['prefix']='Date: '
    for i, date in enumerate(dates, start = 0):
        fig['layout']['sliders'][0]['steps'][i]['label']=dates[i]

    fig10 = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)


    #Grafico de fluxo de ar

    # Create figure
    fig = go.Figure()

    fig.add_trace(
        go.Scatter(x=listaData, y=listaPico1))
    )
    fig.add_trace(
        go.Scatter(x=listaData, y=listaPico2))
    )
    fig.add_trace(
        go.Scatter(x=listaData, y=listaPico3))
    )

    # Set title
    fig.update_layout(
        title_text="Time series with range slider and selectors"
    )

    # Add range slider
    fig.update_layout(
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=1,
                        label="1m",
                        step="month",
                        stepmode="backward"),
                    dict(count=6,
                        label="6m",
                        step="month",
                        stepmode="backward"),
                    dict(count=1,
                        label="YTD",
                        step="year",
                        stepmode="todate"),
                    dict(count=1,
                        label="1y",
                        step="year",
                        stepmode="backward"),
                    dict(step="all")
                ])
            ),
            rangeslider=dict(
                visible=True
            ),
            type="date"
        )
    )
    figFluxoAr = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)


    
    #Grafico Demo
    x_data = [0,1,2,3]
    y_data = [x**2 for x in x_data]
    """plot_div = plot([Scatter(x=x_data, y=y_data,
                        mode='lines', name='test',
                        opacity=0.8, marker_color='green')],
               output_type='div', include_plotlyjs=False, show_link=False, link_text="", auto_open=False)"""

    labels = ['Fuera del intervalo','Quema de grasas','Zona cardio','Zona máxima']
    values = [462, 84, 3, 0]

    fig = go.Figure(data=[go.Pie(labels=labels, values=values)])
    plot_div = plot(go.Figure(data=[go.Pie(labels=labels, values=values, title = "Tempo de atividades (minutos)")]),
               output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)
    ##################
    fig2 = go.Bar(y=[7, 5, 4], x=["Dormindo","Exercicio","Parado"])
    fig2 = plot([fig2],
               output_type='div', include_plotlyjs=False, show_link=False, link_text="", auto_open=False)

    ##################
    fig3 = go.Bar(y=[240, 659, 881], x=["activityCalories","caloriesBMR","caloriesOut"])
    fig3 = plot([fig3],
               output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)
    
    return render(
        request,
        "logged/graphs-data-1.html",
        context={
            'user_data' : user_data,
            'plot_div': plot_div,
            'fig':fig2,
            'fig3':fig3,
            'fig10':fig10,
            'figFluxoAr':figFluxoAr
            }
        )

def tableTest(request):
    return render(request, 'logged/table_test.html', {})


def tableTest2(request,username):
    print(username)
    return render(request, 'logged/table_test.html', {})
