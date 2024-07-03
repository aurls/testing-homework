import React from 'react';

import events from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Form } from '../../src/client/components/Form';

describe('<Form />', () => {
    it('marks empty name as invalid', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const name = container.querySelector('.Form-Field_type_name') as HTMLInputElement;
        const submit = container.querySelector('.Form-Submit') as HTMLButtonElement;

        await events.click(submit);

        expect(name).toHaveClass('is-invalid');
    });


    it('marks empty phone as invalid', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const phone = container.querySelector('.Form-Field_type_phone') as HTMLInputElement;
        const submit = container.querySelector('.Form-Submit') as HTMLButtonElement;

        await events.click(submit);

        expect(phone).toHaveClass('is-invalid');
    });

    it('marks invalid phone correctly', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const phone = container.querySelector('.Form-Field_type_phone') as HTMLInputElement;
        const submit = container.querySelector('.Form-Submit') as HTMLButtonElement;

        await events.type(phone, '123');
        await events.click(submit);

        expect(phone).toHaveClass('is-invalid');
    });

    it('marks empty address as invalid', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const address = container.querySelector('.Form-Field_type_address') as HTMLTextAreaElement;
        const submit = container.querySelector('.Form-Submit') as HTMLButtonElement;

        await events.click(submit);

        expect(address).toHaveClass('is-invalid');
    });

    it('does not submit incorrect data', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const phone = container.querySelector('.Form-Field_type_phone') as HTMLInputElement;
        const submit = container.querySelector('.Form-Submit') as HTMLButtonElement;

        await events.type(phone, '123');
        await events.click(submit);

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('submits correct data properly', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const name = container.querySelector('.Form-Field_type_name') as HTMLInputElement;
        const phone = container.querySelector('.Form-Field_type_phone') as HTMLInputElement;
        const address = container.querySelector('.Form-Field_type_address') as HTMLTextAreaElement;
        const submit = container.querySelector('.Form-Submit') as HTMLButtonElement;

        await events.type(name, 'name');
        await events.type(phone, '1234567890');
        await events.type(address, 'a');
        await events.click(submit);

        expect(onSubmit).toHaveBeenCalledWith({ name: 'name', phone: '1234567890', address: 'a' });
    });
});
