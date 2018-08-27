import React from 'react';
import { DropTarget } from '../../src';

/*
    Animal is set up as a drop target. Required props are targetKey and name. 
*/
export default class Animal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {thankYouMessage: ''};
    }

    dropped = (e) => {
        e.containerElem.style.visibility="hidden";
        this.setState({thankYouMessage: `Thanks for the ${e.dragData.label}! ${e.dragData.tastes}!`})
        console.log({'onHit event passed to target animal:':e});
    };

    render() {
        return (
        <DropTarget
            onHit={this.dropped}
            targetKey={this.props.targetKey}
            dropData={{name: this.props.name}}
        >
            <div className='animal'>
                <div style={{minHeight: 24, fontStyle: 'italic'}}>
                    {this.state.thankYouMessage}
                </div>
                {this.props.children}
            </div>
        </DropTarget>
        );
    }
}
