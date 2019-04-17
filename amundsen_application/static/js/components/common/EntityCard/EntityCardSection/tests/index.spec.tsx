import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';

import { configure, shallow } from 'enzyme';

import InfoButton from "../../../InfoButton";
import EntityCardSection, { EntityCardSectionProps } from '../';

configure({ adapter: new Adapter() });

describe('EntityCardSection', () => {
    let props: EntityCardSectionProps;
    let subject;

    beforeEach(() => {
        props = {
          title: 'Title',
          contentRenderer: jest.fn(() => (<div>HI!</div>)),
          isEditable: true,
        };
        subject = shallow(<EntityCardSection {...props} />);
    });

    describe('render', () => {
        it('renders the title', () => {
            expect(subject.find('.title').text()).toEqual('TITLE');
        });

        it('renders InfoButton w/ correct props if props.infoText', () => {
            props.infoText = 'Here is some info';
            subject.setProps(props);
            expect(subject.find(InfoButton).props()).toMatchObject({
              infoText: props.infoText,
              placement: 'top',
              size: 'small',
            });
        });

        it('renders button to toggle edit mode if props.isEditable', () => {
            expect(subject.find('button').props().onClick).toEqual(subject.instance().toggleEditMode);
        });


        it('renders with correct class if state.readOnly', () => {
            subject.setState({ readOnly: true });
            expect(subject.find('button').props().className).toEqual('btn icon edit-button');
        });

        it('renders with correct class if !state.readOnly', () => {
            subject.setState({ readOnly: false });
            expect(subject.find('button').props().className).toEqual('btn active-edit-button');
        });

        it('renders with expected content', () => {
            expect(subject.find('.content').props().children).toEqual(<div>HI!</div>);
        });
    });

    describe('toggleEditMode', () => {
        const mockBlur = jest.fn();
        beforeEach(() => {
            subject.instance().editButton = { current: { blur: mockBlur } };
        });

        it('negates state.readOnly if props.isEditable', () => {
            subject.setState({ readOnly: true });
            subject.instance().toggleEditMode();
            expect(subject.instance().state.readOnly).toEqual(false);
        });

        it('does not update state.readyOnly if !props.isEditable', () => {
            props.isEditable = false;
            subject.setProps(props);
            subject.setState({ readOnly: true });
            subject.instance().toggleEditMode();
            expect(subject.instance().state.readOnly).toEqual(true);
        });

        it('calls blur on editButton', () => {
            subject.instance().toggleEditMode();
            expect(mockBlur).toHaveBeenCalled();
        });
    });
});
