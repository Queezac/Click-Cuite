import { useState } from "react";
import { createPortal } from "react-dom";

export const ToolTip = ({
  children,
  title,
  text,
  direction = "top",
  spacing = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const showToolTip = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let top = 0;
    let left = 0;

    switch (direction) {
      case "top":
        top = rect.top - spacing;
        left = rect.left + rect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + spacing;
        left = rect.left + rect.width / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2;
        left = rect.left - spacing;
        break;
      case "right":
        top = rect.top + rect.height / 2;
        left = rect.right + spacing;
        break;
      default:
        top = rect.top - spacing;
        left = rect.left + rect.width / 2;
    }

    setPosition({ top, left });
    setIsHovered(true);
  };

  const hideToolTip = () => setIsHovered(false);

  return (
    <>
      <div onMouseEnter={showToolTip} onMouseLeave={hideToolTip}>
        {children}
      </div>
      {isHovered &&
        createPortal(
          <div
            className={`fixed bg-gray-800 text-white text-xs rounded-md p-2 z-50 transform ${
              direction === "top" || direction === "bottom"
                ? "-translate-x-1/2"
                : "-translate-y-1/2"
            }`}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            <div className="flex flex-col gap-1 justify-center items-center">
              <h3 className="text-sm">{title}</h3>
              {text && <p>{text}</p>}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
