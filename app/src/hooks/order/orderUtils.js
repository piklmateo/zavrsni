export const insertOrder = async (orderData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("You don't have a valid token");
      return null;
    }

    const res = await fetch("http://localhost:12413/api/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("ID_ORDER: " + JSON.stringify(data));
      return data;
    } else {
      console.error("Error while inserting order:", res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error while inserting order:", error);
    return null;
  }
};

export const insertOrderDish = async (dishData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("You don't have a valid token");
      return null;
    }

    const res = await fetch("http://localhost:12413/api/order-dish", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(dishData),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Error while inserting order dish:", res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error while inserting order dish:", error);
    return null;
  }
};

export const insertOrderDrink = async (drinkData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("You don't have a valid token");
      return null;
    }

    const res = await fetch("http://localhost:12413/api/order-drink", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(drinkData),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Error while inserting order drink:", res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error while inserting order drink:", error);
    return null;
  }
};
