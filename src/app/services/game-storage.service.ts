import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {GameSettingsInterface} from '../models/game-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  constructor(private http: HttpClient) { }

  getGameSettings(): Observable<GameSettingsInterface> {
    return this.http.get<GameSettingsInterface>(environment.baseUrl + '/game-settings');
  }

  getLeaderBoard(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + '/winners');
  }


}
