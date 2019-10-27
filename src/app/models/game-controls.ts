import {ModeInterface} from './game-settings.interface';

export enum GameStage {
  START_GAME,
  GAME,
  END_GAME
}

export enum WINNER {
  COMPUTER,
  PLAYER
}

export interface PlayGameInterface {
  playerName: string;
  gameMode: ModeInterface;
}

