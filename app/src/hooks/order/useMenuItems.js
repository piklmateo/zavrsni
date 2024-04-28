// useMenuItems.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../../state/slices/dish/dishSlice.js";
import { fetchDrinks } from "../../state/slices/drink/drinkSlice.js";

const useMenuItems = () => {
  const dispatch = useDispatch();
  const dishList = useSelector((state) => state.dish.dish);
  const dishStatus = useSelector((state) => state.dish.status);
  const drinkList = useSelector((state) => state.drink.drink);
  const drinkStatus = useSelector((state) => state.drink.status);

  useEffect(() => {
    if (dishStatus === "idle") {
      dispatch(fetchDishes());
    }
    if (drinkStatus === "idle") {
      dispatch(fetchDrinks());
    }
  }, [drinkStatus, dishStatus, dispatch]);

  return { dishList, dishStatus, drinkList, drinkStatus };
};

export default useMenuItems;
