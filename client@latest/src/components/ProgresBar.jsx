import React from 'react';

const ProgresBar = ({ players, player, wordLength }) => {
  const calculatePercentage = (currentWordIndex, wordLength) => {
    return ((currentWordIndex / wordLength) * 100).toFixed(2) + "%";
  };

  return (
    <div>
      <h5 className="text-left">{player.nickName}</h5>
      <div className="progress my-1" key={player._id}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: calculatePercentage(player.currentWordIndex, wordLength),
          }}
        >
          {calculatePercentage(player.currentWordIndex, wordLength)}
        </div>
      </div>

      {players.map((playerObj) => {
        if (playerObj._id !== player._id) {
          return (
            <div key={playerObj._id}>
              <h5 className="text-left">{playerObj.nickName}</h5>
              <div className="progress my-1">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: calculatePercentage(playerObj.currentWordIndex, wordLength),
                  }}
                >
                  {calculatePercentage(playerObj.currentWordIndex, wordLength)}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ProgresBar;
