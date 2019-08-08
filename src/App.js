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
    overflow: 'hidden'
  },
  appBackground: {
    maxWidth: '100%',
    height: 'auto',
    position: 'relative'
  },
  stageContainer: {
    position: 'relative',

  }
});
class App extends React.Component {
  constructor(props) {
    super(props);

    var storage = localStorage.getItem("progress");
    var level = 1;
    var step = 0;
    var activity="+";
    var difficulty = 0;
    console.log("Storage", storage);
    if (storage && storage!=="undefined") {
      var progress = JSON.parse(storage);
      level = progress.level;
      step = progress.step;
    }

    storage = null;

    storage = localStorage.getItem("settings");
    if (storage && storage!=="undefined") {
      var settings = JSON.parse(storage);
      activity = settings.level;
      difficulty = settings.step;
    }

    this.state = { level: level, step: step, activity: activity,difficulty: difficulty, isRunning: false, confirmationMessage: "Welcome to Math Bridge! Please click Start to begin.", confirmationButtonText: "Start" };
    this.Problem = React.createRef();
    this.Stage = React.createRef();
    this.Confirmation = React.createRef();

    this.HandleSettingsChange = this.HandleSettingsChange.bind(this);
  }

  NextStep() {
    //console.log("Next Step");
    var level = this.state.level;
    var step = this.state.step;
    step++;
    if (step === 8) {
      //console.log("Level Complete");
      step = 0;
      level++;
    }
    if (level === 5) {
      //console.log("Game Complete");
      level = 1;
      step = 0;
    }

    var progress = { level: level, step: step };
    localStorage.setItem("progress", JSON.stringify(progress));
    this.setState(progress);
    this.Problem.current.NewProblem();
  }

  NextAttempt() {
    //console.log("Next Attempt");
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
    var settings = { activity: e.activity, difficulty: e.difficulty };
    localStorage.setItem("settings", JSON.stringify(settings));
    this.setState(settings);
  }

  NextLevel() {
    //console.log("Next Level");

    this.setState({ confirmationMessage: 'Congratulation! Click Continue to begin Next Level', confirmationButtonText: 'Continue', isRunning: false });
  }

  render() {
    return (
      <BreakpointProvider>
        <CssBaseline />
        <div className={this.props.classes.appContainer} onKeyPress={this.HandleKeyPress}>
          <div className={this.props.classes.stageContainer}>
            <img className={this.props.classes.appBackground} alt="" src="/img/Background.png" />
            <Stage level={this.state.level} isRunning={this.state.isRunning} step={this.state.step} onNextAttempt={() => this.NextAttempt()} onNextLevel={() => this.NextLevel()} ref={this.Stage}>
              <Problem ref={this.Problem} isRunning={this.state.isRunning} difficulty={this.state.difficulty} activity={this.state.activity} onCorrectAnswer={() => this.NextStep()} onWrongAnswer={() => this.HandleWrongAnswer()} />
            </Stage>
            <Settings level={this.state.level} activity={this.state.activity} difficulty={this.state.difficulty} onChange={this.HandleSettingsChange} />
            {!this.state.isRunning &&
              <Confirmation message={this.state.confirmationMessage} buttonText={this.state.confirmationButtonText} onContinue={() => this.setState({ isRunning: true })} />
            }
          </div>
        </div>
      </BreakpointProvider>
    );
  }
}

export default withStyles(styles)(App);
