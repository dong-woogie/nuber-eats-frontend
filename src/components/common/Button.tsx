import React from "react";
import { darkenColor } from "../../lib/utils/taliwindUtils";

interface IButtonProps {
  activeText: string;
  canClick?: boolean;
  loading?: boolean;
  color?: string;
  className?: string;
}

function Button(props: IButtonProps) {
  const {
    activeText,
    canClick,
    loading,
    color = "bg-lime-600",
    className,
  } = props;
  const canClickStyles = () => {
    if (!canClick) return `bg-gray-300 pointer-events-none`;
    return `${color} 
      hover:${darkenColor(color, 1)} 
      active:${darkenColor(color, 2)}
    `;
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <button role={"button"} className={`btn ${canClickStyles()} ${className}`}>
      {loading ? "loading...." : activeText}
    </button>
  );
}

Button.defaultProps = {
  loading: false,
  canClick: true,
  color: "bg-lime-600",
};

export default Button;
