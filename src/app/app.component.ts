import {Component, OnInit} from '@angular/core';
import {GameStorageService} from './services/game-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private gameService: GameStorageService
  ) {}
  title = 'square-game';

  ngOnInit(): void {
    this.gameService.getLeaderBoard()
      .subscribe(data => console.log(data));
  }
}
