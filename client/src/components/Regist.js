import React from 'react'
import { post } from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class Regist extends React.Component {
    constructor(props) { //insert 시킬 목록 및 method 초기화
        super(props);
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
        if(this.state.name){
            this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
            
            this.props.registHandle(1);
            this.setState({
                name: '',
                time: 0.00,
                open :false
            })
            this.props.stateRefresh();
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
        if(this.props.openRegist&&!this.state.open){
            this.handleClickOpen();
        }
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>점수 등록</DialogTitle>

                    <DialogContent>
                        <TextField type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                        <TextField type="text" name="time" value={this.props.time} readonly/><br />
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

export default withStyles(styles)(Regist)