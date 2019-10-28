import {Component} from '@angular/core';
import {GameStorageService} from '../../services/game-storage.service';
import {Observable} from 'rxjs';
import {LeaderBoardInterface} from '../../models/game-settings.interface';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent {

  readonly leaderBoard$: Observable<LeaderBoardInterface[]>;

  constructor(
    private gameStorageService: GameStorageService
  ) {
    this.leaderBoard$ = this.gameStorageService.getLeaderBoard();
  }

}
