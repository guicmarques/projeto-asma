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
from plotly.subplots import make_subplots
import numpy as np
import pandas as pd

from server.models import User, UserProfileInfo, AsthmaControlQuestionnaire, FitbitFile, DailyControl, PracticeBarriers

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

        barreiras = PracticeBarriers.objects.all().filter(user_id=username)
        print("A")
        if len(barreiras)!=0:
            print("B")
            listaInteresse.append(barreiras.interesse)
            listaTempo.append(barreiras.tempo)
            print("E")
            listaEnergia.append(barreiras.energia)
            listaFaltaAr.append(barreiras.faltaAr)
            listaCompanhia.append(barreiras.companhia)
            print("C")
            listaDinheiro.append(barreiras.dinheiro)
            listaCoisa.append(barreiras.coisas)
            listaSeguranca.append(barreiras.seguranca)
            print("D")
            listaClima.append(barreiras.clima)
            listaEquipamentos.append(barreiras.equipamentos)
            print("F")
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
                text = f[step]
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
                x= ["Não tenho interesse","Falta de tempo","Não tenho energia ou disposição","Tenho medo de sentir falta de ar","Não tenho companhia ou incentivo","Não tenho dinheiro","Tenho muitas coisas para fazer","Não tenho um local seguro","Por causa do clima","Não tenho equipamentos"],
                y= [int(a[step])-0.9,int(b[step])-0.9,int(c[step])-0.9,int(d[step])-0.9,int(e[step])-0.9,int(f[step])-0.9,int(g[step])-0.9,int(h[step])-0.9,int(i[step])-0.9,int(j[step])-0.9], 
                text = f[step]
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

    barreiras = plot({"data":fig},output_type='div', include_plotlyjs=True, show_link=False, link_text="", auto_open=False)



    
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
            'barreiras':barreiras
            }
        )

def tableTest(request):
    return render(request, 'logged/table_test.html', {})


def tableTest2(request,username):
    print(username)
    return render(request, 'logged/table_test.html', {})
