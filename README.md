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
- /rest/token/

body: ```{"username": username, "password": password}```

response: ```{"refresh": refresh_token, "access": acces_token}```

- /rest/token/refresh/

body: ```{"refresh": refresh_token}```

response: ```{"access": acces_token}```


## Configs manuais
- ao criar um novo banco de dados, defina a permissão de alteração dos dados para cada grupo
    - localhost:8000/admin -> inserir login de admin
    - Groups -> Pacientes -> Permissions
    - definir todas as permissões ```server | user profile info``` e a persmissão ```auth | user | Can view user``` para Chosen Permissions


### TODO
- [api fitbit](https://github.com/iccir919/pulseWatch/blob/master/public/intraday.js)