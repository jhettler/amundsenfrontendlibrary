import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';

import { configure, shallow } from 'enzyme';

import TableListItem from '../TableListItem';
import UserListItem from '../UserListItem';
import ResourceListItem, { ListItemProps } from '../';

configure({ adapter: new Adapter() });

describe('ResourceListItem', () => {
    let props: ListItemProps;
    let subject;

    beforeEach(() => {
        props = {
          loggingParams: { source: 'src', index: 0 },
          item: { type: 'table' },
        }
        subject = shallow(<ResourceListItem {...props} />);
    });

    describe('render', () => {
        it('renders TableListItem with correct props', () => {
          expect(subject.find(TableListItem).props()).toMatchObject({
            logging: props.logging,
            table: props.item,
          });
        });

        it('renders UserListItem with correct props', () => {
          props.item.type = 'user';
          subject.setProps(props);
          expect(subject.find(UserListItem).props()).toMatchObject({
            logging: props.logging,
            user: props.item,
          });
        });

        it('renders nothing if invalid props.item.type', () => {
          props.item.type = 'not a valid type';
          subject.setProps(props);
          expect(subject.props().children).toBeFalsy();
        });
    });
});
