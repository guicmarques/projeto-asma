# FAQ

Para que o aplicativo identifique uma nova pergunta adicionada ao FAQ, é necessário que o administrador do serviço utilize uma notação previamente determinada. O arquivo atual se encontra na pasta ```django_server/media/faq.json```. Esse arquivo segue o formato JSON, no seguinte padrão:

```
{
    "0": {
        "id": 0,
        "pergunta": "Eu sinto asma quando corro. Devo evitar essa atividade?",
        "resposta": "De jeito nenhum! Frequentente apenas se preparar para uma caminhada de forma diferente pode ajudar. Há duas coisas que você deve lembrar. Primeiramente, use sua bombinha 15 minutos antes de começar. Além disso, não se esqueça de se aquecer quando for uma atividade mais intensa."
    }
}
```

Os campos são os seguintes:

- ```id```: identificação da pergunta, deve ser o mesmo que o índice externo do objeto, mas sem aspas
- ```pergunta```: a pergunta em si, entre aspas
- ```resposta```: a resposta para a pergunta, entre aspas