import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/model/product";
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/BasketSlice";


interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {

const {status} = useAppSelector(state => state.basket);
const dispatch = useAppDispatch();

  return (
    <>
      <Card>
        <CardHeader 
        avatar = {
          <Avatar sx = {{backgroundColor : 'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title = {product.name}
        titleTypographyProps = {{
          sx : {fontWeight : 'bold' , color : 'secondary.main'}
        }}
        />
        <CardMedia
          component="img"
          sx={{objectFit : 'contain' , height : 140 , bgcolor :'primary.light'}}
          image={product.pictureUrl}
          title = {product.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" color='secondary'>
            ${(product.price/100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
          loading={status === 'pendingAddItem' + product.id} 
          onClick = {() => dispatch(addBasketItemAsync({productId : product.id}))}
          size="small"
          >
            Add to cart</LoadingButton>
          <Button size="small" component = {Link} to = {`/catalog/${product.id}`} >View</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
