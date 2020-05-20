# projeto-asma
Projeto do Laboratório de Engenharia de Software da Poli-USP em parceria com a Faculdade de Medicina da USP

## Requerimentos

Para executar esse programa, é necessário ter alguma versão de python > 3.7. Em seguida, basta instalar os pacotes com o seguinte comando:
```
pip install -r requirements.txt
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
python manage.py createsuperuser
```

- para rodar o servidor de fato:
```
$ python manage.py runserver 0.0.0.0:8000
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
    - Body: ```{"username": cpf, "password": senha, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": token do HC}```
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
    - Body: ```{"note": nota escrita do dia, "pico": pico (???), "tosse": "true" ou "false", "chiado": "true" ou "false", "faltaAr": "true" ou "false", "acordar": "true" ou "false", "bombinha": "true" ou "false"}``` - só pode ser criada uma entrada por dia, ao enviar mais de uma, altera a mais recente
    - Response ```{"created": True ou mensagem de erro}```

- /rest/fitbit/ - Obtém os dados da fitbit
    - Authentication: Bearer ```access_token```
    - Body: ```{"date": dia/mês/ano, "category": alguma categoria de dados da fitbit}``` - se for passada uma string vazia como category e/ou date, não haverá filtragem do parâmetro, obtendo todas as entradas - em teste, só existe a categoria ```heart-rate```
    - Response ```{"data":[{"date": data, "category": categoria, "data": ["nome da coluna": dados, ...}, ...]}```

- /rest/goals/ - Cria uma meta do usuário:
    - Authentication: Bearer ```access_token```
    - Body: ```{"activity": Nome da atividade, "quantity": int(quantidade), "unit": str(unidade de medida), "daysToEnd": dias até o fim da meta}``` - só pode ser criada uma meta por nome de atividade, os requests seguintes com o mesmo nome serão considerados updates da meta
    - Response ```{"created": True ou mensagem de erro}```

### GET requests:

- /rest/user_data/ - Retorna as informações do usuário
    - Authentication: Bearer ```access_token```
    - Response: ```{"username": cpf, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": token do HC, "tokenValidado": bool}``` ou ```{"username": cpf, "email": email, "tokenValidado": bool}``` se as outras informações não estiverem presentes

- /rest/goals/ - Cria uma meta do usuário:
    - Authentication: Bearer ```access_token```
    - Response ```{"activeGoals": [{"activity": nome da atividade, "quantity": quantidade, "unit": unidade de medida, "startDate": dia em que a meta foi criada, "endDate": dia final da meta}, ...], "inactiveGoals": {{"activity": nome da atividade, "quantity": quantidade, "unit": unidade de medida, "startDate": data em que a meta foi criada, "endDate": data final da meta}, ...]}```

- /rest/daily/ - Cria uma meta do usuário:
    - Authentication: Bearer ```access_token```
    - Response ```{yyyy-mm-dd: {"note": nota escrita do dia, "pico": pico (???), "tosse": "true" ou "false", "chiado": "true" ou "false", "faltaAr": "true" ou "false", "acordar": "true" ou "false", "bombinha": "true" ou "false"}, ...}```



### PUT requests:
- /rest/user_data/ - Atualiza (ou cria, se não existir) as informações do usuário
    - Authentication: Bearer ```access_token```
    - Body: ```{"email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": token do HC}```
    - Response: ```{"updated": bool}``` (booleano indicando se a operação de atualização teve sucesso)


### TODO
- [api fitbit](https://github.com/iccir919/pulseWatch/blob/master/public/intraday.js)