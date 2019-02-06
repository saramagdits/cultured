import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class RecipesService {
  constructor(private http: HttpClient) {
  }
  getAllRecipes() {
    // HttpClient will create an observable for the request, but has not sent it yet
    // It must be subscribed to
    return this.http.get('http://localhost:3000/recipes');
  }
}
