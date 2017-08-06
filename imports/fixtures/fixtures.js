import moment from 'moment';

const timestamp = moment().valueOf();
const updatedAt = moment(timestamp).format('MM/DD/YYYY');

export const notes = [
    {
        _id: 'noteId1',
        title: 'Test Title',
        body: '',
        updatedAt: updatedAt,
        userId: 'userId1'
    },
    {
        _id: 'noteId2',
        title: '',
        body: 'Something is here',
        updatedAt: updatedAt,
        userId: 'userId2'
    }
];