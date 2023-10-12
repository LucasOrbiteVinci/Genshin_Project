//Hooks
import React, { useState, useEffect } from 'react';

// CSS
import style from './TimeDifference.module.css';

function TimerDifferenceCalculator() {
  const [player1Timers, setPlayer1Timers] = useState([
    '00:00',
    '00:00',
    '00:00',
  ]);
  const [player2Timers, setPlayer2Timers] = useState([
    '00:00',
    '00:00',
    '00:00',
  ]);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [winner, setWinner] = useState('');
  const [differences, setDifferences] = useState([0, 0, 0]);
  const [maxTimes, setMaxTimes] = useState([0, 0]);
  const [sumOfDifferences, setSumOfDifferences] = useState(0);
  const [resetsP1, setResetsP1] = useState(2);
  const [resetsP2, setResetsP2] = useState(2);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let player1TotalTime = calculateTotalTimeInSeconds(player1Timers);
    let player2TotalTime = calculateTotalTimeInSeconds(player2Timers);

    setDifferences(totalDifferences);
    setMaxTimes([player1TotalTime, player2TotalTime]);

    let sumOfTimerDifferences = totalDifferences.reduce(
      (sum, difference) => sum + difference,
      0,
    );
    setSumOfDifferences(sumOfTimerDifferences);

    if (player1TotalTime > player2TotalTime) {
      setWinner(`${player1Name} wins!`);
    } else if (player2TotalTime > player1TotalTime) {
      setWinner(`${player2Name} wins!`);
    } else {
      setWinner(`It's a tie!`);
    }
  }, [player1Timers, player2Timers, player1Name, player2Name]);

  const calculateTotalTimeInSeconds = (timers) => {
    return timers.reduce((totalSeconds, timer) => {
      const [minutes, seconds] = timer.split(':').map(Number);
      return totalSeconds + minutes * 60 + seconds;
    }, 0);
  };

  const totalDifferences = player1Timers.map((timer, index) => {
    let [minutes1, seconds1] = timer.split(':').map(Number);
    let [minutes2, seconds2] = player2Timers[index].split(':').map(Number);

    let differenceInSeconds = Math.abs(
      (minutes1 - minutes2) * 60 + (seconds1 - seconds2),
    );

    return differenceInSeconds;
  });

  const handleTimerChange = (e, player, index) => {
    let updatedTimers = player === 1 ? [...player1Timers] : [...player2Timers];
    updatedTimers[index] = e.target.value;

    if (player === 1) {
      return setPlayer1Timers(updatedTimers);
    }
    return setPlayer2Timers(updatedTimers);
  };

  const handleClearFields = () => {
    // Clear all the fields and reset to default values
    setPlayer1Timers(['00:00', '00:00', '00:00']);
    setPlayer2Timers(['00:00', '00:00', '00:00']);
    setPlayer1Name('');
    setPlayer2Name('');
    setWinner('');
    setDifferences([0, 0, 0]);
    setMaxTimes([0, 0]);
    setSumOfDifferences(0);
    setResetsP1(2);
    setResetsP2(2);
  };

  /// Hide and Show Button
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // HTML
  return (
    <>
      <div className={style.body}>
        <div className={style.playersbox}>
          <div className={style.player1reset}>
            <select
              onChange={(e) => setResetsP1(e.target.value)}
              type="Number"
              value={resetsP1}
            >
              <option value="2">2</option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>
          </div>
          <div>
            <input
              className={style.player1box}
              type="text"
              label="Name"
              placeholder="Player 1"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <div className={style.player1time}>
              {player1Timers.map((timer, index) => (
                <div key={index}>
                  <input
                    type="time"
                    value={timer}
                    onChange={(e) => handleTimerChange(e, 1, index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <input
              className={style.player2box}
              type="text"
              label="Name"
              placeholder="Player 2"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />

            <div className={style.player2time}>
              {player2Timers.map((timer, index) => (
                <div key={index}>
                  <input
                    type="time"
                    value={timer}
                    onChange={(e) => handleTimerChange(e, 2, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={style.player2reset}>
            <select
              onChange={(e) => setResetsP2(e.target.value)}
              type="Number"
              value={resetsP2}
            >
              <option value="2">2</option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>
          </div>
        </div>
        <div className={style.infos}>
          <div className={style.winner}>
            <span>
              <p>
                {winner}
                <br />
                Total: {Math.floor(
                  Math.abs(maxTimes[0] - maxTimes[1]) / 60,
                )}{' '}
                min : {Math.abs(maxTimes[0] - maxTimes[1]) % 60} secs.
              </p>
            </span>
          </div>
        </div>

        <div className={style.buttons}>
          <button className={style.clearbtn} onClick={handleClearFields}>
            Clear
          </button>
          <button className={style.infobtn} onClick={toggleVisibility}>
            Infos
          </button>{' '}
        </div>

        {isVisible ? '' : ''}
        {isVisible && (
          <div className={style.chambers}>
            {/* Content to be hidden or shown */}
            {differences.map((difference, index) => (
              <p key={index}>
                Chamber {index + 1} : {Math.floor(difference / 60)} min{' '}
                {difference % 60} sec
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={style.footer}>
        &copy;Dreyar
        <p>
          {' '}
          <a href="#" target="_blank">
            Suport the Developer.
          </a>
        </p>
      </div>
    </>
  );
}

export default TimerDifferenceCalculator;
