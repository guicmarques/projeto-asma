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
    let mesAbrv = fullDate[1];
    let mesNumber = date.getMonth() + 1;
    let mesNumberStr = mesNumber.toString();
    if (mesNumber < 10){
      mesNumberStr = '0' + mesNumberStr;
    }

    let mes: string = this.meses[mesAbrv];
    let diaNome: string = this.diasSemana[diaSemana];

    return [diaNome, dia, mes, date.getFullYear().toString(), mesNumberStr];
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
    let month = curMonth;
    let year = curYear;
    for (let i = 0; i < dayId; i++) {
      weekDay -= 1;
      if (weekDay < 1) {
        if (month === 0) {
          month = 11;
          year -= 1;
          weekDay = this.mesesLength['Dezembro'];
        } else {
          month -= 1;
          weekDay = this.mesesLength[this.mesesNames[month]];
        }
      }

      week.push([weekDay.toString(), (month + 1).toString().padStart(2, '0'), year.toString(), 'before']);
    }

    week = week.reverse();
    
    let flag = 'selected';
    weekDay = day;
    month = curMonth;
    year = curYear;
    for (let i = 0; i < 7 - dayId; i++) {
      if (weekDay > this.mesesLength[this.mesesNames[month]]) {
        if (month === 11) {
          month = 0;
          year += 1;
          weekDay = 1;
        } else {
          month += 1;
          weekDay = 1;
        }
      }

      week.push([weekDay.toString(), (month + 1).toString().padStart(2, '0'), year.toString(), flag]);

      weekDay += 1;
      flag = 'after';
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
    let yearPrevious = year - 1;
    let dayPrevious: number = day;
    let monthPrevious: number;
    let days: string[] = ['Hoje'];
    if (month === 0) {
      monthPrevious = 11;
    } else {
      monthPrevious = month - 1;
    }


    for(let i = 0; i < quantity; i++) {
      if (dayPrevious - 1 > 0) {
        dayPrevious --; 
        days.push(year.toString() + '-' + (month + 1).toString().padStart(2, '0') + '-' + dayPrevious.toString().padStart(2, '0'));
      } else {
        month = monthPrevious;
        dayPrevious = this.mesesLength[this.mesesNames[month]];
        if (monthPrevious === 11) {
           year = yearPrevious;
           days.push(year.toString() + '-' + (month + 1).toString().padStart(2, '0') + '-' + dayPrevious.toString().padStart(2, '0'));
        } else {
           days.push(year.toString() + '-' + (month + 1).toString().padStart(2, '0') + '-' + dayPrevious.toString().padStart(2, '0'));
        }
      }
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

  getMonthNumber(monthName: string) {
    let index = this.mesesNames.indexOf(monthName) + 1

    return index.toString().padStart(2, '0')
  }

  compareDates(date1, date2) {
    let fullDate1 = date1.split('-');
    let year1 = +fullDate1[0];
    let month1 = +fullDate1[1];
    let day1 = +fullDate1[2];
    let fullDate2 = date2.split('-');
    let year2 = +fullDate2[0];
    let month2 = +fullDate2[1];
    let day2 = +fullDate2[2];

    let data1 = new Date(year1, month1 - 1, day1);
    let data2 = new Date(year2, month2 - 1, day2);
    let diffTime = Math.abs(data1.getTime() - data2.getTime());
    let diffDays = diffTime / (1000 * 60 * 60 * 24); 

    console.log(date1 + ' - ' + date2 + ' =', diffDays, 'days')
    return diffDays;
  }
}
