import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { Rule } from '../models/Rule';
import { evaluateRuleDescription } from '../business/RuleDescriptionEvaluator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    rulesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    rule: {
      margin: theme.spacing(1),
    }
  }),
);

interface Props {
    rules: Rule[];
}

export default function Rules({ rules }: Props) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography variant="h4">Discount Rules</Typography>
      <div className={classes.rulesContainer}>
        {
            rules.map((rule: Rule) => 
              <Card key={rule.id} elevation={3} className={classes.rule}>
                <CardContent>
                  <Typography color="textSecondary">
                    {rule.studioId}
                  </Typography>
                  <Typography>
                    {evaluateRuleDescription(rule)}
                  </Typography>
                </CardContent>
              </Card>
            )
        }
      </div>
    </Paper>
  );
}
