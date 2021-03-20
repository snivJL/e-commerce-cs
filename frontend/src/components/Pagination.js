import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import productActions from "../redux/actions/product.actions";
const Pagination = () => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.product.pageCount);
  const handlePageClick = (e) => {
    dispatch(productActions.getAllProducts(undefined, e.selected + 1));
  };
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
