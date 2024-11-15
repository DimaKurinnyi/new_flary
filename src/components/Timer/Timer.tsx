// import React, { useEffect, useState } from 'react';
// import style from './Timer.module.scss';
// // import { differenceInMilliseconds, parseISO } from 'date-fns';
// // import { utcToZonedTime } from 'date-fns-tz';

// export const Timer = ({ time, setTime }) => {
//   // const [time, setTime] = useState(
//   //   new Date('2024-03-26T00:00:00') -
//   //     new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' })),
//   // );
//   const [date, setDate] = useState({});

//   useEffect(() => {
//     setTimeout(() => {
//       setTime(time - 1000);
//     }, 1000);
//     getFormatDate(time);
//   }, [time]);

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//     });
//   }, []);

//   const getFormatDate = (milliseconds) => {
//     let total_seconds = parseInt(Math.floor(milliseconds / 1000));
//     let total_minutes = parseInt(Math.floor(total_seconds / 60));
//     let total_hours = parseInt(Math.floor(total_minutes / 60));
//     let days = parseInt(Math.floor(total_hours / 24));

//     let seconds = parseInt(Math.floor(total_seconds % 60));
//     let minutes = parseInt(Math.floor(total_minutes % 60));
//     let hours = parseInt(Math.floor(total_hours % 24));
//     return setDate({ days, hours, minutes, seconds });
//   };
//   const resetTimer = (data) => {
//     return time <= 0 ? <p>--</p> : data >= 10 ? <p>{data}</p> : <p>0{data}</p>;
//   };
//   return (
//     <div className={style.Timer}>
//       <p className={style.text_grey}>Left before the end of the fair launch</p>
//       <div className={style.counter}>
//         <div className={style.blockCounter}>
//           {resetTimer(date.days)}

//           <span className={style.text_grey}>D</span>
//         </div>

//         <span>:</span>
//         <div className={style.blockCounter}>
//           {resetTimer(date.hours)}
//           <span className={style.text_grey}>H</span>
//         </div>

//         <span>:</span>
//         <div className={style.blockCounter}>
//           {resetTimer(date.minutes)}
//           <span className={style.text_grey}>M</span>
//         </div>

//         <span>:</span>
//         <div className={style.blockCounter}>
//           {resetTimer(date.seconds)}
//           <span className={style.text_grey}>S</span>
//         </div>
//       </div>
//     </div>
//   );
// };
