import React from 'react'
import { post } from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Regist extends React.Component {
    constructor(props) { //insert 시킬 목록 및 method 초기화
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            name: '',
            time: 0.00,
            open : false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
    

    handleFormSubmit(e) {
        e.preventDefault()
        if(this.state.name.length<4){
            if(this.state.name){
            
                this.addCustomer()
                .then((response) => {
                    console.log(response.data);
                    this.props.stateRefresh();
                })
                this.props.registHandle(1);
                this.setState({
                    name: '',
                    time: 0.00,
                    open :false
                })
                
            }
        }
        else{
            alert("3글자 밑으로 입력");
        }
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer() {
        const url = '/regist';
        return post(url, {name : this.state.name, time : this.state.time})
    }

    handleClickOpen() {
        this.setState({
            open: true,
            time : this.props.time
        });
    }

    componentDidUpdate(){
        if(this.props.openRegist&&!this.state.open){
            this.handleClickOpen();
        }
    }

    handleClose() {
        this.props.stateRefresh();
        this.props.registHandle(1);
        this.setState({
            name: '',
            time: '',
            open: false
        })
    }

    render() {

        return (
            <div ref={this.wrapper}>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>점수 등록</DialogTitle>

                    <DialogContent>
                        <TextField type="text" placeholder="3글자 아래로 가능" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                        <TextField type="text" name="time" value={this.props.time} readOnly={true}/><br />
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>기록저장</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Regist;