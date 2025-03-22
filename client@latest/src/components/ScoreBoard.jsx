import React from 'react';

const getScoreboard = (players) => {
  const scoreBoard = players.filter(player => player.WPM !== -1); 
  return scoreBoard.sort((a, b) => b.WPM - a.WPM); 
};

const ScoreBoard = ({ players }) => {
  const scoreBoard = getScoreboard(players);
  
  if (scoreBoard.length <= 1) { 
    return null;  // Don't show the scoreboard if there is only 1 or fewer players
  }

  return (
    <table className='table table-striped my-3'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>User</th>
          <th scope='col'>WPM</th>
        </tr>
      </thead>
      <tbody>
        {
          scoreBoard.map((player, index) => (
            <tr key={`${player.nickName}-${player._id}`}>
              <th scope='row'>
                {index + 1}
              </th>
              <td>
                {player.nickName}
              </td>
              <td>{player.WPM === -1 ? "No words typed" : player.WPM}</td>  
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default ScoreBoard;
