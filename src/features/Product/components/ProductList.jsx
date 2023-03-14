import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Product from "./Product";

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = {
  data: [],
};

function ProductList({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* <Box padding={1}>
              <Skeleton variant="rectangular" width="100%" height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box> */}
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
