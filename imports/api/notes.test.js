import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer) {
    describe('notes', function() {
        
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My Body for Note',
            updatedAt: 0,
            userId: 'testUserId1'
        };
        
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things to do',
            body: 'walk the dog',
            updatedAt: 0,
            userId: 'testUserId2'
        };
        
        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });
        
        it('should insert new note', function() {
            const userId = 'testId';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
            
            expect( Notes.findOne({ _id, userId }) ).toExist();
        });
        
        it('should not insert note if not authenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });
        
        it('should remove note', function() {
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne.userId]);
        
            expect(Notes.findOne({_id: noteOne.userId})).toNotExist();
        });
        
        it('should not remove a note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne.userId]);
            }).toThrow();
        });
        
        it('should not remove not if invalide id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, []);
            }).toThrow();
        });
        
        it('should update note', function() {
            const title = 'This is an updated title';
            
            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [noteOne._id, {title}]);
            
            const note = Notes.findOne(noteOne._id);
            
            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({
                title,
                body: noteOne.body
            });
        });
        
        it('should throw error if extra updates provided', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [noteOne.age: 20]);
            }).toThrow();
        });
        
        it('should not update if user is not the creator', function() {
            const title = 'This is an updated title';
            
            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testId'
            }, [noteOne._id, {title}]);
            
            const note = Notes.findOne(noteOne._id);
            
            expect(note).toInclude(noteOne);
        });
        
        it('should not update a note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne.userId]);
            }).toThrow();
        });
        
        it('should not update not if invalide id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId}, []);
            }).toThrow();
        });
        
        it('should return a users notes', function() {
            const result = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
            const notes = result.fetch();
            
            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });
        
        it('should return no notes if user has none', function() {
            const result = Meteor.server.publish_handlers.notes.apply({ userId: 'testId' });
            const notes = result.fetch();
            
            expect(notes.length).toBe(0);
        });
        
    }); // End of describe
} // End of Meteor.isServer