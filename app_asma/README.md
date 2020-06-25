# projeto-asma
Projeto do Laboratório de Engenharia de Software da Poli-USP em parceria com a Faculdade de Medicina da USP e o Hospital das Clínicas.

## Requerimentos
O aplicativo pode ser executado no computador, via localhost, ou no celular Android, via APK.

### No computador
Para executar o programa, é necessário ter instalado em sua máquina Node.js e Ionic CLI. Caso já possua as ferramentas mencionadas, siga para a seção [Execução](#Execução). Do contrário, efetue os seguintes passos.

- Instale a ferramenta **Node.js** em https://nodejs.org/en/.
- Instale o Ionic CLI versão 5.0 através do comando no terminal:

```
$ npm install -g @ionic/cli
```

**Observação:** Para mais informações, acesse https://ionicframework.com/docs/intro/cli.

### No celular
Fazer o download do arquivo ```app-debug.apk``` no aparelho. Este arquivo está presente na pasta ```projeto-asma```.

## Execução

### No computador
Após clonar o repositório em sua máquina:

- Dentro da pasta ```projeto-asma```, navegue para a pasta ```app_asma```:
```
$ cd app_asma
```

- Instale as dependências e os plugins:
```
$ npm i
```

- Para rodar o aplicativo em seu browser:
```
$ ionic serve
```

Caso haja problemas na execução do ```ionic serve``` devido à ausência de algum dos plugins, instale-os manualmente através dos comandos a seguir.
- Storage:
```
$ ionic cordova plugin add cordova-sqlite-storage
$ npm install --save @ionic/storage
```

- Chart.js:
```
$ npm install chart.js --save
```

- Base64:
```
$ ionic cordova plugin add com-badrit-base64
$ npm install @ionic-native/base64
```

### No celular
Instale o arquivo .apk.


## Usuário para teste:
**CPF:** 12345678912

**Senha:** 12345678
