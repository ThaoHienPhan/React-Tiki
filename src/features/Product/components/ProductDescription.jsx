import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import * as DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  const safeDesc = DOMPurify.sanitize(product.description)
  return (
    <Box elevation={0} style={{ padding: "20px" }}>
      <div dangerouslySetInnerHTML={{ __html: safeDesc }} />
    </Box>
  );
}

export default ProductDescription;
