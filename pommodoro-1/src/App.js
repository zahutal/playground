import React from 'react';
import pommodoro from './img/pommodoro.png'; 
import Timer from './components/Timer/Timer.js';
import styles from './App.module.css';

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
    let current = this.state.timeLeft;

    if (current > 0) {
      current--;
    } else if ( current >= 0) {
      current = 0;
      this.pauseTimer();
    }

    this.updateTimer(current);
  }

  changeTimerMode = () => {
    this.pauseTimer();

    if (this.state.timerMode === "work") {
      this.setState({timerMode: "break"});
      this.updateTimer(this.state.breakLength);
    } else if (this.state.timerMode === "break") {
      this.setState({timerMode: "work"});
      this.updateTimer(this.state.workLength);
    }
  }

  updateTimer(value) {
    this.setState({timeLeft: value});
  }

  startTimer = () => {
    const interval = () => {
      this.countDown();
    }

    let intervalCreate;

    if (!this.state.isTicking) {
      intervalCreate = setInterval( interval, 1000);
      this.setState({ isTicking: true });
      this.setState({ intervalID: intervalCreate });
    } else {
      console.log("timer already running!");
    }
  }

  pauseTimer = () => {
    clearInterval( this.state.intervalID );
    this.setState({isTicking: false});
  }

  resetTimer = () => {
    this.pauseTimer();

    if (this.state.timerMode === "work") {
      this.updateTimer(this.state.workLength);
    } else if (this.state.timerMode === "break") {
      this.updateTimer(this.state.breakLength);
    }
  }


  render() {

    return (
      <div className="Pommodoro container">

        <h1>Pommodoro</h1>

        <figure>
          <img 
            src={pommodoro}  
            onClick={ () => this.updateTimer(12) } 
            alt="Pommodoro timer" />
        </figure>

        <p>{this.state.timerMode.charAt(0).toUpperCase() + this.state.timerMode.slice(1)} time left: </p>
        <Timer timeLeft={this.state.timeLeft} />
        <p>Ticking: </p>

        <button
          className="button start"
          onClick={ this.startTimer }>
          start timer</button>
        <button
          className="button pause"
          onClick={ this.pauseTimer }>
          pause timer</button>
        <button
          className="button"
          onClick={ this.resetTimer }>
          reset timer</button>
        <button
          className="button"
          onClick={ this.changeTimerMode }>
          change mode</button>


        <p>mode: {this.state.timerMode}</p>

        <ol className="list"><strong>Technika Pomodoro krok po kroku</strong>

          <li>Zrób listę swoich zadań, posortuj ją według ważności.</li>
          <li>Podziel zadania na „pomidory” – czyli na takie kawałki, które da się zrealizować w 25 minut.</li>
          <li>Weź minutnik i ustaw go na 25 minut.</li>
          <li>Zrealizuj pierwsze zadanie nie odrywając się od niego. Nie rób w tym czasie niczego innego, nie odbieraj telefonów, nie sprawdzaj poczty. Rób jedną i tylko jedną rzecz.</li>
          <li>Kiedy timer zadzwoni, zrób 5 minut przerwy i ustaw timer ponownie na 25 minut. Swoje zrealizowane pierwsze zadanie oznacz na liście jako wykonane.</li>
          <li>Po zrealizowaniu 4 zadań – pomidorów zrób dłuższą przerwę, od 15 do 30 minut. Tyle ile potrzebujesz aby odpocząć ( możesz właśnie wtedy sprawdzić pocztę), potem powtórz cały cykl od początku.</li>

        </ol>

        <ol className="list"><strong>Święte zasady Techniki Pomodoro</strong>

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