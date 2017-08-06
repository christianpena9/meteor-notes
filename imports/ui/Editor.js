import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
        
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleRemoval = this.handleRemoval.bind(this);
    }
    
    /*
        Code below updated the selected body field for the selected note id and
        updates the database on every new value change.
    */
    handleBodyChange (e) {
        const body = e.target.value;
        this.setState({ body })
        this.props.call('notes.update', this.props.note._id, { body });
    }
    
    /*
        Below code will update the title of the current note that is selected
        and saves it on the database with every new change.
    */
    handleTitleChange (e) {
        const title = e.target.value;
        this.setState({ title });
        this.props.call('notes.update', this.props.note._id, { title });
    }
    
    handleRemoval () {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }
    
    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
        
        if (currentNoteId && currentNoteId != prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }
    
    render () {
        if (this.props.note) {
            return (
                <div>
                    <input value={this.state.title} placeholder="Untitled Note" onChange={this.handleTitleChange} />
                    <textarea value={this.state.body} placeholder="Your note here." onChange={this.handleBodyChange}></textarea>
                    <button onClick={this.handleRemoval}>Delete Note</button>
                </div>
            );
        } else {
            return (
                <p>
                    {this.props.selectedNoteId ? 'Note not found.': 'Pick or create a note to get started.'}
                </p>
            );
        }
    }
}

Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    };
}, Editor);