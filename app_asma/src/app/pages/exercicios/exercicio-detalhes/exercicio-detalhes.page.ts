import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercicio-detalhes',
  templateUrl: './exercicio-detalhes.page.html',
  styleUrls: ['./exercicio-detalhes.page.scss'],
})
export class ExercicioDetalhesPage implements OnInit {
  loadedExercise: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('exerciseId')){
        // redirect
        this.router.navigate(['.']);
        return;
      }
      const exerciseId = paramMap.get('exerciseId');
      this.loadedExercise = this.exerciseService.getExercise(+exerciseId);
    });
  }

}
