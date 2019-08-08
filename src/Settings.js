import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    settingsContainer: {
        width: '20%',
        position: 'absolute',
        left: '1%',
        top: '2%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        border: '2px solid #3363C2',
        borderRadius: '10px',
        color: '#3363C2',
        padding: '10px',
        textAlign:'center'
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: '80%',
      },
    group: {
        margin: theme.spacing(1, 0),
    },
    title: {
        fontWeight: 'bold',
        fontSize: '3vw',
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: '1.5vw',
        textAlign: 'center',
        color:'gray'
    },
    dropDown: {
        width:'100%'
    }
});
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activity: this.props.activity, difficulty: this.props.difficulty };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        var state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        this.props.onChange(state);
    }
    render() {
        return (
            <div className={this.props.classes.settingsContainer}>
                <div className={this.props.classes.title}>Level {this.props.level}</div>
                <FormControl variant="outlined" className={this.props.classes.formControl}>
                    <div className={this.props.classes.label}>Activity</div>
                    <Select
                        autoWidth={false}
                        value={this.state.activity}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'activity',
                            id: 'activity',
                        }}
                        className={this.props.classes.dropDown}
                    >
                        <MenuItem value="+">Addition</MenuItem>
                        <MenuItem value="-">Subtraction</MenuItem>
                        <MenuItem value="*">Multiplication</MenuItem>
                        <MenuItem value="/">Division</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <FormControl variant="outlined" className={this.props.classes.formControl}>
                <div className={this.props.classes.label}>Difficulty</div>
                    <Select
                        autoWidth={false}
                        value={this.state.difficulty}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'difficulty',
                            id: 'difficulty',
                        }}
                        className={this.props.classes.dropDown}
                    >
                        <MenuItem value="0">Single Digit Numbers</MenuItem>
                        <MenuItem value="1">Numbers between 1 to 20</MenuItem>
                        <MenuItem value="2">Numbers between 1 to 50</MenuItem>
                        <MenuItem value="3">Numbers between 1 to 100</MenuItem>
                        <MenuItem value="4">Numbers up to 1000</MenuItem>
                    </Select>
                </FormControl>
                <br/><br/>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
