import { useSelector } from "react-redux";

const useOrder = () => {
  const order = useSelector((state) => state.order);
  return order;
};

export default useOrder;
