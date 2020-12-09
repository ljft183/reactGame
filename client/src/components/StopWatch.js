import React, { Component } from 'react';
import Regist from './Regist'
class StopWatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            timer: 0.00,
            openRegist : false
        }
        this.startStopwatch = this.startStopwatch.bind(this)
        this.endStopwatch = this.endStopwatch.bind(this)
        this.registHandle = this.registHandle.bind(this)
    }
    tickRef;
    tick = () => {
        
        // isRunning이 true이면 timer를 0.01씩 증가
        if (this.state.isRunning) {
            this.setState({
                timer: this.state.timer + 0.01
            });
        }
    }
    startStopwatch = () => {
        this.setState({
            isRunning: true,
            timer : 0.00
        });
    }
    endStopwatch = () => {
        this.setState({
            isRunning: false,
            timer : 0.00,
            openRegist : false
        });
    }
    componentDidMount() {
        this.tickRef = setInterval(this.tick, 10);
    }
    componentWillUnmount() {
        clearInterval(this.tickRef);
        
    }
    handleReset = () => {
        this.setState({ timer: 0 });
    }
    registStopWatch(){
        this.setState({
            openRegist : true,
            isRunning : false
        });
    }
    registHandle = (res) => {
        if(res===1){
            this.endStopwatch();
        }          
    }


    render() {
        const opneRegist = 0;
        if(this.props.square*1===1&&!this.state.isRunning)
            this.startStopwatch();
        else if(this.props.square*1===0&&this.state.isRunning){
            if(this.props.clear*1===1){
                this.registStopWatch();
            }
            else{
                this.endStopwatch();
            }
        }
        const time = this.state.timer.toFixed(2);
        return (
            <div className="stopwatch">
                <Regist time={time} openRegist={this.state.openRegist} registHandle={this.registHandle} stateRefresh={this.props.stateRefresh}/>
                <span className="stopwatch-time">{time}</span>
            </div>
        )
    }
}
export default StopWatch;