import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDate() {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');
    let diaSemana = fullDate[0];
    let dia: string = fullDate[2];
    let mesNumber = fullDate[1];

    let meses = {'January': 'Janeiro', 'February': 'Fevereiro', 'March': 'Março', 'April': 'Abril', 'May': 'Maio', 
                'June':'Junho', 'July': 'Julho', 'August': 'Agosto', 'September': 'Setembro', 'October': 'Outubro', 
                'November': 'Novembro', 'December': 'Dezembro'};

    let diasSemana = {'Mon': 'Segunda-feira', 'Tue': 'Terça-feira', 'Wed': 'Quarta-feira', 'Thu': 'Quinta-feira',
                      'Fri': 'Sexta-feira', 'Sat': 'Sábado', 'Sun': 'Domingo'}

    let mes: string = meses[mesNumber];
    let diaNome: string = diasSemana[diaSemana]

    return [diaNome, dia, mes];
  }

  getWeek() {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');

    let day = +fullDate[2];
    let dayId = date.getDay();
    let week = []

    for (let i = 0; i < 7; i++) {
      let weekDay = day - (dayId - i);
      week.push(weekDay.toString());
    }
    
    return week;
  }
}
