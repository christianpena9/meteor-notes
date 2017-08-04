import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if(Meteor.isServer) {
    describe('users', function() {
        
        it('should allow valid email address', function() {
            const testUser = {
                emails: [{address: 'test@test.com'}]
            };
            const result = validateNewUser(testUser);
            
            expect(result).toBe(true);
        });
        
        it('should reject invalid email', function() {
            const testUser = {
                emails: [{address: 'testtest.'}]
            };
            
            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });
        
    }); // End of describe
} // End of Meteor.isServer

// const add = (a, b) => {
//     if(typeof b !== 'number') {
//         return a + a;
//     }
//     
//     return a + b;
// };
// 
// const square = (a) => a * a; 
// 
// /* 
//     Describe is used below for formating only. It helps us group different use
//     cases all together.
// */
// describe('add', function() {
//     
//     /*
//         It is the way you define a use case that should be tested. Need to throw
//         some kind of error so we know if the case passed or failed.
//     */
//     it('should add two numbers', function() {
//         const result = add(11, 9);
//         
//         expect(result).toBe(20);
//         
//         // if(result !== 20) {
//         //     throw new Error('Sum was not equal to expected value');
//         // }
//     });
// 
//     it('should double a single number', function() {
//         const result = add(44);
//         
//         expect(result).toBe(88);
//         // if(result !== 88) {
//         //     throw new Error('Number was not doubled.');
//         // }
//     });
// });
// 
// describe('square', function() {
//     it('should square a single number', function() {
//         const result = square(11);
//         
//         expect(result).toBe(121);
//         // if(result !== 121) {
//         //     throw new Error('Number was not squared.');
//         // }
//     });
// });