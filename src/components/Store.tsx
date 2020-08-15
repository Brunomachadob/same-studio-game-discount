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
    onBuyGame: (game: Game) => void;
}

export default function Store({ games, onBuyGame }: Props) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography variant="h4">Store</Typography>
      <div className={classes.gameContainer}>
        {
            games.map((game: Game) =>
              <GameCard game={game} onBuyGame={onBuyGame} />
            )
        }
      </div>
    </Paper>
  );
}
