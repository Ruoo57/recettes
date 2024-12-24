import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private collectionName = 'recettes';

  constructor(private firestore: AngularFirestore) {}

  // Récupérer toutes les recettes
  getRecettes(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Ajouter une recette
  addRecette(recette: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(recette);
  }

  // Mettre à jour une recette
  updateRecette(id: string, recette: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(recette);
  }

  // Supprimer une recette
  deleteRecette(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
