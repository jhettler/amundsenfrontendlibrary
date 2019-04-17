import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';

import { configure, shallow } from 'enzyme';

import { Avatar } from 'react-avatar';
import AvatarLabel, { AvatarLabelProps } from '../';

configure({ adapter: new Adapter() });

describe('AvatarLabel', () => {
    let props: AvatarLabelProps;
    let subject;

    beforeEach(() => {
        props = {
          label: 'testLabel',
          src: 'testSrc',
        };
        subject = shallow(<AvatarLabel {...props} />);
    });

    describe('render', () => {
        /*TODO(ttannis) : Why can I not find Avatar
        it('renders Avatar with correct props', () => {
            expect(subject.find(Avatar).props()).toMatchObject({
                name: props.label,
                src: props.src,
                size: 24,
                round: true,
            });
        });*/

        it('renders label with correct text', () => {
            expect(subject.find('label').text()).toEqual(props.label);
        });
    });
});
