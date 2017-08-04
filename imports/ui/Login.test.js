import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if(Meteor.isClient) {
    describe('Login', function() {
        
        it('should show error message', function() {
            const error = 'This is not working';
            const wrapper = mount( <Login loginWithPassword={ ()=>{} } /> );
            
            wrapper.setState({ error });
            const pText1 = wrapper.find('p').text();
            expect(pText1).toBe(error);
            
            wrapper.setState({ error: '' });
            const pText2 = wrapper.find('p').length;
            expect(pText2).toBe(0);
        });
        
        it('should call loginWithPassword with form data', function() {
            const email = 'test@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount( <Login loginWithPassword={spy} /> );
            
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            
            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password);
        });
        
        it('should set loginWithPassword callback errors', function() {
            const spy = expect.createSpy();
            const wrapper = mount ( <Login loginWithPassword={spy} /> );
            
            wrapper.find('form').simulate('submit');
            
            spy.calls[0].arguments[2]({});
            const errorText1 = wrapper.state('error'); // or add .length
            expect(errorText1).toNotBe(''); // or expect(errorText).toNotBe(0)
            
            spy.calls[0].arguments[2]();
            const errorText2 = wrapper.state('error').length;
            expect(errorText2).toBe(0);
        });
        
    });
}