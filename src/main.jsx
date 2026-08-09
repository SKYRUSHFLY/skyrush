import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [multiplier, setMultiplier] = useState(1.0);
  const [running, setRunning] = useState(false);
  const [coins, setCoins] = useState(1000);
  const [bet, setBet] = useState(10);
  const [cashedOut, setCashedOut] = useState(false);
  const [message, setMessage] = useState("Place your bet");

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setMultiplier((m) => {
        const next = m + 0.01;

        if (Math.random() < 0.012 || next >= 12) {
          clearInterval(timer);
          setRunning(false);
          setMessage("🚀 CRASHED!");
          return next;
        }

        return next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [running]);

  const startRound = () => {
    if (running) return;

    if (bet <= 0 || bet > coins) {
      setMessage("Not enough coins");
      return;
    }

    setCoins((c) => c - bet);
    setMultiplier(1.0);
    setCashedOut(false);
    setMessage("Flying...");
    setRunning(true);
  };

  const cashOut = () => {
    if (!running || cashedOut) return;

    const win = Math.floor(bet * multiplier);

    setCoins((c) => c + win);
    setCashedOut(true);
    setRunning(false);
    setMessage(`Cashed out at ${multiplier.toFixed(2)}x`);
  };

  return (
    <div className="app">
      <header className="nav">
        <div className="logo">🚀 SKY<span>RUSH</span></div>
        <div className="coins">🪙 {coins}</div>
      </header>

      <main>
        <section className="hero">
          <div className="badge">● LIVE PLAY-MONEY GAME</div>

          <h1>
            How high will you <span>fly?</span>
          </h1>

          <p>
            Place your bet, watch the multiplier rise and cash out before
            the rocket crashes.
          </p>

          <div className="game-card">
            <div className="round">CURRENT ROUND</div>

            <div className={`multiplier ${running ? "flying" : ""}`}>
              {multiplier.toFixed(2)}x
            </div>

            <div className="rocket">
              🚀
            </div>

            <div className="status">{message}</div>

            <div className="controls">
              <div>
                <label>Bet coins</label>
                <input
                  type="number"
                  min="1"
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  disabled={running}
                />
              </div>

              {!running ? (
                <button onClick={startRound}>
                  🚀 START ROUND
                </button>
              ) : (
                <button className="cashout" onClick={cashOut}>
                  💰 CASH OUT
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="features">
          <div>
            <b>⚡ Instant Rounds</b>
            <p>Fast multiplayer-style rounds.</p>
          </div>

          <div>
            <b>🛡️ Fair Play</b>
            <p>Transparent play-money entertainment.</p>
          </div>

          <div>
            <b>🪙 1000 Free Coins</b>
            <p>Start playing without real money.</p>
          </div>
        </section>
      </main>

      <footer>
        SKYRUSH · Play-money entertainment only · No real money · No cash prizes
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
