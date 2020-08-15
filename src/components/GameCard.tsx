import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

import { Game, DiscountInfo } from '../models/Game';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(20),
      minHeight: theme.spacing(20),
    },
    studio: {
      fontSize: 14,
    },
    tags: {
      color: theme.palette.info.light
    },
  }),
);

const useStylesPriceWithDiscount = makeStyles((theme: Theme) =>
  createStyles({
    oldPrice: {
      fontSize: 13,
    },
    discountInfo: {
      fontSize: 15,
      verticalAlign: 'middle',
    },
  }),
);

const currencyFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

interface Props {
    game: Game;
    onRemoveGame?: (game: Game) => void;
    onBuyGame?: (game: Game) => void;
}

function Price({ price, className }: { price: number, className?: string }) {
  return (
    <Typography color="textSecondary" className={className}>
      {currencyFormat.format(price)}
    </Typography>
  );
}

function PriceWithDiscount({ price, discountInfo }: { price: number, discountInfo: DiscountInfo }) {
  const classes = useStylesPriceWithDiscount();

  return (
    <div>
      <s><Price price={price} className={classes.oldPrice}/></s>
      <Typography color="textSecondary">
        {currencyFormat.format(discountInfo.price)}
        { discountInfo ? (
          <Tooltip title={discountInfo.info}>
            <InfoOutlined className={classes.discountInfo} />
          </Tooltip>
        ) : null }
    </Typography>
    </div>
  );
}

export default function GameCard({ game, onBuyGame, onRemoveGame }: Props) {
  const classes = useStyles();

  let priceButton;

  if (onBuyGame) {
    priceButton = game.discountInfo ? (
      <PriceWithDiscount price={game.price} discountInfo={game.discountInfo} />
    ) : <Price price={game.price}/>
  }

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
          priceButton
        }
        <Typography className={classes.tags}>
            {game.tags.map((tag) => `#${tag}`).join(' ')}
        </Typography>
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
