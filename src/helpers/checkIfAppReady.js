import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../actions/products";

function useGetAllData() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const delayReady = () => {
    setReady(true);
  };
  useEffect(() => {
    dispatch(getAllProducts()).then((res) => {
      delayReady(true);
    }).catch((err) => {
      delayReady(true);
    });
  }, []);

  return ready;
}
export default useGetAllData;