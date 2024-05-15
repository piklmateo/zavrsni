import React, { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {
  fetchPopularTimeSlots,
  fetchPopularDishes,
  fetchPopularDrinks,
} from "../../state/slices/statistics/statisticsSlice";
import { AppDispatch, RootState } from "../../state/store/store";

const Statistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popularTimeSlotsList = useSelector(
    (state: RootState) => state.statistics.popularTimeSlots
  );
  const popularTimeSlotsStatus = useSelector(
    (state: RootState) => state.statistics.status
  );
  const popularTimeSlotsError = useSelector(
    (state: RootState) => state.statistics.error
  );
  const popularDishesList = useSelector(
    (state: RootState) => state.statistics.popularDishes
  );
  const popularDishesStatus = useSelector(
    (state: RootState) => state.statistics.status
  );
  const popularDishesError = useSelector(
    (state: RootState) => state.statistics.error
  );
  const popularDrinksList = useSelector(
    (state: RootState) => state.statistics.popularDrinks
  );
  const popularDrinksStatus = useSelector(
    (state: RootState) => state.statistics.status
  );
  const popularDrinksError = useSelector(
    (state: RootState) => state.statistics.error
  );

  useEffect(() => {
    if (
      popularDishesStatus === "idle" ||
      popularTimeSlotsStatus === "idle" ||
      popularDrinksStatus === "idle"
    ) {
      dispatch(fetchPopularTimeSlots());
      dispatch(fetchPopularDrinks());
      dispatch(fetchPopularDishes());
    }
  }, [
    dispatch,
    popularDishesStatus,
    popularTimeSlotsStatus,
    popularDrinksStatus,
  ]);

  return <div>Statistics</div>;
};

export default Statistics;
