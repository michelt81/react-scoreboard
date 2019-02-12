import React, { Component } from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      {
        name: "Guil",
        score: 0,
        id: 1
      },
      {
        name: "Treasure",
        score: 0,
        id: 2
      },
      {
        name: "Ashley",
        score: 0,
        id: 3
      },
      {
        name: "James",
        score: 0,
        id: 4
      }
    ]
  };

  prevPlayerId = 4;

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    console.log(scores)
    const highScore = Math.max(...scores);

    if (highScore) {
      return highScore;
    }
    return false;
  }
  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({

      score: prevState.players[index].score += delta
    }));
  }


  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name: name,
            score: 0,
            id: this.prevPlayerId += 1  
          }
        ]
      };
    });
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        payers: prevState.players.filter(p => p.id !== id)
      };
    });
  }


  render() {
    const highScore = this.getHighScore()

    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
  
        {/* Players list */}
        {this.state.players.map( (player, index) =>
          <Player 
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()} 
            index={index}
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}
            highestScore={highScore === player.score}        
          />
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer}/>
      </div>
    );
  }
}

export default App;
