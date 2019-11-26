import React from "react";

const Statistic = ({ text, value }) => {
  return (
    <div>
      <table style={{ width: "30%" }}>
        <tbody>
          <tr>
            <td style={{ width: "50%" }}>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistic;
