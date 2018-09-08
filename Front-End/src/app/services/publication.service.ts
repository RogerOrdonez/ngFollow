import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Publication } from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.backendUrl;
   }

   addPublication(token, publication: Publication) {
      const params = JSON.stringify(publication);
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
      return this.http.post(this.url + 'publication', params, {headers: headers});
   }

   getPublications(token, page = 1) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
      return this.http.get(this.url + 'publications/' + page, {headers: headers});
   }

   deletePublication(token, publicationId) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
      return this.http.delete(this.url + 'publication/' + publicationId, {headers: headers});
   }


}