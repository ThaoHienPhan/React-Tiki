import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    padding: 0,
    listStyleType: "none",
    "& > li": {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
  subtitle2: {
    fontWeight: "bold !important",
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (filters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => "Có khuyến mãi",
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("salePrice_lte") &&
      Object.keys(filters).includes("salePrice_gte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: () => {},
  },
  //   {
  //     id: 4,
  //     getLabel: (filters) => "",
  //     isActive: (filters) => "true",
  //     isVisible: (filters) => "true",
  //     isRemovable: "true",
  //     onRemove: (filters) => {},
  //     onToggle: (filters) => {},
  //   },
];

function FilterViewer({ filters = {}, onChange = null }) {
  // set giá trị mặc định cho prop (es6)
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters)); // run chỉ khi  filters thay đổi
  }, [filters]);
  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
