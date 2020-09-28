import { format } from 'date-fns';
import { noop } from 'lodash-es';
import React, { Component } from 'react';
import { Icon } from 'Common/Components/Icons/Icon/Icon';
import { EMDIcons } from 'Core/Enums';
import { ITestProps } from 'Core/Models/AutoTestModels';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import './datePicker.scss';
import { Calendar } from './Components/Calendar/Calendar';
import { locale } from './Consts';

/** Модель props компонента. */
interface IProps extends ITestProps {
    /** Дата по умолчанию. */
    value: Date;
    /** Обработчик изменения даты. */
    onChange: (date: Date) => void;
    /** Текст ошибки. */
    errorText?: string;
    /** Текст placeholder. */
    label?: string;
    /** Идентификатор компонента. */
    id: string;
    /** Имя элемента формы компонента. */
    name: string;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Текст подсказка. */
    helpText?: string;
    /** Функция получения полей из файлов переводов. */
    t?(ns: string | string[]): string;
}

/** Модель state компонента. */
interface IState {
    /** Отображаемая дата. */
    currentDate: Date;
    /** true, если календарь отображается */
    visible: boolean;
}

/** Компонент Date Picker. */
export class ControlledDatePicker extends Component<IProps, IState> {
    /** @inheritdoc */
    state: IState = {
        currentDate: this.props.value || new Date(),
        visible: false
    };

    /** Ссылка на контейнер. */
    ref: React.RefObject<HTMLDivElement> = React.createRef();

    /** @inheritdoc */
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    /** @inheritdoc */
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    /** Обработчик нажатия вне элементов выпадающего списка. */
    handleClickOutside = (event) => {
        if (this.ref.current && !this.ref.current.contains(event.target) && this.ref.current !== event.target) {
          this.setState({visible: false});
        }
    }

    /** Обработчик на отображение календаря. */
    handleClick = () => {
        this.setState(prevState => ({ visible: !prevState.visible }));
    }

    /** Изменение выбранной даты. */
    handleChange = (currentDate: Date) => {
        this.props.onChange(currentDate);
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const { errorText, value, id, name, label, helpText, minDate, t, maxDate, dataQaId } = this.props;
        const { currentDate, visible } = this.state;
        const customClass = ['date-picker'];
        const customOverlay = ['date-picker__overlay'];
        const selectDate = ['date-picker__select-date'];
        const datePickerCalendar = ['date-picker__calendar'];
        visible && customOverlay.push('date-picker__overlay--visible');
        visible && datePickerCalendar.push('date-picker__calendar--visible');
        !!errorText && selectDate.push('date-picker__select-date--error');

        return (
            <div
                className={customClass.join(' ')}
                data-qa-id={!!dataQaId ? `${dataQaId}-data-picker` : ''}
            >
                <div className={customOverlay.join(' ')} />
                <div className="date-picker__preview" onClick={this.handleClick}>
                    <Icon className="date-picker__icon">{EMDIcons.DATE_PICKER}</Icon>
                    <input
                        name={name}
                        id={id}
                        type="text"
                        value={value && value.toISOString()}
                        className="date-picker__input"
                        onChange={noop}
                    />
                    <span className={selectDate.join(' ')}>
                        {!!value ? format(value, 'PPP', { locale }) : label}
                    </span>
                </div>

                <div className="date-picker__description">
                    {
                        !!errorText &&
                        <div className="date-picker__error-text">
                            {errorText}
                        </div>
                    }
                    {
                        !!helpText &&
                        <div className="date-picker__error-text">
                            {helpText}
                        </div>
                    }
                </div>
                <div
                    className={datePickerCalendar.join(' ')}
                    ref={this.ref}
                >
                    <Calendar
                        currentDate={currentDate}
                        selectedDate={value}
                        onChange={this.handleChange}
                        t={t}
                        minDate={minDate}
                        maxDate={maxDate}
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}
