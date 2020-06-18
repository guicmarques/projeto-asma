# projeto-asma
Projeto do Laboratório de Engenharia de Software da Poli-USP em parceria com a Faculdade de Medicina da USP

## Requerimentos

Para executar esse programa, é necessário ter alguma versão de python > 3.7. Em seguida, basta instalar os pacotes com o seguinte comando:
```
$ pip install -r requirements.txt
```

É necessário instalar a biblioteca responsável pela conexão à fitbit.

- À partir da pasta projeto-asma, insira os seguintes comandos
```
$ cd fitbit
```
```
$ python setup.py install
```

## Rodar o servidor
- na primeira vez, rode os seguintes comandos:

```
$ python manage.py makemigrations
```
```
$ python manage.py migrate
```
- para criar um usuario de admin do banco de dados, insira o seguinte comando e complete as informações:

```
$ python manage.py createsuperuser
```

- para rodar o servidor de fato:
```
$ python manage.py runsslserver 0.0.0.0:8000
```


## API description /rest
### POST requests:
- /rest/token/ - Geração de um token de autenticação
    - Body: ```{"username": username ou cpf, "password": password}```
    - Response: ```{"refresh": refresh_token, "access": access_token}```

- /rest/token/refresh/ - Refresh do token de autenticação de um usuário
    - Body: ```{"refresh": refresh_token}```
    - Response: ```{"access": access_token}```

- /rest/register/ - Cria um novo usuário
    - Body: ```{"username": cpf, "password": senha, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": RGHC, "nascimento": "yyyy-mm-dd"}```
    - campos obrigatórios do Body: ```["username", "email", "password"]```
    - Response: ```{"missingData": bool, "created": bool}``` (onde missingData = True indica se falta algum dado obrigatório e created = False indica que o usuário já existe, se houver algum erro ao salvar, missingData será o erro)

- /rest/change_password/ - Altera a senha do usuário
    - Body: ```{"username": cpf/username, "password": nova senha}```
    - Response: ```{"updated": True ou mensagem de erro}```

- /rest/questionnaire/ - Registra as respostas do questionário, sendo permitido apenas um questionário por dia (chamar o endpoint mais de uma vez no mesmo dia, para o mesmo usuário, atualiza as respostas para aquele dia)
    - Authentication: Bearer ```access_token```
    - Body: ```{"1": resposta1, "2": resposta2, "3": resposta3, "4": resposta4, "5": resposta5, "6": resposta6, "7": resposta7}``` (as respostas devem ser, obrigatoriamente, números entre 0 e 6)
    - Response: ```{"created": bool}``` (criado = True se a operação de salvar no banco de dados tiver funcionado, caso contrário retorna o erro)

- /rest/daily/ - Registra diário de sintomas:
    - Authentication: Bearer ```access_token```
    - Body: ```{"note": nota escrita do dia, "pico": [pico1, pico2, pico3], "tosse": bool, "chiado": bool, "faltaAr": bool, "acordar": bool, "bombinha": bool}``` - só pode ser criada uma entrada por dia, ao enviar mais de uma, altera a mais recente
    - Response ```{"created": True ou mensagem de erro}```

- /rest/fitbit/ - Obtém os dados da fitbit
    - Authentication: Bearer ```access_token```
    - Body: ```{"date": ["yyyy-mm-dd", ...] ou "yyyy-mm-dd"}``` - se date for passada como uma string vazia, retornará o dia de hoje, se for passada como uma lista, retornará todos os dias como chaves do dicionário e se for passada uma string, retornará o dia correspondente
    - Response: o formato especificado se encontra na seção "Formato do payload Fitbit Activity"

    **DEPRECADO - utilize o método acima para dados reais**
    - Body: ```{"date": dia/mês/ano, "category": alguma categoria de dados da fitbit}``` - se for passada uma string vazia como category e/ou date, não haverá filtragem do parâmetro, obtendo todas as entradas - em teste, só existem as categorias ```heart-rate``` e ```daily-steps```
    - Response: ```{"data":[{"date": data, "category": categoria, "data": ["nome da coluna": dados, ...}, ...]}```

- /rest/goals/ - Cria uma meta do usuário:
    - Authentication: Bearer ```access_token```
    - Body: ```{"activity": Nome da atividade, "quantity": int(quantidade), "unit": str(unidade de medida), "daysToEnd": dias até o fim da meta}``` - só pode ser criada uma meta por nome de atividade, os requests seguintes com o mesmo nome serão considerados updates da meta
    - Response ```{"created": True ou mensagem de erro}```

- /rest/milestones/ - Cria uma nova conquista (só pode haver uma conquista com o mesmo nome)
    - Authentication: Bearer ```access_token```
    - Body: ```{"name": nome da conquista, "level": nivel da conquista (máx. 10 digitos), "quantity": quantidade para obter a conquista (máx. 10 digitos)}```
    - Response ```{"created": True ou mensagem de erro}```

-/rest/barriers/ - Cria uma nova entrada de barreiras para a prática. São aceitos valores de 1 a 5, correspondentes a Nunca, Raramente, Às vezes, Quase Sempre e Sempre, respectivamente. Os motivos são representados por uma palavra chave, como pode ser visto a seguir.
    - Authentication: Bearer ```access_token```
    - Body: ```{"interesse": valor, "tempo": valor, "energia": valor, "faltaAr": valor, "companhia": valor, "dinheiro": valor, "coisas": valor, "seguranca": valor, "clima": valor, "equipamentos": valor}```
    - Response ```{"created": True ou mensagem de erro}```

- /rest/watson/ - Envia pergunta ao chatbot Watson Assistant
    - Authentication: Bearer ```access_token```
    - Body: ```{"text": texto com a pergunta da pessoa}```
    - Response ```{"intent": intent da pergunta, "responses": lista de mensagens retornadas pelo chatbot}```

### GET requests:

- /rest/user_data/ - Retorna as informações do usuário
    - Authentication: Bearer ```access_token```
    - Response: ```{"username": cpf, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": RGHC, "tokenValidado": bool, "nascimento": yyyy-mm-dd}``` ou ```{"username": cpf, "email": email, "tokenValidado": bool}``` se as outras informações não estiverem presentes

- /rest/questionnaire
    - Authentication: Bearer ```access_token```
    - Response: ```{"dates": ["yyyy-mm-dd", ...]}```

- /rest/goals/ - Cria uma meta do usuário:
    - Authentication: Bearer ```access_token```
    - Response: ```{"activeGoals": [{"activity": nome da atividade, "quantity": quantidade, "unit": unidade de medida, "startDate": dia em que a meta foi criada, "endDate": dia final da meta}, ...], "inactiveGoals": {{"activity": nome da atividade, "quantity": quantidade, "unit": unidade de medida, "startDate": data em que a meta foi criada, "endDate": data final da meta}, ...]}```

- /rest/daily/ - Cria uma meta do usuário:
    - Authentication: Bearer ```access_token```
    - Response ```{yyyy-mm-dd: {"note": nota escrita do dia, "pico": [pico1, pico2, pico3], "tosse": bool, "chiado": bool, "faltaAr": bool, "acordar": bool, "bombinha": bool}, ...}```

- /rest/exercises - Obtém exercícios à partir de um arquivo JSON
    - Authentication: Bearer ```access_token```
    - Query: ```id=id do exercício``` - caso nada seja passado, será entregue o dicionário completo
    - Response: será retornado o dicionário presente em ```media/exercicios.json``` ou o corpo do id correspondente

- /rest/milestones/ - Obtém dados de conquista de acordo com o valor passado no body
    - Authentication: Bearer ```access_token```
    - Query: ```info``` - será retornados dados sobre a performance da pessoa
    - Response ```{"weekly": máximo de semanas consecutivas respondendo questionário semanal, "daily": máximo de dias consecutivos respondendo questionário diário, "steps": máximo de dias consecutivos batendo meta de passos}```
    
    **ou**
    
    - Query: ```find``` - serão retornados as conquistas do usuário
    - Response ```{nome da conquista 1: {"level": nivel da conquista, "quantity": quantidade para obter a conquista}, nome da conquista 2: ...}```

- /rest/barriers/ - são retornadas as datas em que o questionário de bareiras foi respondido
    - Authentication: Bearer ```access_token```
    - Response: ```{"dates": ["yyyy-mm-dd", ...]}```

### PUT requests:
- /rest/user_data/ - Atualiza (ou cria, se não existir) as informações do usuário
    - Authentication: Bearer ```access_token```
    - Response: ```{"dates": bool}``` (booleano indicando se a operação de atualização teve sucesso)

## Formato do payload Fitbit Activity (dados padrão)
```
{
    "2020-06-01": {
        "activities": [],
        "goals": {
            "activeMinutes": 30,
            "caloriesOut": 3021,
            "distance": 5,
            "steps": 10000
        },
        "summary": {
            "activeScore": -1,
            "activityCalories": 0,
            "caloriesBMR": 1513,
            "caloriesOut": 1513,
            "distances": [
                {
                    "activity": "total",
                    "distance": 0
                },
                {
                    "activity": "tracker",
                    "distance": 0
                },
                {
                    "activity": "loggedActivities",
                    "distance": 0
                },
                {
                    "activity": "veryActive",
                    "distance": 0
                },
                {
                    "activity": "moderatelyActive",
                    "distance": 0
                },
                {
                    "activity": "lightlyActive",
                    "distance": 0
                },
                {
                    "activity": "sedentaryActive",
                    "distance": 0
                }
            ],
            "fairlyActiveMinutes": 0,
            "lightlyActiveMinutes": 0,
            "marginalCalories": 0,
            "sedentaryMinutes": 1183,
            "steps": 0,
            "veryActiveMinutes": 0
        }
    }
    "2020-06-02": ...
    .
    .
    .
}
```