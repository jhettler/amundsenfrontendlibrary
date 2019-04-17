import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';

import { configure, shallow } from 'enzyme';

import EntityCard, { EntityCardProps } from '../';
import EntityCardSection from '../EntityCardSection';

configure({ adapter: new Adapter() });

describe('EntityCard', () => {
    let props: EntityCardProps;
    let subject;

    beforeEach(() => {
        props = {
          sections: [
            {
              title: 'Title',
              infoText: 'Here is some info',
              contentRenderer: jest.fn(),
              isEditable: true,
            },
            {
              title: 'Title2',
              infoText: 'Here is some other info',
              contentRenderer: jest.fn(),
              isEditable: false,
            }
          ]
        };
        subject = shallow(<EntityCard {...props} />);
    });

    describe('render', () => {
        it('renders EntityCardSections', () => {
            expect(subject.find(EntityCardSection).length).toEqual(2));
        });

        it('passed correct props to EntityCardSection', () => {
            expect(subject.find(EntityCardSection).at(0).props()).toMatchObject({
                title: props.sections[0].title,
                infoText: props.sections[0].infoText,
                contentRenderer: props.sections[0].contentRenderer,
                isEditable: props.sections[0].isEditable,
            });
        });
    });
});
