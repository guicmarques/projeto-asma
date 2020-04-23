# projeto-asma
Projeto do Laboratório de Engenharia de Software da Poli-USP em parceria com a Faculdade de Medicina da USP

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
$ python manage.py runserver
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

- /rest/questionnaire/ - Registra as respostas do questionário, sendo permitido apenas um questionário por dia (chamar o endpoint mais de uma vez no mesmo dia, para o mesmo usuário, atualiza as respostas para aquele dia)
    - Authentication: Bearer ```access_token```
    - Body: ```{"1": resposta1, "2": resposta2, "3": resposta3, "4": resposta4, "5": resposta5, "6": resposta6, "7": resposta7}``` (as respostas devem ser, obrigatoriamente, números entre 0 e 6)
    - Response: ```{"created": bool}``` (criado = True se a operação de salvar no banco de dados tiver funcionado, caso contrário retorna o erro)

- /rest/fitbit/ - Obtém os dados da fitbit
    - Authentication: Bearer ```access_token```
    - Body: ```{"date": dia/mês/ano, "category": alguma categoria de dados da fitbit}``` - se for passada uma string vazia como category e/ou date, não haverá filtragem do parâmetro, obtendo todas as entradas - em teste, só existe a categoria ```heart-rate```
    - Response ```{"data":[[data, categoria, "data": dados do sensor], ...]}```

### GET requests:

- /rest/user_data/ - Retorna as informações do usuário
    - Authentication: Bearer ```access_token```
    - Response: ```{"username": cpf, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": token do HC, "tokenValidado": bool}``` ou ```{"username": cpf, "email": email, "tokenValidado": bool}``` se as outras informações não estiverem presentes

### PUT requests:
- /rest/user_data/ - Atualiza (ou cria, se não existir) as informações do usuário
    - Authentication: Bearer ```access_token```
    - Body: ```{"email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "imagem": .jpg em base64, "token": token do HC}```
    - Response: ```{"updated": bool}``` (booleano indicando se a operação de atualização teve sucesso)


## Configs manuais (opcional)
- ao criar um novo banco de dados, defina a permissão de alteração dos dados para cada grupo (não obrigatorio para ambiente DEV)
    - localhost:8000/admin -> inserir login de admin
    - Groups -> Pacientes -> Permissions
    - definir todas as permissões ```server | user profile info``` e a persmissão ```auth | user | Can view user``` para Chosen Permissions


### TODO
- [api fitbit](https://github.com/iccir919/pulseWatch/blob/master/public/intraday.js)