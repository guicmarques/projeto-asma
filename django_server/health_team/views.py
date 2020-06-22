from django.shortcuts import render
from health_team.forms import UserForm, UserProfileInfoForm, UserFormForProfile, GoalForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from plotly.offline import plot
from plotly.graph_objs import Scatter
from plotly.graph_objs import Line
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import numpy as np
import pandas as pd
import datetime
import time
import traceback
import csv

from server.handleUserData import getFitbitData

from server.models import User, UserProfileInfo, AsthmaControlQuestionnaire, FitbitFile, DailyControl, PracticeBarriers,FitbitProfile,Goal

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
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
    

    return render(request, 'health_team/register.html', {})

def register_account(request):
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        print(dir(user_form))
        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            registered = True
            new_user = authenticate(username=user_form.cleaned_data['username'],
                                    password=user_form.cleaned_data['password'],
                                    )
            login(request, new_user)
            return HttpResponseRedirect(reverse('table'))
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
        user_form = UserFormForProfile(data=request.POST)
        profile_form = UserProfileInfoForm(data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            #print(user)
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
            return HttpResponseRedirect(reverse('table'))
        else:
            print(user_form.errors, profile_form.errors)
    else:
        user_form = UserFormForProfile()
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

    try:
        listaquestion1 = []
        listaquestion2 = []
        listaquestion3 = []
        listaquestion4 = []
        listaquestion5 = []
        listaquestion6 = []
        listaquestion7 = []
        listaData2 = []

        questionario = AsthmaControlQuestionnaire.objects.all().filter(user_id=username)
        if len(questionario)!=0:
            for day in questionario:
                print("Certo - Questionario")
                listaData2.append(day.date.strftime("%Y-%m-%d"))
                listaquestion1.append(day.question1)
                listaquestion2.append(day.question2)
                listaquestion3.append(day.question3)
                listaquestion4.append(day.question4)
                listaquestion5.append(day.question5)
                listaquestion6.append(day.question6)
                listaquestion7.append(day.question7)

        else:
            print("Errado")
            listaquestion1 = [0]
            listaquestion2 = [0]
            listaquestion3 = [0]
            listaquestion4 = [0]
            listaquestion5 = [0]
            listaquestion6 = [0]
            listaquestion7 = [0]
            listaData2 = ["0000-00-00"]


    except:
        listaquestion1 = [0]
        listaquestion2 = [0]
        listaquestion3 = [0]
        listaquestion4 = [0]
        listaquestion5 = [0]
        listaquestion6 = [0]
        listaquestion7 = [0]
        listaData2 = ["0000-00-00"]

    try:
        listaInteresse = []
        listaTempo = []
        listaEnergia = []
        listaFaltaAr = []
        listaCompanhia = []
        listaDinheiro = []
        listaCoisa = []
        listaSeguranca = []
        listaClima = []
        listaEquipamentos = []
        listaDate3 = []

        barreiras_list = PracticeBarriers.objects.all().filter(user_id=username)
        if len(barreiras_list)!=0:
            for barreiras in barreiras_list:
                listaInteresse.append(barreiras.interesse)
                listaTempo.append(barreiras.tempo)
                listaEnergia.append(barreiras.energia)
                listaFaltaAr.append(barreiras.faltaAr)
                listaCompanhia.append(barreiras.companhia)
                listaDinheiro.append(barreiras.dinheiro)
                listaCoisa.append(barreiras.coisas)
                listaSeguranca.append(barreiras.seguranca)
                listaClima.append(barreiras.clima)
                listaEquipamentos.append(barreiras.equipamentos)
                listaDate3.append(barreiras.date.strftime("%Y-%m-%d"))
        else:
            print("Não tem - Barreiras")
            listaInteresse = [1]
            listaTempo = [1]
            listaEnergia = [1]
            listaFaltaAr = [1]
            listaCompanhia = [1]
            listaDinheiro = [1]
            listaCoisa = [1]
            listaSeguranca = [1]
            listaClima = [1]
            listaEquipamentos = [1]
            listaDate3 = ["0000-00-00"]

    except:
        print("Falha - Barreiras")
        listaInteresse = [1]
        listaTempo = [1]
        listaEnergia = [1]
        listaFaltaAr = [1]
        listaCompanhia = [1]
        listaDinheiro = [1]
        listaCoisa = [1]
        listaSeguranca = [1]
        listaClima = [1]
        listaEquipamentos = [1]
        listaDate3 = ["0000-00-00"]

    # Obter dados da fitbit
    try:

        day60List = []
        for i in range(1,61,1):
            day60List.append((datetime.datetime.today() - datetime.timedelta(days=i)).strftime("%Y-%m-%d"))

        
        dados60dias = getFitbitData(user=User.objects.get(id=username),dates=day60List)
        #print(dados7dias)

        dados7diasSteps = 0
        dados7diasSedentaryMinutes = 0
        dados7diasLightlyActiveMinutes = 0
        dados7diasVeryActiveMinutes = 0
        for day in sorted(dados60dias.keys(),reverse=True)[:7]:
            dados7diasSteps += dados60dias[day]["summary"]["steps"]
            dados7diasSedentaryMinutes += dados60dias[day]["summary"]["sedentaryMinutes"]
            dados7diasLightlyActiveMinutes += dados60dias[day]["summary"]["lightlyActiveMinutes"]
            dados7diasVeryActiveMinutes += dados60dias[day]["summary"]["veryActiveMinutes"]

        dados7PasdiasSteps = 0
        dados7PasdiasSedentaryMinutes = 0
        dados7PasdiasLightlyActiveMinutes = 0
        dados7PasdiasVeryActiveMinutes = 0
        for day in sorted(dados60dias.keys(),reverse=True)[7:14]:
            dados7PasdiasSteps += dados60dias[day]["summary"]["steps"]
            dados7PasdiasSedentaryMinutes += dados60dias[day]["summary"]["sedentaryMinutes"]
            dados7PasdiasLightlyActiveMinutes += dados60dias[day]["summary"]["lightlyActiveMinutes"]
            dados7PasdiasVeryActiveMinutes += dados60dias[day]["summary"]["veryActiveMinutes"]

        listaSteps = []
        listaSedentaryMinutes = []
        listaLightlyActiveMinutes = []
        listaVeryActiveMinutes = []
        listaDiaFitbit = []
        for day in sorted(dados60dias.keys(),reverse=True):
            listaSteps.append(dados60dias[day]["summary"]["steps"])
            listaSedentaryMinutes.append(dados60dias[day]["summary"]["sedentaryMinutes"])
            listaLightlyActiveMinutes.append(dados60dias[day]["summary"]["lightlyActiveMinutes"])
            listaVeryActiveMinutes.append(dados60dias[day]["summary"]["veryActiveMinutes"])
            listaDiaFitbit.append(day)
    
    except Exception:
        traceback.print_exc()
        dados7diasSteps = 0
        dados7diasSedentaryMinutes = 0
        dados7diasLightlyActiveMinutes = 0
        dados7diasVeryActiveMinutes = 0

        dados7PasdiasSteps = 0
        dados7PasdiasSedentaryMinutes = 0
        dados7PasdiasLightlyActiveMinutes = 0
        dados7PasdiasVeryActiveMinutes = 0

        listaSteps = [0]
        listaSedentaryMinutes = [0]
        listaLightlyActiveMinutes = [0]
        listaVeryActiveMinutes = [0]
        listaDiaFitbit = ["0000-00-00"]

    
    #print(len(dailycontrol),dailycontrol[0],dailycontrol[0].all())

    #GRafico
    dates = listaData
    a = listaTosse
    b = listaChiado
    c = listaFaltaDeAr
    d = listaAcordar
    e = listaBombinha
    f = listaNotes
    fig = go.Figure()
    # Add traces, one for each slider step
    for step in range(len(dates)):
        fig_inside = go.Bar(
                visible=False,
                name=dates[step],
                x= ["Apresentou tosse?","Apresentou chiado?","Teve falta de ar?","Teve problemas ao dormir?","Usou a bombinha?"],
                y= [a[step]+0.1,b[step]+0.1,c[step]+0.1,d[step]+0.1,e[step]+0.1], 
                text = dates[step]+" - "+f[step]
        )
        fig.add_trace(fig_inside)
        fig.update_layout(
            yaxis= dict(
                range=[0, 1.1],
                ticktext=["Não", "Sim"],
                tickvals=[0.1, 1.1]
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
        go.Scatter(x=listaData, y=listaPico1, name='Pico 1')
    )    
    fig.add_trace(
        go.Scatter(x=listaData, y=listaPico2, name='Pico 2')
    )
    fig.add_trace(
        go.Scatter(x=listaData, y=listaPico3, name='Pico 3')
    )
    



    # Add range slider
    fig.update_layout(
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=7,
                        label="week",
                        step="day",
                        stepmode="backward"),
                    dict(count=14,
                        label="2 weeks",
                        step="day",
                        stepmode="backward"),
                    dict(count=1,
                        label="This month",
                        step="month",
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
    fig.update_yaxes( range=[150,600] )
    figFluxoAr = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)

    #Grafico de questionario semanal

    # Create figure
    fig = make_subplots(
        rows=4, cols=2,
        specs=
            [[{}, {}],
            [{}, {}],
            [{}, {}],
            [{"colspan": 2}, None]],
        shared_xaxes=True,
        subplot_titles=(
            "Quão frequentemente você acordou por causa de sua asma?",
            "Quão ruins foram os seus sintomas ao acordar?",
            "Quão limitado você tem estado em suas atividades?",
            "O quanto de falta de ar você teve?",
            "Quanto tempo você teve chiado?",
            "Quantos jatos de broncodilatador foram usado por dia?",
            "VEF1 % previsto?"
        )
    )

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion1, name='Pergunta 1'),row=1, col=1
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["Nunca", "Quase nunca","Poucas vezes","Várias vezes","Muitas vezes","Muitíssimas vezes","Incapaz de dormir"],
                tickvals=[0, 1,2,3,4,5,6],

        row=1, col=1
    )   

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion2, name='Pergunta 2'),row=1, col=2
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["Sem sintomas", " Muito leves","Leves","Moderados","Tanto graves","Graves","Muito graves"],
                tickvals=[0, 1,2,3,4,5,6],

        row=1, col=2
    )

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion3, name='Pergunta 3'),row=2, col=1
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["Nada limitado", "Muito pouco","Pouco","Moderadamente","Muito","Extremamente","Totalmente"],
                tickvals=[0, 1,2,3,4,5,6],

        row=2, col=1
    )

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion4, name='Pergunta 4'),row=2, col=2
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["Nenhuma", "Muito pouca","Alguma","Moderada","Bastante","Muita","Muitíssima"],
                tickvals=[0, 1,2,3,4,5,6],

        row=2, col=2
    )

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion5, name='Pergunta 5'),row=3, col=1
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["Nunca", "Quase nunca","Pouco tempo","Algum tempo","Bastante tempo","Quase sempre","Sempre"],
                tickvals=[0, 1,2,3,4,5,6],

        row=3, col=1
    )

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion6, name='Pergunta 6'),row=3, col=2
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["Nenhum", "1-2 jatos","3-4 jatos","5-8 jatos","9-12 jatos","13-16 jatos","+ 16 jatos"],
                tickvals=[0, 1,2,3,4,5,6],

        row=3, col=2
    )

    fig.add_trace(
        go.Scatter(x=listaData2, y=listaquestion7, name='Pergunta 7'),row=4, col=1
    )
    fig.update_yaxes(

                range=[0,6],
                ticktext=["> 95% do previsto", "95-90% do previsto","89-80% do previsto","79-70% do previsto","69-60% do previsto","59-50% do previsto","< 50% do previsto"],
                tickvals=[0, 1,2,3,4,5,6],

        row=4, col=1
    )

    

    # Add range slider
    fig.update_xaxes( row=4, col=1,
        rangeslider=dict(
            visible=True
        ),
        type="date"
    )
    fig.update_xaxes( row=1, col=1,
        rangeselector=dict(
                buttons=list([
                    dict(count=7,
                        label="week",
                        step="day",
                        stepmode="backward"),
                    dict(count=14,
                        label="2 weeks",
                        step="day",
                        stepmode="backward"),
                    dict(count=1,
                        label="This month",
                        step="month",
                        stepmode="todate"),
                    dict(count=1,
                        label="1y",
                        step="year",
                        stepmode="backward"),
                    dict(step="all")
                ])
            ),
            rangeslider=dict(
                visible=False
            ),
            type="date"
    )
    fig['layout'].update(
        height=1000
    )
    fig.update_xaxes(matches='x')
    figQuestSemanal = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)



    #GRafico - Barreiras

    dates = listaDate3
    a = listaInteresse
    b = listaTempo
    c = listaEnergia
    d = listaFaltaAr
    e = listaCompanhia
    f = listaDinheiro
    g = listaCoisa
    h = listaSeguranca
    i = listaClima
    j = listaEquipamentos
    fig = go.Figure()
    # Add traces, one for each slider step
    for step in range(len(dates)):
        fig_inside = go.Bar(
                visible=False,
                name=dates[step],
                x= ["Não tenho interesse","Falta de tempo","Não tenho energia<br>ou disposição","Tenho medo de sentir<br>falta de ar","Não tenho companhia<br>ou incentivo","Não tenho dinheiro","Tenho muitas coisas<br>para fazer","Não tenho um<br>local seguro","Por causa do clima","Não tenho equipamentos"],
                y= [int(a[step])-0.9,int(b[step])-0.9,int(c[step])-0.9,int(d[step])-0.9,int(e[step])-0.9,int(f[step])-0.9,int(g[step])-0.9,int(h[step])-0.9,int(i[step])-0.9,int(j[step])-0.9], 
                text = dates[step]
        )
        fig.add_trace(fig_inside)
        fig.update_layout(
            yaxis= dict(
                range=[0, 4.1],
                ticktext=["Nunca", "Raramente", "Às vezes", "Quase sempre", "Sempre"],
                tickvals=[0.1, 1.1, 2.1, 3.1, 4.1]
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

    fig['layout'].update(
        height=600
    )
    barreiras = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)


    # 7 days
    fig = go.Figure()

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = dados7diasSedentaryMinutes,
        title = {"text": "Total de minutos<br>sedentários<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        domain = {'x': [0, 0.25], 'y': [0, 1]},
        delta = {'reference': dados7PasdiasSedentaryMinutes, 'relative': True}))

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = dados7diasVeryActiveMinutes,
        title = {"text": "Total de minutos<br>em atividade<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        delta = {'reference': dados7PasdiasVeryActiveMinutes, 'relative': True},
        domain = {'x': [0.26, 0.5], 'y': [0, 1]}))

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = dados7diasLightlyActiveMinutes,
        title = {"text": "Total de minutos<br>em atividade leve<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        delta = {'reference': dados7PasdiasLightlyActiveMinutes, 'relative': True},
        domain = {'x': [0.51, 0.75], 'y': [0, 1]}))

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = dados7diasSteps,
        title = {"text": "Total de passos<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        delta = {'reference': dados7PasdiasSteps, 'relative': True},
        domain = {'x': [0.76, 1], 'y': [0, 1]}))

    fitbit7dias = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)

    ###################################

    #Grafico de fitbit data

    # Create figure
    fig = go.Figure()

    fig.add_trace(
        go.Scatter(x=listaDiaFitbit, y=listaSteps, name='Passos')
    )    
    fig.add_trace(
        go.Scatter(x=listaDiaFitbit, y=listaSedentaryMinutes, name='Minutos sedentários')
    )
    fig.add_trace(
        go.Scatter(x=listaDiaFitbit, y=listaLightlyActiveMinutes, name='Minutos de\natividades leves')
    )
    fig.add_trace(
        go.Scatter(x=listaDiaFitbit, y=listaVeryActiveMinutes, name='Minutos ativos')
    )
    
    # Add range slider
    fig.update_layout(
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=7,
                        label="week",
                        step="day",
                        stepmode="backward"),
                    dict(count=14,
                        label="2 weeks",
                        step="day",
                        stepmode="backward"),
                    dict(count=1,
                        label="This month",
                        step="month",
                        stepmode="todate"),
                    dict(count=1,
                        label="1 month",
                        step="month",
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
    figFitBitData = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)

    
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
            'figFluxoAr':figFluxoAr,
            'figQuestSemanal':figQuestSemanal,
            'barreiras':barreiras,
            'fitbit7dias':fitbit7dias,
            'figFitBitData':figFitBitData
            }
        )


#####################################################################################################################
@login_required
def estats(request):
    #Numero de respostas - Questionario diário
    usuariosAtivosUltimos7Dias = []
    usuariosAtivosPenultimos7Dias = []
    try:
        #Ultimos 7
        date7dayback = (datetime.datetime.today() - datetime.timedelta(days=7))#.strftime("%Y-%m-%d")
        dailycontrol = DailyControl.objects.all().filter(date__gte=date7dayback)
        numQuestDiarioUltimos7dias=len(dailycontrol)
        usuariosAtivosUltimos7Dias.extend(dailycontrol.values_list('user_id', flat=True))
        #Ultimos 7
        date8dayback = (datetime.datetime.today() - datetime.timedelta(days=8))#.strftime("%Y-%m-%d")
        date14dayback = (datetime.datetime.today() - datetime.timedelta(days=14))#.strftime("%Y-%m-%d")
        dailycontrol = DailyControl.objects.all().filter(date__lte=date8dayback).filter(date__gte=date14dayback)
        numQuestDiarioPenultimos7dias=len(dailycontrol)
        usuariosAtivosPenultimos7Dias.extend(dailycontrol.values_list('user_id', flat=True))
    except:
        numQuestDiarioUltimos7dias=0
        numQuestDiarioPenultimos7dias=0
    
    #Numero de respostas - Questionario diário
    try:
        #Ultimos 7
        date7dayback = (datetime.datetime.today() - datetime.timedelta(days=7))#.strftime("%Y-%m-%d")
        asthmaControlData = AsthmaControlQuestionnaire.objects.all().filter(date__gte=date7dayback)
        numAsthmaControlUltimos7dias=len(asthmaControlData)
        usuariosAtivosUltimos7Dias.extend(dailycontrol.values_list('user_id', flat=True))
        #Ultimos 7
        date8dayback = (datetime.datetime.today() - datetime.timedelta(days=8))#.strftime("%Y-%m-%d")
        date14dayback = (datetime.datetime.today() - datetime.timedelta(days=14))#.strftime("%Y-%m-%d")
        asthmaControlData = AsthmaControlQuestionnaire.objects.all().filter(date__lte=date8dayback).filter(date__gte=date14dayback)
        numAsthmaControlPenultimos7dias=len(asthmaControlData)
        usuariosAtivosPenultimos7Dias.extend(dailycontrol.values_list('user_id', flat=True))
    except:
        numAsthmaControlUltimos7dias=0
        numAsthmaControlPenultimos7dias=0
    
    #Numero de respostas - Questionario diário
    try:
        #Ultimos 7
        date7dayback = (datetime.datetime.today() - datetime.timedelta(days=7))#.strftime("%Y-%m-%d")
        barreirasData = PracticeBarriers.objects.all().filter(date__gte=date7dayback)
        numBarreirasUltimos7dias=len(barreirasData)
        usuariosAtivosUltimos7Dias.extend(dailycontrol.values_list('user_id', flat=True))
        #Ultimos 7
        date8dayback = (datetime.datetime.today() - datetime.timedelta(days=8))#.strftime("%Y-%m-%d")
        date14dayback = (datetime.datetime.today() - datetime.timedelta(days=14))#.strftime("%Y-%m-%d")
        barreirasData = PracticeBarriers.objects.all().filter(date__lte=date8dayback).filter(date__gte=date14dayback)
        numBarreirasPenultimos7dias=len(barreirasData)
        usuariosAtivosPenultimos7Dias.extend(dailycontrol.values_list('user_id', flat=True))
    except:
        numBarreirasUltimos7dias=0
        numBarreirasPenultimos7dias=0

    # Questionario Diario
    try:
        date30dayback = (datetime.datetime.today() - datetime.timedelta(days=30))
        dailycontrolLista = DailyControl.objects.all().filter(date__gte=date30dayback)
        listaDatasDailyControl = []
        dadosDailyControlDict = {
            'tosse': dict(texto= "Apresentou tosse?", lista_sim=[], lista_nao =[]),
            'chiado': dict(texto= "Apresentou chiado?", lista_sim=[], lista_nao =[]),
            'ar': dict(texto= "Teve falta de ar?", lista_sim=[], lista_nao =[]),
            'dormir': dict(texto= "Teve problemas ao dormir?", lista_sim=[], lista_nao =[]),
            'bombinha': dict(texto= "Usou a bombinha?", lista_sim=[], lista_nao =[])
        }
        for i in range(0,31,1):
            listaDatasDailyControl.append((datetime.datetime.today() - datetime.timedelta(days=30) + datetime.timedelta(days=i)).strftime("%Y-%m-%d"))
            dailycontrol = dailycontrolLista.filter(date=(datetime.datetime.today() - datetime.timedelta(days=30) + datetime.timedelta(days=i)))

            lista_tosse = dailycontrol.values_list('tosse', flat=True)
            dadosDailyControlDict['tosse']['lista_sim'].append(sum(lista_tosse))
            dadosDailyControlDict['tosse']['lista_nao'].append(len(lista_tosse) - sum(lista_tosse))

            lista_chiado = dailycontrol.values_list('chiado', flat=True)
            dadosDailyControlDict['chiado']['lista_sim'].append(sum(lista_chiado))
            dadosDailyControlDict['chiado']['lista_nao'].append(len(lista_chiado) - sum(lista_chiado))

            lista_faltaDeAr = dailycontrol.values_list('faltaDeAr', flat=True)
            dadosDailyControlDict['ar']['lista_sim'].append(sum(lista_faltaDeAr))
            dadosDailyControlDict['ar']['lista_nao'].append(len(lista_faltaDeAr) - sum(lista_faltaDeAr))

            lista_acordar = dailycontrol.values_list('acordar', flat=True)
            dadosDailyControlDict['dormir']['lista_sim'].append(sum(lista_acordar))
            dadosDailyControlDict['dormir']['lista_nao'].append(len(lista_acordar) - sum(lista_acordar))

            lista_bombinha = dailycontrol.values_list('bombinha', flat=True)
            dadosDailyControlDict['bombinha']['lista_sim'].append(sum(lista_bombinha))
            dadosDailyControlDict['bombinha']['lista_nao'].append(len(lista_bombinha) - sum(lista_bombinha))



    except Exception:
        traceback.print_exc()
        listaDatasDailyControl = ["0000-00-00"]
        dadosDailyControlDict = {
            'tosse': dict(texto= "Apresentou tosse?", lista_sim=[0], lista_nao =[0]),
            'chiado': dict(texto= "Apresentou chiado?", lista_sim=[0], lista_nao =[0]),
            'ar': dict(texto= "Teve falta de ar?", lista_sim=[0], lista_nao =[0]),
            'dormir': dict(texto= "Teve problemas ao dormir?", lista_sim=[0], lista_nao =[0]),
            'bombinha': dict(texto= "Usou a bombinha?", lista_sim=[0], lista_nao =[0])
        }

    # Questionario Barreiras
    try:
        date30dayback = (datetime.datetime.today() - datetime.timedelta(days=30))
        barreiras_list = PracticeBarriers.objects.all().filter(date__gte=date30dayback)
        listaBarreiraNames = ["Não tenho interesse","Falta de tempo","Não tenho energia<br>ou disposição","Tenho medo de sentir<br>falta de ar","Não tenho companhia<br>ou incentivo","Não tenho dinheiro","Tenho muitas coisas<br>para fazer","Não tenho um<br>local seguro","Por causa do clima","Não tenho equipamentos"]
        lista_nunca=[]
        lista_raramente =[]
        lista_vezes =[]
        lista_quase =[]
        lista_sempre =[]
        
        barreiraValor = barreiras_list#.order_by('user_id', 'date')#.distinct('user_id')

        lista_simples = barreiraValor.values_list('interesse', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('tempo', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('energia', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('faltaAr', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('companhia', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('dinheiro', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('coisas', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('seguranca', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('clima', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))

        lista_simples = barreiraValor.values_list('equipamentos', flat=True)
        lista_nunca.append(len([1  for x in lista_simples if x=="0"]))
        lista_raramente.append(len([1 for x in lista_simples if x=="1"]))
        lista_vezes.append(len([1 for x in lista_simples if x=="2"]))
        lista_quase.append(len([1 for x in lista_simples if x=="3"]))
        lista_sempre.append(len([1 for x in lista_simples if x=="4"]))



    except Exception:
        print("Algo")
        traceback.print_exc()
        listaBarreiraNames = ["Não tenho interesse","Falta de tempo","Não tenho energia<br>ou disposição","Tenho medo de sentir<br>falta de ar","Não tenho companhia<br>ou incentivo","Não tenho dinheiro","Tenho muitas coisas<br>para fazer","Não tenho um<br>local seguro","Por causa do clima","Não tenho equipamentos"]
        lista_nunca=[0 for x in listaBarreiraNames]
        lista_raramente =[0 for x in listaBarreiraNames]
        lista_vezes =[0 for x in listaBarreiraNames]
        lista_quase =[0 for x in listaBarreiraNames]
        lista_sempre =[0 for x in listaBarreiraNames]

    # 7 days
    fig = go.Figure()

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = numQuestDiarioUltimos7dias,
        title = {"text": "Respostas<br>Questionário diário<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        domain = {'x': [0, 0.25], 'y': [0, 1]},
        delta = {'reference': numQuestDiarioPenultimos7dias, 'relative': True}))

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = numAsthmaControlUltimos7dias,
        title = {"text": "Respostas<br>Controle de Asma<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        delta = {'reference': numAsthmaControlPenultimos7dias, 'relative': True},
        domain = {'x': [0.26, 0.5], 'y': [0, 1]}))

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = numBarreirasUltimos7dias,
        title = {"text": "Respostas<br>Questionário de barreiras<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        delta = {'reference': numBarreirasPenultimos7dias, 'relative': True},
        domain = {'x': [0.51, 0.75], 'y': [0, 1]}))

    fig.add_trace(go.Indicator(
        mode = "number+delta",
        value = len(list(set(usuariosAtivosUltimos7Dias))),
        title = {"text": "Usuários ativos<br>Questionários<br><span style='font-size:0.8em;color:gray'>últimos 7 dias</span><br>"},
        delta = {'reference': len(list(set(usuariosAtivosPenultimos7Dias))), 'relative': True},
        domain = {'x': [0.76, 1], 'y': [0, 1]}))

    fitbit7dias = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)
    print(list(set(usuariosAtivosUltimos7Dias)))
    print(list(set(usuariosAtivosPenultimos7Dias)))


    # Graph Stacked - Daily
    x=listaDatasDailyControl
    fig = go.Figure()
    cont = 0
    for k in list(dadosDailyControlDict.keys()):
        print(dadosDailyControlDict[k]['lista_sim'],dadosDailyControlDict[k]['lista_nao'])
        fig.add_trace(go.Scatter(
            x=x, y=dadosDailyControlDict[k]['lista_sim'],
            mode='lines',
            name="Sim",
            visible=cont==0,
            line=dict(width=0.5, color='rgb(241, 111, 108)'),
            stackgroup=dadosDailyControlDict[k]['texto'],
            groupnorm='percent' # sets the normalization for the sum of the stackgroup
        ))

        fig.add_trace(go.Scatter(
            x=x, y=dadosDailyControlDict[k]['lista_nao'],
            mode='lines',
            name="Não",
            visible=cont==0,
            line=dict(width=0.5, color='rgb(148, 212, 131)'),
            stackgroup=dadosDailyControlDict[k]['texto'],
            groupnorm='percent' # sets the normalization for the sum of the stackgroup
        ))
        cont +=1

    lista_valores = []
    cont = 0
    for k in list(dadosDailyControlDict.keys()):
        lista_false = [False]*2*len(list(dadosDailyControlDict.keys()))
        lista_false[cont] = True
        lista_false[cont+1] = True
        lista_valores.append(
            dict(
                label=k,
                method="update",
                args=[{"visible": lista_false[:]},
                    {"title": dadosDailyControlDict[k]['texto']}])
        )
        cont+=2

    fig.update_layout(
        showlegend=True,
        xaxis_type='category',
        yaxis=dict(
            type='linear',
            range=[1, 100],
            ticksuffix='%'))

    fig.update_layout(
        updatemenus=[
            dict(
                type="buttons",
                direction="right",
                active=0,
                x=0.57,
                y=1.2,
                buttons=lista_valores,
            )
        ])

    # Set title
    fig.update_layout(
        title_text="Apresentou tosse?",
        xaxis_domain=[0.05, 1.0]
    )
    
    stacked = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)


    #### Graph Barreiras
    fig = go.Figure()

    fig.add_trace(go.Scatter(
        x=listaBarreiraNames, y=lista_nunca,
        mode='lines',
        name="Nunca",
        line=dict(width=0.5, color='rgb(86, 217, 86)'),
        stackgroup="A",
        groupnorm='percent' # sets the normalization for the sum of the stackgroup
    ))
    fig.add_trace(go.Scatter(
        x=listaBarreiraNames, y=lista_raramente,
        mode='lines',
        name="Raramente",
        line=dict(width=0.5, color='rgb(166, 217, 24)'),
        stackgroup="A",
        groupnorm='percent' # sets the normalization for the sum of the stackgroup
    ))
    fig.add_trace(go.Scatter(
        x=listaBarreiraNames, y=lista_vezes,
        mode='lines',
        name="Às vezes",
        line=dict(width=0.5, color='rgb(217, 217, 24)'),
        stackgroup="A",
        groupnorm='percent' # sets the normalization for the sum of the stackgroup
    ))
    fig.add_trace(go.Scatter(
        x=listaBarreiraNames, y=lista_quase,
        mode='lines',
        name="Quase sempre",
        line=dict(width=0.5, color='rgb(209, 80, 61)'),
        stackgroup="A",
        groupnorm='percent' # sets the normalization for the sum of the stackgroup
    ))
    fig.add_trace(go.Scatter(
        x=listaBarreiraNames, y=lista_sempre,
        mode='lines',
        name="Sempre",
        line=dict(width=0.5, color='rgb(245, 67, 31)'),
        stackgroup="A",
        groupnorm='percent' # sets the normalization for the sum of the stackgroup
    ))

    barreiras = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)



    return render(request, 'logged/estats.html', context={
        'fitbit7dias':fitbit7dias,
        'stacked' : stacked,
        'barreiras':barreiras
    })


def pageMetas(request,username):
    if request.method == 'POST':
        goalform = GoalForm(data=request.POST)
        if goalform.is_valid():
            goalform.user = username
            goalform.save()
            return HttpResponseRedirect(reverse('metas'))
    else:
        try:
            date60dayback = (datetime.datetime.today() - datetime.timedelta(days=60))
            metasDados = Goal.objects.all().filter(user_id=username).filter(startDate__gte=date60dayback)
            if len(metasDados)!=0:
                metasDadosLista = metasDados.values_list('activity','quantity','unit','startDate','endDate')
            else:
                metasDadosLista =[('Vazio',0,'Vazio','0000-00-00','0000-00-00')]
            print(metasDadosLista)
        except Exception:
            traceback.print_exc()
            metasDadosLista =[('Falha',0,'Falha','0000-00-00','0000-00-00')]
            
        print(metasDadosLista)
        goalform = GoalForm()
    return render(request, 'logged/metas.html',{'metasDadosLista':metasDadosLista,'goalform':goalform})
####################### Downloads #######################
@login_required
def downloadBarreiras(request):
    response = HttpResponse(content_type = 'text/csv')

    writer = csv.writer(response)
    writer.writerow(['user_id','date','interesse','tempo','energia','faltaAr','companhia','dinheiro','coisas','seguranca','clima','equipamentos'])

    for row in PracticeBarriers.objects.all().values_list('user_id','date','interesse','tempo','energia','faltaAr','companhia','dinheiro','coisas','seguranca','clima','equipamentos'):
        writer.writerow(row)

    response['Content-Disposition'] = 'attachment; filename="barreiras.csv"'
    return response

@login_required
def downloadDaily(request):
    response = HttpResponse(content_type = 'text/csv')

    writer = csv.writer(response)
    writer.writerow(['user_id','date','pico1','pico2','pico3','tosse','chiado','faltaDeAr','acordar','bombinha','notes'])

    for row in DailyControl.objects.all().values_list('user_id','date','pico1','pico2','pico3','tosse','chiado','faltaDeAr','acordar','bombinha','notes'):
        writer.writerow(row)

    response['Content-Disposition'] = 'attachment; filename="daily_control.csv"'
    return response

@login_required
def downloadAsthmaControlQuestionnaire(request):
    response = HttpResponse(content_type = 'text/csv')

    writer = csv.writer(response)
    writer.writerow(['user_id','date','question1','question2','question3','question4','question5','question6','question7'])

    for row in AsthmaControlQuestionnaire.objects.all().values_list('user_id','date','question1','question2','question3','question4','question5','question6','question7'):
        writer.writerow(row)

    response['Content-Disposition'] = 'attachment; filename="asthma_control_questionnaire.csv"'
    return response

@login_required
def downloadFitBitData(request):
    response = HttpResponse(content_type = 'text/csv')

    writer = csv.writer(response)
    writer.writerow(['user_id','date','steps','sedentaryMinutes','lightlyActiveMinutes','veryActiveMinutes'])

    usuariosFitBit = FitbitProfile.objects.all().exclude(accessToken__isnull=True).exclude(accessToken='').values_list('user', flat=True)

    

    day60List = []
    for i in range(1,61,1):
        day60List.append((datetime.datetime.today() - datetime.timedelta(days=i)).strftime("%Y-%m-%d"))

    for user_id_ind in usuariosFitBit:
        try:
            print(user_id_ind,User.objects.get(id=user_id_ind))
            dados60dias = getFitbitData(user=User.objects.get(id=user_id_ind),dates=day60List)
            for day in sorted(dados60dias.keys(),reverse=True):
                writer.writerow([user_id_ind, day, dados60dias[day]["summary"]["steps"], dados60dias[day]["summary"]["sedentaryMinutes"], dados60dias[day]["summary"]["lightlyActiveMinutes"], dados60dias[day]["summary"]["veryActiveMinutes"]])
        except Exception:
            traceback.print_exc()

    print(usuariosFitBit)
    response['Content-Disposition'] = 'attachment; filename="fitbit_dados.csv"'
    return response

@login_required
def downloadUserProfileInfo(request):
    response = HttpResponse(content_type = 'text/csv')

    writer = csv.writer(response)
    writer.writerow(['user_id','user','nome','sobrenome','rg','altura','peso','token','nascimento'])

    for row in UserProfileInfo.objects.all().values_list('user_id','user','nome','sobrenome','rg','altura','peso','token','nascimento'):
        writer.writerow(row)

    response['Content-Disposition'] = 'attachment; filename="user_profile_info.csv"'
    return response

def tableTest(request):
    return render(request, 'logged/table_test.html', {})


def tableTest2(request,username):
    print(username)
    return render(request, 'logged/table_test.html', {})
