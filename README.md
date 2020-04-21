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
 POST requests:
- /rest/token/ - Geração de um token de autenticação
    - body: ```{"username": username ou cpf, "password": password}```
    - response: ```{"refresh": refresh_token, "access": acces_token}```

- /rest/token/refresh/ - Refresh do token de autenticação de um usuário
    - body: ```{"refresh": refresh_token}```
    - response: ```{"access": acces_token}```

- /rest/register/ - Cria um novo usuário
    - body: ```{"username": cpf, "password": senha, "email": email, "nome": nome, "sobrenome": sobrenome, "rg": RG, "telefone": telefone, "altura": altura, "peso": peso, "token": token do HC}```
    - response: ```{"access": acces_token}```


## Configs manuais
- ao criar um novo banco de dados, defina a permissão de alteração dos dados para cada grupo (não obrigatorio para ambiente DEV)
    - localhost:8000/admin -> inserir login de admin
    - Groups -> Pacientes -> Permissions
    - definir todas as permissões ```server | user profile info``` e a persmissão ```auth | user | Can view user``` para Chosen Permissions


### TODO
- [api fitbit](https://github.com/iccir919/pulseWatch/blob/master/public/intraday.js)