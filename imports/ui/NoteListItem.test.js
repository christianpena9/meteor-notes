import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment';

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
    describe('NoteListItem', function() {
        
        it('should render title and time stamp', function() {
            const title = 'My Title Here';
            const timestamp = moment().valueOf();
            const updatedAt = moment(timestamp).format('MM/DD/YYYY');
            const wrapper = mount(<NoteListItem note={ {title, updatedAt} } />);
            
            const h5Text = wrapper.find('h5').text();
            const pText = wrapper.find('p').text();
            
            expect(h5Text).toBe(title);
            expect(pText).toBe(updatedAt);
            
        });
        
        it('should set default title if no title set', function() {
            const title = '';
            const timestamp = moment().valueOf();
            const updatedAt = moment(timestamp).format('MM/DD/YYYY');
            const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );
            
            const h5Text = wrapper.find('h5').text();
            
            expect(h5Text).toBe('Untitled Note');
        });
        
    });
}