import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient) {
    describe('Signup', function() {
        
        it('should show error message', function() {
            const error = 'This is not working';
            const wrapper = mount( <Signup createUser={ ()=>{} } /> );
            
            wrapper.setState({ error });
            const pText1 = wrapper.find('p').text();
            expect(pText1).toBe(error);
            
            wrapper.setState({ error: '' });
            const pText2 = wrapper.find('p').length;
            expect(pText2).toBe(0);
        });
        
        it('should call createUser with form data', function() {
            const email = 'test@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy} /> );
            
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            
            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });
        
        it('should set error if short password', function() {
            const email = 'test@test.com';
            const password = 'password   ';
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy} /> );
            
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            
            const errorText1 = wrapper.state('error').length;
            
            expect(errorText1).toBeGreaterThan(0);
        });
        
        it('should set createUser callback errors', function() {
            const password = 'password123!';
            const reason = 'this is why it failed';
            const spy = expect.createSpy();
            const wrapper = mount ( <Signup createUser={spy} /> );
            
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            
            spy.calls[0].arguments[1]({ reason });
            const errorText1 = wrapper.state('error');
            expect(errorText1).toBe(reason);
            
            spy.calls[0].arguments[1]();
            const errorText2 = wrapper.state('error').length;
            expect(errorText2).toBe(0);
        });
        
    });
}