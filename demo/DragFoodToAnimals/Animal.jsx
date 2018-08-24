import React from 'react';
import { DropTarget } from '../../src';

/*
    Animal is set up as a drop target. Required props are targetKey and name. 
*/
export default class Animal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlighted: false, thankYouMessage: ''};
        this.highlight = this.highlight.bind(this);
        this.unHighlight = this.unHighlight.bind(this);
        this.dropped = this.dropped.bind(this);
    }

    highlight() {
        this.setState({highlighted: true});
    }

    unHighlight() {
        this.setState({highlighted: false});
    }

    dropped(e) {
        e.containerElem.style.visibility="hidden";
        this.setState({thankYouMessage: `Thanks for the ${e.dragData.label}! ${e.dragData.tastes}!`})
        console.log({'Contents of drop data:':e});
        this.setState({highlighted: false});
    }

    render() {
        let styles = {
            padding: 4,
            borderRadius: 30,
            margin: 12,
            backgroundColor: (this.state.highlighted ? '#eeeeee' : 'transparent'),
            display:'inline-block',
            width: 160,
            textAlign: 'center',
        };
        return (
        <DropTarget
            onHit={this.dropped}
            onDragEnter={this.highlight}
            onDragLeave={this.unHighlight}
            targetKey={this.props.targetKey}
            dropData={{name: this.props.name}}
        >
            <div style={styles}>
            <div style={{minHeight: 24, fontStyle: 'italic'}}>
                {this.state.thankYouMessage}
            </div>
                {this.props.children}
            </div>
        </DropTarget>
        );
    }
}
