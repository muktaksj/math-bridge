import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    problemContainer: {
        width: '100%',
        height: '18%',
        top: '80%',
        backgroundColor: '#F9CD2A',
        border: '2px solid #3363C2',
        borderRadius: '10px',
        position: 'relative',
        transform: 'translate(3%, 0%)',
        color: '#3363C2',
        padding: '5px 0',
        verticalAlign: 'middle',
        fontSize: '5vw',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    correctAnswer: {
        color: 'green'
    },
    incorrectAnswer: {
        color: 'red'
    },
    floatingBaloon: {
        position: 'absolute',
        left: '50%',
        top: '100%',
        textAlign: 'center',
        display: 'none',
        transform: 'translate(-50%, 0%)'
    },
    congratsLabel: {
        display: 'block',
        fontSize: '2vw',
        color: 'green',
        fontWeight: 'bold',
        backgroundColor: '#FDF06A',
        padding: '5px',
        borderRadius: '10px',
        border: '1px solid #3363C2',
        marginTop: '-36px'

    }
});
class Problem extends React.Component {
    answer = "";

    constructor(props) {
        super(props);
        this.state = { problem: "", answer: 0 };
        this.HandleKeyPress = this.HandleKeyPress.bind(this);
        this.ProblemContainer = React.createRef();
        this.Baloon = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("keydown", this.HandleKeyPress);
        this.NewProblem();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.HandleKeyPress);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activity !== this.props.activity || prevProps.difficulty !== this.props.difficulty || this.props.isRunning !== prevProps.isRunning) {
            this.NewProblem();
        }
    }

    HandleKeyPress(event) {
        var $this = this;

        if (event.key === "Backspace") {
            if (this.state.answer !== 0) {
                var temp = this.state.answer.toString().substr(0, this.state.answer.toString().length - 1);
                if (temp !== "") {
                    this.setState({ answer: parseInt(temp) }, function () {
                        $this.checkAnswer();
                    });
                }
                else {
                    this.setState({ answer: 0 }, function () {
                        $this.checkAnswer();
                    });
                }
            }
            return false;
        }


        if (event.keyCode >= 48 && event.keyCode <= 57) {
            this.setState({ answer: parseInt(this.state.answer + event.key) }, function () {
                $this.checkAnswer();
            });
            return true;
        }
        return false;
    }

    NewProblem() {
        if (!this.props.isRunning) return;
        var first = 0;
        var second = 0;

        switch (parseInt(this.props.difficulty)) {
            case 1:
                first = this.getRandomNumber(1, 20);
                second = this.getRandomNumber(1, 20);
                break;
            case 2:
                first = this.getRandomNumber(1, 50);
                second = this.getRandomNumber(1, 50);
                break;
            case 3:
                first = this.getRandomNumber(1, 100);
                second = this.getRandomNumber(1, 100);
                break;
            case 4:
                first = this.getRandomNumber(1, 999);
                second = this.getRandomNumber(1, 999);
                break;
            default:
                first = this.getRandomNumber(1, 9);
                second = this.getRandomNumber(1, 9);
                break;
        }

        var problem = first + " " + this.props.activity + " " + second;
        // eslint-disable-next-line
        this.answer = eval(problem);
        this.setState({ problem: problem });
    }

    getRandomNumber(fromNumber, toNumber) {
        return Math.floor(Math.random() * (toNumber - fromNumber + 1) + fromNumber);
    }

    cheers() {
        var $this = this;
        var baloon = this.Baloon.current;
        baloon.style.display = 'block';


        var pos = 100;
        var raiseBalloon = setInterval(function () {
            baloon.style.top = pos + "%";
            pos = pos - 2;
            if (pos <= 0) {
                clearInterval(raiseBalloon);
                baloon.style.display = 'none';
                baloon.style.top = "100%";
                $this.setState({ problem: "", answer: 0 }, function () {
                    $this.props.onCorrectAnswer();
                });
            }
        }, 30);
    }

    checkAnswer() {
        var $this = this;
        if (this.state.answer !== this.answer) {
            if (this.state.answer.toString().length === this.answer.toString().length) {
                this.setState({ problem: "Oops!", answer: 0 }, function () {
                    $this.props.onWrongAnswer();
                });

            }
            return;
        }
        this.cheers();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.problem !== "" &&
                    <div className={this.props.classes.problemContainer} ref={this.ProblemContainer}>
                        {this.state.problem}  {this.state.answer === 0 ? (this.state.problem === "Oops!" ? "" : " = ?") : " = " + this.state.answer}
                    </div>
                }
                <div className={this.props.classes.floatingBaloon} ref={this.Baloon}>
                    <img src="./img/baloons.png" alt="Congratulations!" width="200" />
                    <span className={this.props.classes.congratsLabel}>You got it!</span>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Problem);
