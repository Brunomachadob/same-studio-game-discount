import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

import { Game } from './models/Game';
import { ALL_GAMES } from './data/mock';

import Library from './components/Library';
import Store from './components/Store';
import Rules from './components/Rules';

import { applyDiscounts } from './business/DiscountCalculator';
import { Rule, RuleType } from './models/Rule';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const rules: Rule[] = [
  { id: '1', type: RuleType.SAME_STUDIO, percentage: 5, maxPercentage: 10, studioId: 'Universal' },
  { id: '2', type: RuleType.CONTAINS_TAG, percentage: 50, maxPercentage: 100, studioId: 'Bethesda', options: { tags: ['open-world'] } },
];

export default function App() {
  const classes = useStyles();

  const [storeGames, setStoreGames] = useState(ALL_GAMES);
  const [libraryGames, setLibraryGames] = useState<Game[]>([]);

  useEffect(() => {
    const libraryGameIds = libraryGames.map((game) => game.id);
    const storeGames = ALL_GAMES.filter((game: Game) => !libraryGameIds.includes(game.id))
    const storeGamesWithDiscount = applyDiscounts(rules, storeGames, libraryGames);

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
            Smart game discounts
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="github" target="blank" href="https://github.com/Brunomachadob/smart-game-discounts">
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Rules rules={rules}></Rules>
        <Store games={storeGames} onBuyGame={onBuyGame} />
        <Library games={libraryGames} onRemoveGame={onRemoveLibraryGame} />
      </div>
    </div>
  );
}
