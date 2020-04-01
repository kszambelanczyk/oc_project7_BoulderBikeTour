import React from 'react';
import moment from 'moment';

class Counter extends React.Component {
  state = {
    starttime: moment([2020,6,1]),
    showCounter: true,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    months: 0,
  }

  
  componentDidMount() {
    this.intervalHandle = setInterval(this.calculateDifTime, 1000);
    this.calculateDifTime();
  }

  calculateDifTime = () => {
    const now = moment();
    const { starttime } = this.state;
    let d = starttime.diff(now);
    if(d<0){
      // we are after the starttime so everything do not show counter
      this.setState(()=>({showCounter:false}));
      clearInterval(this.intervalHandle);
      return;
    }
    let months, days, hours, minutes, seconds;
    months = starttime.diff(now,'months');
    days = starttime.diff(now.add(months,'months'),'days');
    hours = starttime.diff(now.add(days,'days'),'hours');
    minutes = starttime.diff(now.add(hours,'hours'),'minutes');
    seconds = starttime.diff(now.add(minutes,'minutes'),'seconds');

    this.setState(()=>({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
      months: months,
    }));
    

  }

  padZero = (num) => {
    let s = num + "";
    if (s.length < 2) {
      s = "0" + s;
    }
    return s;
  }

  render() {
    const { showCounter } = this.state;
    const { months, days, hours, minutes, seconds } = this.state;
    if(!showCounter) {
      return;
    }
    return (
      <>
        <p>We start in</p>
        <span>{months} months, {days} days, {hours}:{this.padZero(minutes)}:{this.padZero(seconds)}</span>
      </>
    );
  }
}

export default Counter;