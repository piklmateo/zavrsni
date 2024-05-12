// useMenuItems.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../../state/slices/dish/dishSlice";
import { fetchDrinks } from "../../state/slices/drink/drinkSlice";
import { AppDispatch, RootState } from "../../state/store/store";

const useMenuItems = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dishList = useSelector((state: RootState) => state.dish.dish);
  const dishStatus = useSelector((state: RootState) => state.dish.status);
  const drinkList = useSelector((state: RootState) => state.drink.drink);
  const drinkStatus = useSelector((state: RootState) => state.drink.status);

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
