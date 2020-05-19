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

  getLastDays(quantity: number) {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');

    let day = +fullDate[2];
    let month = date.getMonth();
    let year = date.getFullYear();
    let meses = {'Janeiro': 31, 'Fevereiro': 28, 'Março': 31, 'Abril': 30, 'Maio': 31, 'Junho': 30, 'Julho': 31,
                'Agosto': 31, 'Setembro': 30, 'Outrubro': 31, 'Novembro': 30, 'Dezembro': 31};
    let dayPrevious: number = day;
    let monthPrevious: number;
    let days: string[] = ['Hoje'];
    if (month === 1) {
      monthPrevious = 12;
    } else {
      monthPrevious = month - 1;
    }

    // Verificação se o ano é bissexto
    if (year % 4 === 0) {
      if (year % 100 !== 0) {
        meses.Fevereiro = 29;
      }
    }
    if (year % 400 === 0) {
      meses.Fevereiro = 29;
    }

    for(let i = 0; i < quantity; i++) {
      if (dayPrevious - 1 > 0) {
        dayPrevious --; 
      } else {
        dayPrevious = meses[monthPrevious];
      }

      days.push(dayPrevious.toString());
    }

    return days.reverse();
  }
}
