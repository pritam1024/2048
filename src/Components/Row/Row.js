import React from "react";
import Cell from "../Cell/Cell";

const Rown = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} cellValue={cell} />
      ))}
    </tr>
  );
};

export const Row = React.memo(Rown);
