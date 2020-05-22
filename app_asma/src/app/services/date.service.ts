import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  mesesNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrubro', 'Novembro', 
                'Dezembro'];
  mesesLength = {'Janeiro': 31, 'Fevereiro': this.getFebLength(), 'Março': 31, 'Abril': 30, 'Maio': 31, 'Junho': 30, 'Julho': 31,
                        'Agosto': 31, 'Setembro': 30, 'Outrubro': 31, 'Novembro': 30, 'Dezembro': 31};
  meses = {'Jan': 'Janeiro', 'Feb': 'Fevereiro', 'Mar': 'Março', 'Apr': 'Abril', 'May': 'Maio', 
          'Jun':'Junho', 'Jul': 'Julho', 'Aug': 'Agosto', 'Sep': 'Setembro', 'Oct': 'Outubro', 
          'Nov': 'Novembro', 'Dec': 'Dezembro'};

  diasSemana = {'Mon': 'Segunda-feira', 'Tue': 'Terça-feira', 'Wed': 'Quarta-feira', 'Thu': 'Quinta-feira',
                'Fri': 'Sexta-feira', 'Sat': 'Sábado', 'Sun': 'Domingo'};

  constructor() { }

  getDate() {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');
    let diaSemana = fullDate[0];
    let dia: string = fullDate[2];
    let mesNumber = fullDate[1];

    let mes: string = this.meses[mesNumber];
    let diaNome: string = this.diasSemana[diaSemana];

    return [diaNome, dia, mes];
  }

  getWeek() {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');

    let day = +fullDate[2];
    let dayId = date.getDay();
    let curMonth = date.getMonth();
    let curYear = date.getFullYear();
    let week = [];

    let weekDay = day;
    let dayAux = day;
    let month = curMonth;
    let year = curYear;
    for (let i = 0; i < dayId; i++) {
      weekDay = dayAux - (dayId - i);
      if (weekDay < 1) {
        if (month === 1) {
          month = 11;
          year -= 1;
          dayAux = this.mesesLength['Dezembro'];
        } else {
          month -= 1;
          dayAux = this.mesesLength[this.mesesNames[month]];
        }
      }

      if (month < 9) {
        week.push([weekDay.toString(), '0' +(month + 1).toString(), year.toString()]);
      } else {
        week.push([weekDay.toString(), (month + 1).toString(), year.toString()]);
      }
    }
    
    weekDay = day;
    month = curMonth;
    year = curYear;
    for (let i = dayId; i < 7; i++) {
      weekDay -= (dayId - i);
      if (weekDay > this.mesesLength[this.mesesNames[month]]) {
        if (month === 11) {
          month = 0;
          year += 1;
          weekDay = this.mesesLength['Janeiro'];
        } else {
          month += 1;
          weekDay = this.mesesLength[this.mesesNames[month]];
        }
      }

      if (month < 9) {
        week.push([weekDay.toString(), '0' +(month + 1).toString(), year.toString()]);
      } else {
        week.push([weekDay.toString(), (month + 1).toString(), year.toString()]);
      }
    }


    /*for (let i = 0; i < 7; i++) {
      let weekDay = day - (dayId - i);
      week.push(weekDay.toString());
    }*/
    
    console.log(week);
    return week;
  }

  getLastDays(quantity: number) {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');

    let day = +fullDate[2];
    let month = date.getMonth();
    let year = date.getFullYear();
    let dayPrevious: number = day;
    let monthPrevious: number;
    let days: string[] = ['Hoje'];
    if (month === 1) {
      monthPrevious = 12;
    } else {
      monthPrevious = month - 1;
    }

    // Verificação se o ano é bissexto
    this.getFebLength();

    for(let i = 0; i < quantity; i++) {
      if (dayPrevious - 1 > 0) {
        dayPrevious --; 
      } else {
        dayPrevious = this.mesesLength[monthPrevious];
      }

      days.push(dayPrevious.toString());
    }

    return days.reverse();
  }

  getFebLength() {
    let date = new Date();
    let year = date.getFullYear();

    // Verificação se o ano é bissexto
    if (year % 4 === 0) {
      if (year % 100 !== 0) {
        return 29;
      }
    }
    if (year % 400 === 0) {
      return 29;
    }

    return 28;
  }
}
