import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';

if (Meteor.isClient) {
    
    describe('NoteList', function () {
        
        it('should render NoteListItem for each note', function () {
            const wrapper = mount(<NoteList notes={notes} />);
            const noteListItemCount = wrapper.find('NoteListItem').length;
            const noteListEmptyItemCount = wrapper.find('NoteListEmptyItem').length;
            
            expect(noteListItemCount).toBe(2);
            expect(noteListEmptyItemCount).toBe(0);
        });
        
        it('should render NoteListEmptyItem if zero notes', function () {
            const wrapper = mount(<NoteList notes={[]} />);
            const noteListItemCount = wrapper.find('NoteListItem').length;
            const noteListEmptyItemCount = wrapper.find('NoteListEmptyItem').length;
            
            expect(noteListItemCount).toBe(0);
            expect(noteListEmptyItemCount).toBe(1);
        });
        
    });
    
}