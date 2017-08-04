import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

/*
    Code below requires a prop eventhough it's a stateless function because we
    need to access the method meteorCall.
*/
export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => props.meteorCall('notes.insert')}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
};

export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader);