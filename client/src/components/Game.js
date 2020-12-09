import React from 'react';
import Regist from './Regist';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count : 1,
            life : 0
        }
        this.countCompare = this.countCompare.bind(this)

    }

    countCompare(i, j){
        i*=1;
        if(this.props.square===1){
            if(this.state.count===i){
                if(this.state.count===16){
                    this.props.stateChange(1);
                    this.setState({
                        count : 1
                    });
                }
                else{
                    this.setState({
                        count : this.state.count+1
                    });
                }
                this.props.correctSelect(j);
            }
            else{
                if(this.state.life===3){

                }
                else{
                    this.setState({
                        life : this.state.life+1
                    });
                }
            }
        }
        else{
            alert("게임을 먼저 시작할 것");
        }
    }

    renderSquare(i) {
        return(
            <button value={this.props.squares[i]} className="square" onClick={e => this.countCompare(e.target.value, i)}>
                {this.props.squares[i]}
            </button>
        )
    }

    render() {
        if(this.state.count!==1&&this.props.square===0){
            this.setState({
                count : 1
            })
        }
        return (
            <div className="entry">
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
            </div>
        )
    }
}

export default Game;