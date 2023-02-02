import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { useAppSelector } from "../../app/store/configureStore";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
