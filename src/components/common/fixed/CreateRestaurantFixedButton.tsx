import { useReactiveVar } from "@apollo/client";
import React from "react";
import { createRestaurantDialogVars } from "../../../apollo";
import CircleButton from "../CircleButton";

function CreateRestaurantFixedButton() {
  const dialog = useReactiveVar(createRestaurantDialogVars);
  const onToggle = () => createRestaurantDialogVars(!dialog);
  return (
    <div className={`fixed-btn-wrap ${dialog ? "bg-red-300" : "bg-white"}`}>
      <CircleButton dialog={dialog} onToggle={onToggle} color="text-red-300" />
    </div>
  );
}

export default CreateRestaurantFixedButton;
