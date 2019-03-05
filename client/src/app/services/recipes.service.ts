import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Needed for POST request. Authorization to come from AuthService
// const httpOptions = {
//   headers: new HttpHeaders({
//     // Content inferred by browser, content-type causes error
//     // 'Content-Type':  'multipart/form-data',
//     // Just for testing. Should be provided by authservice
//     'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
//   })
// };

@Injectable()
export class RecipesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  getAllRecipes() {
    // HttpClient will create an observable for the request, but has not sent it yet
    // It must be subscribed to
    const url = `${this.apiUrl}/recipes`;
    return this.http.get(url);
  }
  getRecipeById (id: number) {
    const url = `${this.apiUrl}/recipes/${id}`;
    return this.http.get(url);
  }
  getRecipesByCategory (category: string) {
    const url = `${this.apiUrl}/recipes/category/${category}`;
    return this.http.get(url);
  }
  searchRecipesByTitle (titles: string) {
    const url = `${this.apiUrl}/recipes/search`;
    titles = titles.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const options = titles ?
      { params: new HttpParams().set('title', titles) } : {};
    return this.http.get(url, options);
  }
  searchRecipesByIngredients (ingredients: string) {
    const url = `${this.apiUrl}/recipes/search`;
    ingredients = ingredients.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const options = ingredients ?
      { params: new HttpParams().set('ing', ingredients) } : {};
    return this.http.get(url, options);
  }
  getRecentRecipes(quantity: string) {
    const url = `${this.apiUrl}/recipes/recent`;
    const options = quantity ?
      { params: new HttpParams().set('quantity', quantity) } : {};
    return this.http.get(url, options);
  }
  createNewRecipe (recipe: {}) {
    const url = `${this.apiUrl}/recipes`;
    return this.http.post(url, recipe);
  }
}
