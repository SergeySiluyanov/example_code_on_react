import React from 'react';
import { AbstractFormControl } from 'Common/Abstract/AbstractFormControl';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import './datePicker.scss';
import { ControlledDatePicker } from './ControlledDatePicker';

/** Модель props компонента. */
interface IProps {
    /** Дата по умолчанию. */
    initialValue?: Date;
    /** Текст placeholder */
    label?: string;
    /** Идентификатор компонента. */
    id: string;
    /** Имя элемента формы компонента. */
    name: string;
    /** Текст подсказка. */
    helpText?: string;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Минимальная возможная дата. */
    maxDate?: Date;
    /** Функция получения полей из файлов переводов. */
    t?(ns: string | string[]): string;
}

/** Модель state компонента. */
interface IState {
    /** Отображаемая дата. */
    value: Date;
    /** Текст ошибки. */
    errorText: string;
    /** true, если ошибка. */
    error: boolean;
    /** Показывать ли ошибки */
    hiddenErrors: boolean;
}

/** Компонент Date Picker. */
export class UncontrolledDatePicker extends AbstractFormControl<Date, IProps, IState> {
    /** @inheritdoc */
    state: IState = {
        hiddenErrors: true,
        errorText: '',
        error: false,
        value: this.props.initialValue || new Date()
    };

    /** Изменение выбранной даты. */
    handleChange = (value: Date) => {
        this.setState({value});
    }

    /** @inheritdoc */
    handleError = (errors: string[]) => {
        this.setState({ errorText: errors[0], error: true, hiddenErrors: false });
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const {id, name, label, minDate, t, maxDate} = this.props;
        const {errorText, value} = this.state;
        const customClass = ['date-picker__select-date'];
        !!errorText && customClass.push('date-picker__select-date--error');

        return (
            <div className="date-picker__wrapper">
                <ControlledDatePicker
                    value={value}
                    onChange={this.handleChange}
                    errorText={!!errorText && errorText}
                    label={label}
                    name={name}
                    t={t}
                    id={id}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>
        );
    }
}
