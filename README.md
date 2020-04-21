# projeto-asma
Projeto do Laboratório de Engenharia de Software da Poli-USP em parceria com a Faculdade de Medicina da USP

## Rodar o servidor
- insira os seguintes comandos:

```
$ python manage.py makemigrations
```
```
$ python manage.py migrate
```
```
$ python manage.py runserver
```

- para criar um usuario de admin do banco de dados, insira o seguinte comando e complete as informações:

```
python manage.py createsuperuser
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
    - Body: ```{"username": cpf, "password": senha, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "token": token do HC}```
    - campos obrigatórios do Body: ```["username", "email", "password"]```
    - Response: ```{"missingData": bool, "created": bool}``` (onde missingData == True indica se falta algum dado obrigatório e created == False indica que o usuário já existe)

### GET requests:

- /rest/user_data/ - Retorna as informações do usuário
    - Authentication: Bearer ```acces_token```
    - Response: ```{"username": cpf, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "token": token do HC}``` ou ```{"username": cpf, "email": email}``` se as outras informações não estiverem presentes

### PUT requests
- /rest/user_data/ - Atualiza (ou cria, se não existir) as informações do usuário
    - Authentication: Bearer ```access_token```
    - Body: ```{"email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "token": token do HC}```
    - Response: ```{"updated": bool}``` (booleano indicando se a operação de atualização teve sucesso)


## Configs manuais
- ao criar um novo banco de dados, defina a permissão de alteração dos dados para cada grupo (não obrigatorio para ambiente DEV)
    - localhost:8000/admin -> inserir login de admin
    - Groups -> Pacientes -> Permissions
    - definir todas as permissões ```server | user profile info``` e a persmissão ```auth | user | Can view user``` para Chosen Permissions


### TODO
- [api fitbit](https://github.com/iccir919/pulseWatch/blob/master/public/intraday.js)