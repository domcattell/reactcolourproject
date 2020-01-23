import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import clsx from 'clsx';
import chroma from 'chroma-js'
import {Link} from 'react-router-dom'
import styles from '../styles/ColorBoxStyles'
import {withStyles} from '@material-ui/styles';

export class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {copied: false}
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1000)
        });
    }

    render() {
        const {name, background, id, paletteId, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background: background}}className={classes.ColorBox}>
                    <div style={{background: background}}className={clsx(classes.copyOverlay, copied && classes.showOverlay)}></div>
                    <div className={clsx(classes.copyMsg, copied && classes.copyMsgShow)}>
                        <h1 className="">Copied!</h1>
                        <p className={classes.copyText}>{this.props.background}</p>
                    </div>
                        <div>
                            <div className={classes.boxContent}>
                                <span className={classes.colourName}>{name}</span>
                            </div>
                            <button className={classes.copyBtn}>Copy</button>
                        </div>
                        {showingFullPalette && (
                            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                                <span className={classes.seeMore}>More</span>
                            </Link>
                        )}
                </div>
            </CopyToClipboard>
        );
    }
}


export default withStyles(styles)(ColorBox);
