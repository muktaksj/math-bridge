import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    keypadContainer: {
        width: '22%',
        position: 'absolute',
        right: '1%',
        top: '2%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        border: '2px solid #3363C2',
        borderRadius: '10px',
        color: '#3363C2',
        textAlign: 'center'
       
    },
    button: {
        padding: '5%',
        margin: '3% 2%',
       
    }
    
});
class Keypad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.letters=["0","1","2","3","4","5","6","7","8","9","Back"]
    }
    render() {
        return (
            <div className={this.props.classes.keypadContainer}>
                {this.letters.map((item, key) =>
                    <Button key={item} variant="contained" color="primary" className={this.props.classes.button} onClick={()=>this.props.onClick(item)}>
                        {item}
                    </Button>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Keypad);
