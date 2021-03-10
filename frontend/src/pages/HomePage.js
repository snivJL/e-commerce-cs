import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../redux/actions/product.actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(productActions.getAllProducts());
  }, [dispatch]);
  return (
    <>{loading ? <h2>Loading</h2> : products.map((p) => <div>{p.name}</div>)}</>
  );
};

export default HomePage;
