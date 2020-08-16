import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton, Grid } from '@material-ui/core';

import { Game } from './models/Game';
import { ALL_GAMES, RULES } from './data/mock';

import Library from './components/Library';
import Store from './components/Store';
import Rules from './components/Rules';

import { applyDiscounts } from './business/DiscountCalculator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function App() {
  const classes = useStyles();

  const [storeGames, setStoreGames] = useState(ALL_GAMES);
  const [libraryGames, setLibraryGames] = useState<Game[]>([]);

  useEffect(() => {
    const libraryGameIds = libraryGames.map((game) => game.id);
    const storeGames = ALL_GAMES.filter((game: Game) => !libraryGameIds.includes(game.id))
    const storeGamesWithDiscount = applyDiscounts(RULES, storeGames, libraryGames);

    setStoreGames(storeGamesWithDiscount);
  }, [libraryGames])

  const onRemoveLibraryGame = (game: Game) => {
    setLibraryGames((libGames) => libGames.filter((libGame) => libGame.id !== game.id));
  };

  const onBuyGame = (game: Game) => {
    setLibraryGames((libGames) => libGames.concat(game));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Studio fidelity program
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="github" target="blank" href="https://github.com/Brunomachadob/smart-game-discounts">
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography color="textSecondary">
              This is a small toy application showcasing a fidelity program that studios would apply on a 
              market place (Steam for example) that would give discounts based on games the user already have in their library.
            </Typography>
          </Grid>
          <Grid item>
            <Rules rules={RULES}></Rules>
          </Grid>
          <Grid container item direction="row">
            <Grid item xs={12} sm={6}>
              <Store games={storeGames} onBuyGame={onBuyGame} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Library games={libraryGames} onRemoveGame={onRemoveLibraryGame} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
