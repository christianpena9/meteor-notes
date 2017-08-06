import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteList } from './NoteList';

const notes = [
    {
        _id: 'noteId1',
        title: 'Test Title',
        body: '',
        updatedAt: 0,
        userId: 'userId1'
    },
    {
        _id: 'noteId2',
        title: '',
        body: 'Something is here',
        updatedAt: 0,
        userId: 'userId2'
    }
];

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