import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  recetteForm!: FormGroup; 
  recetteId!: string; 

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // initialise le formulaire
    this.recetteForm = this.fb.group({
      title: [''],
      category: [''],
      ingredients: [''],
      steps: [''],
    });
  }

  ngOnInit() {
    this.recetteId = this.route.snapshot.paramMap.get('id') || '';

  
    this.recipeService.getRecettes().subscribe((recettes) => {
      const recette = recettes.find((r: any) => r.id === this.recetteId);
      if (recette) {
        this.recetteForm.patchValue({
          title: recette.title,
          category: recette.category,
          ingredients: recette.ingredients.join('\n'),
          steps: recette.steps.join('\n'),
        });
      }
    });
  }

  async onSubmit() {
    const formValue = this.recetteForm.value;
    const updatedRecette = {
      title: formValue.title,
      category: formValue.category,
      ingredients: formValue.ingredients.split('\n').filter((i: string) => i.trim() !== ''),
      steps: formValue.steps.split('\n').filter((s: string) => s.trim() !== ''),
    };

    await this.recipeService.updateRecette(this.recetteId, updatedRecette);
    this.router.navigate(['/list']); // redirige vers /list après modif
  }
}
