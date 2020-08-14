import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { Game } from '../models/Game';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    studio: {
      fontSize: 14,
    },
    gameContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    game: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(16),
      height: theme.spacing(20),
    }
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
      <Typography variant="h4">Library</Typography>
      <div className={classes.gameContainer}>
        {
            games.map((game: Game) => 
              <Card key={game.id} elevation={3} className={classes.game}>
                <CardContent>
                <Typography className={classes.studio} color="textSecondary">
                    {game.studioId}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {game.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => onRemoveGame(game)}>Destroy</Button>
                </CardActions>
              </Card>
            )
        }
      </div>
    </Paper>
  );
}
