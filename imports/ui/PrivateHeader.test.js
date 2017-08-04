import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

/* Testing Component on the Client */
if(Meteor.isClient) {
    describe('PrivateHeader', function() {
        it('should set button text to logout', function() {
            /*
                When testing a component we will declare our component and add
                any props that it needs. Mount is the enzyme function that we
                will be using to test that our component is working as expected
            */
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}} /> );
            
            /*
                mount provides some functions that helps us find the specific
                element that we are looking for/targeting. It's very similar to
                jQuery on how we can select the element. We can use className or
                we can use the name of the element (in this case button).
            */
            const buttonText = wrapper.find('button').text();
            
            expect(buttonText).toBe('Logout');
        });
        
        it('should use title prop as h1 text', function() {
            const title = 'Test title here';
            const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}} /> );
            const h1Text = wrapper.find('h1').text();
            
            expect(h1Text).toBe(title);
        });
        
        // it('should call the function', function() {
        //     const spy = expect.createSpy();
        //     spy(3);
        //     spy('Christian');
        //     expect(spy).toHaveBeenCalledWith(3);
        // });
        
        it('should call handleLogout on click', function() {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title='Title' handleLogout={spy} /> );
            
            /* Code below simulates a click on our component */
            wrapper.find('button').simulate('click');
            
            expect(spy).toHaveBeenCalled();
        });
        
    });
}