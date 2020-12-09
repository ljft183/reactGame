import './App.css';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import React, { Component } from 'react';
import Game from './components/Game'
import StopWatch from './components/StopWatch'
import Rank from './components/Rank'

const styles = theme => ({

  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      rank: '', //DB에서 가져올 rank정보
      stateSquare: 0,
      squares: [],
      clear:0,
      count:'',
      page:1
    }
    this.gameStart = this.gameStart.bind(this)
    this.stateRefresh = this.stateRefresh.bind(this)
    this.stateChange = this.stateChange.bind(this)
    this.correctSelect = this.correctSelect.bind(this)
    this.prevBtn = this.prevBtn.bind(this)
    this.nextBtn = this.nextBtn.bind(this)
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ rank: res }))
      .catch(err => console.log(err));

    this.callApi2()
      .then(res => this.setState({ count: res}))
      .catch(err => console.log(err));
  }

  stateChange = (res) => { //게임이 종료되었을 시 state 변경
    res *= 1;
    if (res === 1) { //정상적으로 완료할 경우
      this.setState({
        stateSquare: 0, //stateSquare 0처리를 통해 StopWatch 종료 
        squares: [],
        clear :1
      });
    }
  }

  callApi = async () => {
    const response = await fetch('/rank');
    const body = await response.json();
    return body; //서버에서 값을 받아 return
  }

  callApi2 = async () => {
    const response = await fetch('/rankCount');
    const body = await response.json();
    return body; //서버에서 값을 받아 return
  }


  correctSelect = (res) => {
    res *= 1;
    this.state.squares.splice(res, 1, '');
    this.setState({
      squares: this.state.squares
    });
  }



  stateRefresh() {
    this.setState({
      stateSquare: 0,
      squares: [],
      clear : 0
    });
    this.callApi()
       .then(res => this.setState({ rank: res }))
       .catch(err => console.log(err));
    this.callApi2()
      .then(res => this.setState({ count: res}))
      .catch(err => console.log(err));
  }

  gameStart() {
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    data.sort(function () {
      return Math.random() - Math.random();
    });
    this.setState({
      stateSquare: 1,
      squares: this.state.squares.concat(data)
    });
  }

  prevBtn(){
    if(this.state.page>1){
      this.setState({
        page : this.state.page - 1
      });
    }
  }
  nextBtn(){
    if(this.state.page<(this.state.count[0].count)/20){
      this.setState({
        page : this.state.page + 1
      });
    }
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return (c.ranking > (this.state.page-1)*20 && c.ranking<=this.state.page*20);
      });
      return data.map((c) => {
          return <Rank key={c.id} name={c.name} rank={c.ranking} time={c.time}/>
      });
    }
    const { classes } = this.props;
    return (
      <div ref={this.wrapper}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>Game</Typography>
          </Toolbar>
        </AppBar>
        <div className="table">          
          <table>
            <tbody>
              <tr>
                <td>- -Ranking- -</td>
                <td>- -name- -</td>
                <td>- -Record- -</td>
              </tr>
              {this.state.rank ? filteredComponents(this.state.rank) : console.log("데이터가 존재하지 않습니다.")}
            </tbody>
          </table>
          <div>
            <button onClick={this.prevBtn}>이전</button>
            <button onClick={this.nextBtn}>다음</button>
          </div>
        </div>
        <div className="description">
          <br/>
          1~16을 순서대로 누르는 게임&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className="center">
          <StopWatch square={this.state.stateSquare} clear={this.state.clear} stateRefresh={this.stateRefresh}/>
          <Game square={this.state.stateSquare} squares={this.state.squares} stateChange={this.stateChange} correctSelect={this.correctSelect} />
          <div>
            <button className="btn" onClick={this.gameStart}>시작</button>
            <button className="btn" onClick={this.stateRefresh}>리셋</button>
          </div>

        </div>
      </div>
    );
  }

}
export default withStyles(styles)(App);
