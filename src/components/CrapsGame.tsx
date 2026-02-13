import React, { useState } from 'react';

type BetType = 'pass' | 'dont' | null;

const CrapsGame: React.FC = () => {
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(100);
  const [betType, setBetType] = useState<BetType>(null);
  const [round, setRound] = useState(0);
  const [canBet, setCanBet] = useState(true);

  const [die1, setDie1] = useState(1);
  const [die2, setDie2] = useState(1);
  const [totalRoll, setTotalRoll] = useState('Total: ?');
  const [result, setResult] = useState('');
  const [resultClass, setResultClass] = useState('result');
  const [isRolling, setIsRolling] = useState(false);

  // Start the game
  const startGame = () => {
    const name = tempUsername.trim() || 'Player';
    setUsername(name);
    setIsGameStarted(true);
  };

  // Bet controls
  const changeBet = (delta: number) => {
    setCurrentBet(prev => Math.max(10, Math.min(balance, prev + delta)));
  };
  const setMaxBet = () => setCurrentBet(balance);

  const placeBet = (type: 'pass' | 'dont') => {
    if (!canBet || currentBet <= 0 || currentBet > balance) return;

    setBetType(type);
    setBalance(prev => prev - currentBet);
    setCanBet(false);
    setResult(`Bet $${currentBet} on ${type.toUpperCase()}`);
    setResultClass('result');
  };

  // Dice roll with animation
  const rollDice = () => {
    if (isRolling || canBet) return;

    setIsRolling(true);
    let rolls = 0;

    const interval = setInterval(() => {
      setDie1(Math.ceil(Math.random() * 6));
      setDie2(Math.ceil(Math.random() * 6));
      rolls++;
      if (rolls > 12) {
        clearInterval(interval);
        // final roll
        const final1 = Math.ceil(Math.random() * 6);
        const final2 = Math.ceil(Math.random() * 6);
        const total = final1 + final2;

        setDie1(final1);
        setDie2(final2);
        setTotalRoll(`Total: ${total}`);
        setRound(prev => prev + 1);

        let message = `${final1} + ${final2} = ${total}`;
        let newClass = 'result ';

        if (betType === 'pass') {
          if ([7, 11].includes(total)) {
            setBalance(prev => prev + currentBet * 2);
            message += ' → YOU WIN!';
            newClass += 'win';
            resetRound();
          } else if ([2, 3, 12].includes(total)) {
            message += ' → YOU LOSE!';
            newClass += 'loss';
            resetRound();
          } else {
            message += ' → Roll again!';
            newClass += 'neutral';
          }
        } else if (betType === 'dont') {
          if ([2, 3].includes(total)) {
            setBalance(prev => prev + currentBet * 2);
            message += ' → YOU WIN!';
            newClass += 'win';
            resetRound();
          } else if ([7, 11].includes(total)) {
            message += ' → YOU LOSE!';
            newClass += 'loss';
            resetRound();
          } else if (total === 12) {
            message += ' → PUSH';
            newClass += 'push';
            setBalance(prev => prev + currentBet);
            resetRound();
          } else {
            message += ' → Roll again!';
            newClass += 'neutral';
          }
        }

        setResult(message);
        setResultClass(newClass);
        setIsRolling(false);
      }
    }, 80);
  };

  const resetRound = () => {
    setBetType(null);
    setCanBet(true);
  };

  // Render real dice dots
  const renderDots = (value: number) => {
    const positions: Record<number, number[]> = {
      1: [5],
      2: [1, 9],
      3: [1, 5, 9],
      4: [1, 3, 7, 9],
      5: [1, 3, 5, 7, 9],
      6: [1, 3, 4, 6, 7, 9],
    };
    return Array.from({ length: 9 }, (_, i) => (
      <span key={i} className={positions[value].includes(i + 1) ? 'dot' : 'dot hidden-dot'}></span>
    ));
  };

  return (
    <section id="craps-game">
      <div className="game-container">
        {!isGameStarted ? (
          <div id="username-screen">
            <h1>🎲 Casino Game 🎲</h1>
            <p style={{ margin: '20px 0' }}>Enter your name to start</p>
            <input
              type="text"
              value={tempUsername}
              onChange={e => setTempUsername(e.target.value)}
              placeholder="Your name..."
            />
            <button className="roll-btn" onClick={startGame}>Continue</button>
          </div>
        ) : (
          <>
            <h2>Welcome, {username}!</h2>
            <div className="balance">${balance}</div>
            <div className="round-info">Round: {round}</div>
            <div className="current-bet">
              Current Bet: {betType ? betType.toUpperCase() : 'None'}
            </div>

            <div className="dice-area">
              <div className={`die ${isRolling ? 'rolling' : ''}`}>{renderDots(die1)}</div>
              <div className={`die ${isRolling ? 'rolling' : ''}`}>{renderDots(die2)}</div>
            </div>

            <div id="total-roll">{totalRoll}</div>
            <div className={resultClass}>{result}</div>

            <div className="bet-types">
              <button className="bet-btn pass" onClick={() => placeBet('pass')} disabled={!canBet}>PASS LINE</button>
              <button className="bet-btn dont" onClick={() => placeBet('dont')} disabled={!canBet}>DON'T PASS</button>
            </div>

            <div className="bet-controls">
              <button onClick={() => changeBet(-25)} disabled={!canBet}>-25</button>
              <button onClick={() => changeBet(25)} disabled={!canBet}>+25</button>
              <button onClick={setMaxBet} disabled={!canBet}>MAX</button>
            </div>

            <button className="roll-btn" onClick={rollDice} disabled={canBet || isRolling}>ROLL DICE 🎲</button>
          </>
        )}
      </div>
    </section>
  );
};

export default CrapsGame;
