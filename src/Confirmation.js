import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    confirmationModal: {
        width: '30%',
        height: '40%',
        position: 'absolute',
        left: '50%',
        top: '0%',
        transform: 'translate(-50%, 50%)',
        backgroundColor: '#FF6B11',
        zIndex: 9999,
        borderRadius: '10px',
        border: '2px solid #FFFB11',
        padding: '20px',
        textAlign: 'center'

    },
    confirmationBackground: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        left: '0',
        top: '0',
        opacity: '0.5',
        backgroundColor: '#EAEAEA',
        zIndex: 0
    },
    title: {
        fontWeight: 'bold',
        fontSize: '2vw',
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: '40px',
        marginBottom:'30px'
    }
});
class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.classes.confirmationBackground}>

                </div>
                <div className={this.props.classes.confirmationModal}>
                    <div className={this.props.classes.title}>{this.props.message}</div>
                    <Button variant="contained" color="primary" className={this.props.classes.button} onClick={()=>this.props.onContinue()}>
                        {this.props.buttonText}
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Confirmation);
