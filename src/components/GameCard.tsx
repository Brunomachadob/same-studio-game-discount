import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { Game } from '../models/Game';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(20),
      height: theme.spacing(20),
    },
    studio: {
      fontSize: 14,
    },
  }),
);

const currencyFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

interface Props {
    game: Game;
    onRemoveGame?: (game: Game) => void;
    onBuyGame?: (game: Game) => void;
}

export default function GameCard({ game, onBuyGame, onRemoveGame }: Props) {
  const classes = useStyles();

  return (
    <Card key={game.id} elevation={3} className={classes.root}>
      <CardContent>
        <Typography className={classes.studio} color="textSecondary">
            {game.studioId}
        </Typography>
        <Typography variant="h5" component="h2">
            {game.name}
        </Typography>
        {
          onBuyGame ? 
          <Typography color="textSecondary">
              {currencyFormat.format(game.price)}
          </Typography>
            : null
        }
      </CardContent>
      <CardActions>
        {
          onBuyGame ? 
            <Button size="small" onClick={() => onBuyGame(game)}>Buy</Button>
            : null
        }
        {
          onRemoveGame ? 
            <Button size="small" onClick={() => onRemoveGame(game)}>Destroy</Button>
            : null
        }
      </CardActions>
    </Card>
  );
}
