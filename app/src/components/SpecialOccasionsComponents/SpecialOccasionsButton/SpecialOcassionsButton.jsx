import React from "react";

const SpecialOcassionsButton = () => {
  const onSubmitSpecialOccasions = async () => {
    try {
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  };

  return <button className="btn btn__reserve">Reserve</button>;
};

export default SpecialOcassionsButton;
