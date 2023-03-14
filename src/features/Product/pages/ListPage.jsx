import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Container, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "api/productApi";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductList from "../components/ProductList";
import Pagination from "@mui/material/Pagination";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "../components/Filters/FilterViewer";
import queryString from "query-string";

ListPage.propTypes = {};

const useStyles = makeStyles(() => ({
  root: { paddingTop: "30px", backgroundColor: "#E9E9E9" },
  right: { flex: "1 1 0" },
  left: { width: "250px" },
  pagination: {
    display: "flex",
    flexDirection: "row nowrap",
    justifyContent: "center",
    marginTop: "30px",
    paddingBottom: "20px",
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  // const queryParams = queryString.parse(location.search); // chuyển từ chuỗi về object
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _limit: Number.parseInt(params._limit) || 8,
      _page: Number.parseInt(params._page) || 1,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    }
  }, [location.search]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 8,
    page: 1,
    total: 10,
  });
  // const [filters, setFilters] = useState({
  //   _limit: 8,
  //   _page: 1,
  //   _sort: "salePrice:ASC",
  // });
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _limit: Number.parseInt(queryParams._limit) || 8,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));
  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters, //lấy lại filters cũ
    //   _sort: newSortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters, //lấy lại filters cũ
    //   ...newFilters, // lấy thêm filters mới
    // }));
    const filters = {
      ...queryParams,
      ...newFilters,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  // useEffect(() => {
  //   sync filters to url
  //   navigate({
  //     pathname: location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  //   history.push({
  //     pathname: window.location.pathname,
  //     search: queryString.stringify(filters), // chuyển đổi từ object thành chuỗi
  //   });
  // }, [navigate, filters]); // run khi history hoặc filters thay đổi (history ko thay đổi)

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to get product list: ", error);
      }
      setLoading(false);
    })();
  }, [queryParams]);
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              {loading ? (
                <ProductSkeleton length={8} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
