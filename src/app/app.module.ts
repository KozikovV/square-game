import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BtnPannelComponent } from './components/btn-pannel/btn-pannel.component';
import { EndGameScreenComponent } from './components/end-game-screen/end-game-screen.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameSquareComponent } from './components/game-square/game-square.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import {HttpClientModule} from '@angular/common/http';
import {GameStorageService} from './services/game-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    BtnPannelComponent,
    EndGameScreenComponent,
    GameFieldComponent,
    GameSquareComponent,
    LeaderBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GameStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
