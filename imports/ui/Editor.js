import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
    constructor (props) {
        super(props);
        
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    
    /*
        Code below updated the selected body field for the selected note id and
        updates the database on every new value change.
    */
    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        });
    }
    
    /*
        Below code will update the title of the current note that is selected
        and saves it on the database with every new change.
    */
    handleTitleChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        });
    }
    
    render () {
        if (this.props.note) {
            return (
                <div>
                    <input value={this.props.note.title} placeholder="Untitled Note" onChange={this.handleTitleChange} />
                    <textarea value={this.props.note.body} placeholder="Your note here." onChange={this.handleBodyChange}></textarea>
                    <button>Delete Note</button>
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
    note: PropTypes.object
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}, Editor);