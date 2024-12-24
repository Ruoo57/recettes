import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeService
  ) {
    this.recipeForm = this.fb.group({
      title: [''], 
      category: [''], 
      ingredients: [''], 
      steps: [''], 
    });
  }

  async onSubmit() {
    const formValue = this.recipeForm.value;
    const nouvelleRecette = {
      title: formValue.title,
      category: formValue.category,
      ingredients: formValue.ingredients.split('\n').filter((i: string) => i.trim() !== ''),
      steps: formValue.steps.split('\n').filter((s: string) => s.trim() !== ''),
    };
  
    await this.recipeService.addRecette(nouvelleRecette);
    this.router.navigate(['/list']); 
  }
  
  
}
