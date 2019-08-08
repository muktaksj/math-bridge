import React from 'react';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BreakpointProvider } from 'react-socks';
import Stage from './Stage';
import Problem from './Problem';
import Settings from './Settings';
import Confirmation from './Confirmation';

const styles = theme => ({
  appContainer: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#000000',
    overflow:'hidden'
  },
  appBackground: {
    maxWidth:'100%',
    height: 'auto',
    position:'relative'
  },
  stageContainer: {
    position: 'relative',
   
  }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: 1, step: 7, activity: "+", difficulty: 0, firstNumber: 1, secondNumber: 1,isRunning:false, confirmationMessage:"Welcome to Math Bridge! Please click Start to begin.",confirmationButtonText:"Start" };
    this.Problem = React.createRef();
    this.Stage = React.createRef();
    this.Confirmation = React.createRef();

    this.HandleSettingsChange = this.HandleSettingsChange.bind(this);
  }

  NextStep() {
    console.log("Next Step");
    var level = this.state.level;
    var step = this.state.step;
    step++;
    if (step === 8) {
      console.log("Level Complete");
      step = 0;
      level++;
    }
    if (level === 5) {
      console.log("Game Complete");
    }
    this.setState({ level: level, step: step });
    this.Problem.current.NewProblem();
  }

  NextAttempt() {
    console.log("Next Attempt");
    var $this = this;
    this.setState({ step: 0 }, function () {
      $this.Problem.current.NewProblem();
      $this.Stage.current.moveBlock($this.state.step, $this.state.level);
    });
  }

  HandleWrongAnswer() {
    this.Stage.current.dropBlock(0);
  }
  HandleSettingsChange(e) {
    this.setState({ activity: e.activity, difficulty:e.difficulty });
  }

  NextLevel() {
    console.log("Next Level");
    this.setState({confirmationMessage:'Congratulation! Click Continue to begin Next Level',confirmationButtonText:'Continue', isRunning: false });
  }

  render() {
    return (
      <BreakpointProvider>
        <CssBaseline />
        <div className={this.props.classes.appContainer} onKeyPress={this.HandleKeyPress}>
          <div className={this.props.classes.stageContainer}>
            <img className={this.props.classes.appBackground} alt="" src="/img/Background.png" />
            <Stage level={this.state.level} isRunning={this.state.isRunning} step={this.state.step} onNextAttempt={()=>this.NextAttempt()} onNextLevel={()=>this.NextLevel()} ref={this.Stage}>
              <Problem ref={this.Problem} isRunning={this.state.isRunning} difficulty={this.state.difficulty} activity={this.state.activity}  onCorrectAnswer={() => this.NextStep()} onWrongAnswer={()=>this.HandleWrongAnswer()}/>
            </Stage>
            <Settings level={this.state.level} activity={this.state.activity} difficulty={this.state.difficulty} onChange={this.HandleSettingsChange} />
            {!this.state.isRunning &&
              <Confirmation message={this.state.confirmationMessage} buttonText={this.state.confirmationButtonText} onContinue={()=>this.setState({isRunning:true})} />
            }
          </div>
        </div>
      </BreakpointProvider>
    );
  }
}

export default withStyles(styles)(App);
