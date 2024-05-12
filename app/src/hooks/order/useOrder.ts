import { useSelector } from "react-redux";
import { RootState } from "../../state/store/store";

const useOrder = () => {
  const order = useSelector((state: RootState) => state.order);
  return order;
};

export default useOrder;
