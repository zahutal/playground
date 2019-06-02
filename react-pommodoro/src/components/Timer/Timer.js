import React from 'react';
import styles from '../../App.module.css';


const Timer = (props) =>  {

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10)
    const hours   = Math.floor(sec_num / 3600) % 24
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60

    return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
  }

  return (
    <div>
      <time className={styles.timeLeft}>{toHHMMSS(props.timeLeft)}</time>
    </div>
  )

}

export default Timer;