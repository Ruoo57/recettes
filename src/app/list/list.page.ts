import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  recettes: any[] = []; // liste des recettes

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    // récupère les recettes depuis Firestore
    this.recipeService.getRecettes().subscribe((data) => {
      this.recettes = data;
    });
  }

  deleteRecette(id: string) {
    this.recipeService.deleteRecette(id).then(() => {
      console.log('Recette supprimée');
    });
  }

  viewRecette(id: string) {
    this.router.navigate(['/details', id]); 
  }

  editRecette(id: string) {
    this.router.navigate(['/edit', id]); 
  }
}
