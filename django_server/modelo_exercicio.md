# Exercícios

Para que o aplicativo identifique um novo exercício adicionado, é necessário que o administrador do serviço utilize uma notação previamente determinada. O arquivo atual se encontra na pasta ```django_server/media/exercicios.json```. Esse arquivo segue o formato JSON, no seguinte padrão:

```
{
    "0": {
        "id": 0,
        "video": "https://www.youtube.com/embed/74G6kn0vjPQ",
        "nome": "Flexão",
        "repeticoes": 30,
        "tempo": 5,
        "descricao": "Exercício que pode ser feito em qualquer lugar e que envolve diversos grupos musculares. Se não conseguir fazer como no vídeo, tente faça com os joelhos apoiados no chão."
    }
}
```

Os campos são os seguintes:

- ```id```: identificação do exercicio, deve ser o mesmo que o índice externo do objeto, mas sem aspas
- ```video```: endereço do vídeo no Youtube em modo de compartilhamento (```https://www.youtube.com/embed/``` + código do vídeo), entre aspas
- ```repeticoes```: numero de repeticoes sugeridas pelo exercício
- ```tempo```: tempo sugerido pelo exercício
- ```descricao```: breve descrição sobre o exercício