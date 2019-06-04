import React from 'react';
import pommodoro from './img/pommodoro.png'; 
import styles from './App.module.css';
import Timer from './components/Timer/Timer.js';

class Pommodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      timerMode: "work",
      workLength: 1500,
      breakLength: 300,
      timeLeft: 1500,
      isTicking: false,
      intervalID: 0
    };
  }

  countDown = () => {
    let { timeLeft } = this.state;

    timeLeft--;
    this.updateTimer(timeLeft);
  }

  updateTimer(value) {
    if (value === 0) {
      this.playAlert();
      this.pauseTimer();
    }

    this.setState({timeLeft: value});
  }

  startTimer = () => {
    if (this.state.isTicking) {
      console.log("timer already running!");
      return false;
    }

    const _interval = () => {
            this.countDown();
          },
          _intervalCreate = setInterval( _interval, 1000);

    this.setState({ 
        isTicking: true,
        intervalID: _intervalCreate
    });
  }

  pauseTimer = () => {
    clearInterval( this.state.intervalID );
    this.setState({isTicking: false});
  }

  resetTimer = () => {
    const { timerMode } = this.state,
          newTimeValue = timerMode === 'work' ? this.state.workLength : this.state.breakLength;

    this.pauseTimer();
    this.updateTimer(newTimeValue);
  }

  changeTimerMode = () => {
    const { timerMode } = this.state,
          newLength = timerMode === 'break' ? this.state.workLength : this.state.breakLength;

    this.setState({
      timerMode: timerMode === 'break' ? 'work' : 'break'
    })

    this.pauseTimer();
    this.updateTimer(newLength);
  }

  playAlert = () => {
    console.log("TING");
  }

  render() {

    return (
      <div className={styles.Pommodoro}>

        <h1>Pommodoro</h1>

        <figure>
          <img 
            src={pommodoro}  
            onClick={ () => this.updateTimer(3) } 
            alt="Pommodoro timer" />
        </figure>

        <p className={styles.subtitle}>
          { this.state.timerMode.toUpperCase() } time left: 
        </p>

        <Timer timeLeft={this.state.timeLeft} />

        <div className={styles.buttons__action}>
          <button
            className={styles.button__start}
            onClick={ this.startTimer }>
            start timer</button>
          <button
            className={styles.button__pause}
            onClick={ this.pauseTimer }>
            pause timer</button>
        </div>

        <div className={styles.buttons__option}>
          <button
            className={styles.button}
            onClick={ this.changeTimerMode }>
            change mode</button>
          <button
            className={styles.button}
            onClick={ this.resetTimer }>
            reset timer</button>
        </div>

        <ol className={styles.list}><strong>Technika Pomodoro krok po kroku</strong>
          <li>Zrób listę swoich zadań, posortuj ją według ważności.</li>
          <li>Podziel zadania na „pomidory” – czyli na takie kawałki, które da się zrealizować w 25 minut.</li>
          <li>Weź minutnik i ustaw go na 25 minut.</li>
          <li>Zrealizuj pierwsze zadanie nie odrywając się od niego. Nie rób w tym czasie niczego innego, nie odbieraj telefonów, nie sprawdzaj poczty. Rób jedną i tylko jedną rzecz.</li>
          <li>Kiedy timer zadzwoni, zrób 5 minut przerwy i ustaw timer ponownie na 25 minut. Swoje zrealizowane pierwsze zadanie oznacz na liście jako wykonane.</li>
          <li>Po zrealizowaniu 4 zadań – pomidorów zrób dłuższą przerwę, od 15 do 30 minut. Tyle ile potrzebujesz aby odpocząć ( możesz właśnie wtedy sprawdzić pocztę), potem powtórz cały cykl od początku.</li>
        </ol>

        <ol className={styles.list}><strong>Święte zasady Techniki Pomodoro</strong>
          <li>Przerwę możesz zacząć tylko w momencie, kiedy zadzwoni minutnik, nie wcześniej.</li>
          <li>Jeżeli masz zadanie wymagające poświęcenia mu dużej ilości czasu, podziel je na mniejsze części.</li>
          <li>Odwrotnie, jeżeli zadanie jest krótsze niż jeden „pomidor”, dorzuć do niego kolejne krótkie zadanie, aby cały „pomidor” był wypełniony.</li>
          <li>Restrykcyjne stosowanie Techniki Pomodoro nie zawsze jest sensowne. Być może Twoje zadania wymagają 40 minutowych pomidorów, zamiast 25 minut. Może wtedy dla Ciebie lepsza będzie 10 minutowa przerwa. Ty wiesz najlepiej. Dopasuj tę technikę do specyfiki Twojej pracy.</li>
          <li>Nie korzystaj z tej techniki w swoim wolnym czasie. </li>
        </ol>

      </div>
    );
  }
}

export default Pommodoro;