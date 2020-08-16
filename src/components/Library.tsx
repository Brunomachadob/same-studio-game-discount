import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Game } from '../models/Game';

import GameCard from './GameCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    gameContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
);

interface Props {
    games: Game[];
    onRemoveGame: (game: Game) => void;
}

export default function Library({ games, onRemoveGame }: Props) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography variant="h4">My Library</Typography>
      <div className={classes.gameContainer}>
        {
            games.map((game: Game) => 
              <GameCard key={game.id} game={game} onRemoveGame={onRemoveGame}/>
            )
        }
      </div>
    </Paper>
  );
}
