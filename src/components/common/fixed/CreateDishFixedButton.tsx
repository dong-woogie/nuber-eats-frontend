import { useReactiveVar } from "@apollo/client";
import React from "react";
import { createDishDialogVars } from "../../../apollo";
import CircleButton from "../CircleButton";

function CreateDishFixedButton() {
  const dialog = useReactiveVar(createDishDialogVars);
  const onToggle = () => createDishDialogVars(!dialog);
  return (
    <div className={`fixed-btn-wrap ${dialog ? "bg-blue-300" : "bg-white"}`}>
      <CircleButton
        dialog={dialog}
        onToggle={onToggle}
        color={"text-blue-300"}
      />
    </div>
  );
}

export default CreateDishFixedButton;
