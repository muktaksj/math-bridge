import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    stage: {
        width: '43.5%',
        height: '100%',
        position: 'absolute',
        left: '48%',
        top: '0',
        transform: 'translate(-50%, 0%)'
    },
    piece: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '13.3%'
    }
});
class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { blockPosition: { top: 0, left: 5000 } };
        this.Block = React.createRef()
    }

    componentDidMount() {
        if (this.props.isRunning) {
            this.moveBlock(this.props.step, this.props.level);
            this.generateBridge(this.props.step);
        }
        else {
            this.setState({ blockPosition: { top: 0, left: 5000 } });

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        var $this = this;
        if (this.props.step !== prevProps.step) {
            //console.log("Step Upate",prevProps.step, this.props.step);
            if (this.props.step === 0) {
                if (this.props.level > prevProps.level) {
                    this.StepComplete = true;
                    this.LevelComplete = true;
                    clearInterval(this.BlockInterval);
                    this.moveBlock(prevProps.step, prevProps.level);
                }
                else {
                    this.generateBridge(this.props.step);
                    this.moveBlock(this.props.step, this.props.level);
                }
            }
            else if(this.props.step > prevProps.step) {
                this.StepComplete = true;
                clearInterval(this.BlockInterval);
                this.moveBlock(prevProps.step, prevProps.level);
            }
        }
        if (this.props.isRunning !== prevProps.isRunning) {
            //console.log("isRunning Upate", this.props.isRunning);
            if (this.props.isRunning) {
                this.setState({ blockPosition: { left: 5000, top: 0 } }, function () {
                    $this.generateBridge(this.props.step);
                    $this.moveBlock(this.props.step, this.props.level);
                });
            }
            else {
                if (this.BlockInterval) clearInterval(this.BlockInterval);
                this.setState({ blockPosition: { left: 5000, top: 0 } });
            }
        }
    }

    moveBlock(step, level) {
        //console.log("Move Block", step, level);
        var $this = this;
        var Steps = 60;
        var Increment = 69 / Steps;
        var CurrentTop = parseInt(this.Block.current.style.top);
        var CurrentLeft = step * this.Block.current.width;
        
        if (this.BlockInterval) clearInterval(this.BlockInterval);
        this.BlockInterval = setInterval(function () {
            CurrentTop += Increment;
            if (CurrentTop >= 68) {
                clearInterval($this.BlockInterval);
                if ($this.StepComplete || $this.LevelComplete) {
                    CurrentTop = 69;
                    $this.setState({ blockPosition: { left: 5000, top: 0 } }, function () {
                        if ($this.LevelComplete) {
                            $this.StepComplete = false;
                            $this.LevelComplete = false;
                            $this.generateBridge(step+1);
                            $this.props.onNextLevel();
                        }
                        else {
                            $this.StepComplete = false;
                            $this.LevelComplete = false;
                            $this.generateBridge($this.props.step);
                            $this.moveBlock($this.props.step, $this.props.level);
                        }
                    });
                }
                else {
                    $this.dropBlock(step);
                }
            }
            $this.setState({ blockPosition: { left: CurrentLeft, top: CurrentTop + "%" } });
        }, this.getSpeed(level));
    }

    dropBlock(step) {
        //console.log("Drop Block", step);
        var CurrentTop = 69;
        var CurrentLeft = step * this.Block.current.width;
        var $this = this;

        if (this.BlockInterval) clearInterval(this.BlockInterval);
        this.BlockInterval = setInterval(function () {
            CurrentTop += 1.5;
            if (CurrentTop <= 90) {
                $this.setState({ blockPosition: { left: CurrentLeft, top: CurrentTop + "%", transform: 'rotate(90deg)' } });
            }
            else {
                clearInterval($this.BlockInterval);
                $this.setState({ blockPosition: { left: 5000, top:0 } });
                $this.props.onNextAttempt();
            }
        }, 50);
    }

    getSpeed(level) {
        return (this.StepComplete ? 10 : (6 - level) * 100);
    }

    generateBridge(step) {
        var bridge = [];
        var left = 0;
        for (var x = 0; x < step; x++) {
            left = x * this.Block.current.width;
            bridge.push(
                <img key={"Block" + x} src="./img/CenterBlock.png" alt="" className={this.props.classes.piece} style={{ left: left, top: '69%' }} />
            )
        }
        this.setState({ bridge: bridge });
    }

    render() {
        return (
            <div className={this.props.classes.stage}>
                {this.state.bridge}
                <img src="./img/CenterBlock.png" alt="" ref={this.Block} className={this.props.classes.piece} style={this.state.blockPosition} />
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(Stage);
