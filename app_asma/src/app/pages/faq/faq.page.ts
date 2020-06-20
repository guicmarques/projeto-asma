import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { AlertService } from './../../services/alert.service';
import { FAQService } from './../../services/FAQ.service';
import { Questions } from './../../models/questions.model';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})

export class FaqPage implements OnInit {
  query:string = '';
  searching:boolean;
  // fonte das perguntas: https://ginasthma.org/about-us/faqs/ 
  //https://sbpt.org.br/portal/publico-geral/doencas/asma-perguntas-e-respostas/
  questions: Questions[]=[]; /*= [{
    question:"Eu sinto asma quando corro. Devo evitar essa atividade?",
    answer:"De jeito nenhum! Frequentente apenas se preparar para uma caminhada de forma diferente pode ajudar. Há duas coisas que você deve lembrar. Primeiramente, use sua bombinha 15 minutos antes de começar. Além disso, não se esqueça de se aquecer quando for uma atividade mais intensa.",
    show:true,
    showAnswer:false,
     },
  {
    question:"Existem exercícios mais apropriados para pacientes com asma?",
    answer:  "Exercícios aeróbicos como a natação são uma atividade efetiva, eles permitem exercitar-se em uma variedade de intesidades. O objetivo desse tipo de treino é desenvolver sua respiração e capacidade cardíaca. Aquecimentos como uma corrida leve, onde se aumenta a intensidade por alguns minutos, depois a dimuinui, e aumenta novamente. \n A coisa mais importante é escolher uma atividade que voce aproveite, se não se torna muito fácil de evita-la. É importante encontrar uma atividade que combine com você! ",
    show:true,
    showAnswer:false,
  },
   {
    question:"O quão intensamente devo me exercitar?",
    answer:"O seu treino deve lhe ajudar a ficar em forma gradualmente, mas lembre-se leva tempo. Lembre-se que você deve se não deve se sentir mal após uma sessão de exercícios. É importante que voce não tente fazer treinos excessivos. Você não deve se sentir exausto por horas depois de cada treino. \n Se você tem sintomas de asma enquanto se exercita intensamente, talvez seja um indicativo de que é nescessário maior quantidade de medicação ou pode indicar que sua asma não permite tipos de execícios com tanta intesidade. Neste caso, fale com ser médico para ver o que se deve fazer. ",
    show:true,
    showAnswer:false,
    },
    {
      question:"A asma de todas as pessoas é igual?",
      answer:"A asma varia muito de pessoa para pessoa e num mesmo indivíduo. Tem épocas que pode ser muito leve e os sintomas desaparecerem e tem momentos em que pode piorar muito, necessitando atendimentos de emergência e até mesmo internação.  As crises de asma também podem variar, umas sendo mais fortes do que as outras.",
      show:true,
      showAnswer:false,
      },
      {
      question:"O que são bombinhas?",
      answer:"Bombinha é a maneira que as pessoas chamam todas as medicações inalatórias usadas no tratamento da asma. Esse nome vem dos primeiros dispositivos que surgiram e ainda existem. Na verdade, bombinha quer dizer o recipiente que é utilizado para armazenar os diferentes tipos de remédios (broncodilatadores e corticóides inalatórios). Hoje existem dispositivos com medicação na forma líquida (aerossol) e em pó. Uma mesma substância pode vir sob aerossol ou sob pó. Os médicos preferem usar o termo dispositivo porque retira a ideia de que o remédio é ruim (bomba). Também faz o paciente entender melhor que dispositivo é a maneira como o medicamento será aplicado, tipo comprimido ou supositório. Dentro dele pode vir qualquer tipo de tratamento para a asma.",
      show:true,
      showAnswer:false,
      },
      {
        question:" Bombinhas fazem mal para o coração?",
        answer:"Não. Quando surgiram os primeiros remédios broncodilatadores para asma, eram substâncias que tinham como efeito colateral aceleração do coração (taquicardia). A sensação era bem desconfortável e as pessoas começaram a achar que o remédio atacava o coração. Com as novas e melhores drogas broncodilatadoras e os novos e melhores dispositivos, esse efeito foi desaparecendo. Algumas pessoas ainda têm a sensação de palpitação mas quando isso acontece é porque provavelmente estão inalando os remédios com a técnica errada. Ou porque estão usando na dose errada. Se você engolir 25 comprimidos de dipirona ou paracetamol, vai passar mal e ter muitos efeitos colaterais. Isso não significa que estes remédios fazem mal: você é que usou na dose errada!\n O que faz muito mal para o coração é falta de oxigênio. E uma asma não controlada e em crise causa exatamente essa dificuldade de entregar oxigênio para o coração funcionar. Portanto, as medicações inalatórias para controle da asma são – ao contrário – amigas do coração!",
        show:true,
        showAnswer:false,
      },
      {
      question:"Qual a causa da asma?",
      answer:"A causa exata da asma ainda não é conhecida, mas acredita-se que é causada por um conjunto de fatores: genéticos (história familiar de alergias respiratórias – asma ou rinite) e ambientais.",
      show:true,
      showAnswer:false,
      },
  ]*/
  perguntas:any;


  constructor(private animationCtrl: AnimationController,
              private alertService: AlertService,
              private faqService:FAQService) { }

  ngOnInit() {
    this.alertService.presentLoading(4000);
    
    this.faqService.getAllQuestions().then(data => {
      let result = JSON.stringify(data);
      result = JSON.parse(result);
      this.perguntas = Object.values(result);
      console.log(this.perguntas);
      this.perguntas.forEach(pergunta => {
      
        this.questions.push({
          question: pergunta.pergunta,
          answer: pergunta.resposta,
          id: pergunta.id,
          show:true,
          showAnswer:false,


        })
     });
     
    });
  };
  expand(question){
      question.showAnswer = !(question.showAnswer);
  }
 
  searchBarColoring(search){
    this.searching=search;
  }  

  search(event){
    this.query = event.target.value.toLowerCase();
    this.questions.forEach(item => {
      item.show  = (item.question.toLowerCase().indexOf(this.query) > -1)||(item.answer.toLowerCase().indexOf(this.query) > -1);
    });
  
  }
}
  