import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataNumber = [300, 50, 100, 422, 452,876,234];

function PieChart( props ) {
 const {datas} = props; 
  const data = {
   /*  labels: [
      "Lakás",
      "Szórakozás",
      "Élelmiszer",
      "Személyes",
      "Egyéb",
      "Ajándék/Adomány",
      "Közlekedés",
    ], */
    labels: Object.keys(datas),
    datasets: [
      {
        label: "Votes",
        data: Object.values(datas),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(40, 114, 71, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(40, 114, 71, 1)'
      ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
