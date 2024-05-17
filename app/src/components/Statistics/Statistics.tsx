import React, { useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularTimeSlots,
  fetchPopularDishes,
  fetchPopularDrinks,
} from "../../state/slices/statistics/statisticsSlice";
import { AppDispatch, RootState } from "../../state/store/store";
import "./Statistics.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const createChartOptions = (title: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
});

const Statistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popularTimeSlotsList = useSelector((state: RootState) => state.statistics.popularTimeSlots);
  const popularTimeSlotsStatus = useSelector((state: RootState) => state.statistics.status);
  const popularTimeSlotsError = useSelector((state: RootState) => state.statistics.error);
  const popularDishesList = useSelector((state: RootState) => state.statistics.popularDishes);
  const popularDishesStatus = useSelector((state: RootState) => state.statistics.status);
  const popularDishesError = useSelector((state: RootState) => state.statistics.error);
  const popularDrinksList = useSelector((state: RootState) => state.statistics.popularDrinks);
  const popularDrinksStatus = useSelector((state: RootState) => state.statistics.status);
  const popularDrinksError = useSelector((state: RootState) => state.statistics.error);

  useEffect(() => {
    if (popularDishesStatus === "idle" || popularTimeSlotsStatus === "idle" || popularDrinksStatus === "idle") {
      dispatch(fetchPopularTimeSlots());
      dispatch(fetchPopularDrinks());
      dispatch(fetchPopularDishes());
    }
  }, [dispatch, popularDishesStatus, popularTimeSlotsStatus, popularDrinksStatus]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d0ed57", "#a4de6c", "#8884d8"];

  if (popularDishesStatus === "loading" || popularTimeSlotsStatus === "loading" || popularDrinksStatus === "loading") {
    return <div>Loading...</div>;
  }

  const popularDishData = {
    labels: popularDishesList.map((dish) => dish.dish_name),
    datasets: [
      {
        label: "Popular Dishes",
        data: popularDishesList.map((dish) => dish.total_quantity),
        backgroundColor: colors,
      },
    ],
  };

  const popularTimeSlotsData = {
    labels: popularTimeSlotsList.map((time) => time.time),
    datasets: [
      {
        label: "Number of reservations:",
        data: popularTimeSlotsList.map((time) => time.reservation_count),
        backgroundColor: colors,
        Legend: popularTimeSlotsList.map((time) => time.time),
      },
    ],
  };

  const popularDrinksData = {
    labels: popularDrinksList.map((drink) => drink.drink_name),
    datasets: [
      {
        label: "Number of reservations:",
        data: popularDrinksList.map((drink) => drink.total_quantity),
        backgroundColor: colors,
        Legend: popularDrinksList.map((drink) => drink.drink_name),
      },
    ],
  };

  return (
    // <div className="main__layout__container">
    <div className="statistics__container">
      <div className="char__container">
        <Pie options={createChartOptions("Popular Dishes")} data={popularDishData} />
      </div>
      <div className="char__container">
        {/* <ResponsiveContainer>
            <BarChart
              data={popularTimeSlotsList}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reservation_count">
                {popularTimeSlotsList.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer> */}
        <Bar options={createChartOptions("Popular Time Slots")} data={popularTimeSlotsData} />
      </div>
      <div className="char__container">
        <Pie options={createChartOptions("Popular Drinks")} data={popularDrinksData} />
      </div>
    </div>
    // </div>
  );
};

export default Statistics;
