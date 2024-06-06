import React from "react";

export default Tooltip = ({text}) => {
  return (
    <span className="daria-tooltip tooltip-header-help" data-toggle="tooltip" data-html={true} data-placement="bottom" data-title={text}>
      {' '}(?)
    </span>
  )
};