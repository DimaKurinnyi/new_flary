import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const Schedule = () => {
  const data = {
    labels: ['Early investors', 'Liquidity', 'Community&Ecosystem', 'Adv&Team', 'Marketing/Treasury', 'Staking&Liquidity rewards', 'Public'],
    datasets: [
      {
        label: '',
        data: [4, 10, 12, 12, 13, 19, 30],
        backgroundColor: [
          'rgba(255, 145, 75)',
          'rgba(255, 135, 75)',
          'rgba(255, 120, 60)',
          'rgba(255, 105, 45)',
          'rgba(255, 90, 30)',
          'rgba(255, 75, 15)',
          'rgba(255, 60, 0)',

        ],
        borderColor: ['#000'],
      },
    ],
  };

  const options = {
    borderWidth: 10,
    hoverBorderWidth: 0,
    borderRadius: 10,
    cutout: '60%',
    plugins: {
      legend: false,
    },
  };
  //@ts-ignore
  return <Doughnut data={data} options={options} />;
};
