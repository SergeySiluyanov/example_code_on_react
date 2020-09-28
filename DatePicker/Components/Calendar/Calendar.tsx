import { addMonths, addYears } from 'date-fns';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { ECalendarStep } from '../../Consts';
import { Decade } from '../Decade/Decade';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Month } from '../Month/Month';
import { Year } from '../Year/Year';
import './calendar.scss';

/** Модель props компонента. */
interface IProps {
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата. */
    selectedDate: Date;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Метод изменения даты. */
    onChange: (date: Date) => void;
    /** Функция получения полей из файлов переводов. */
    t?(ns: string | string[]): string;
    /** Обработчик нажатия на кнопку подтверждения. */
    onClick?(): void;
}

/** Модель state компонента. */
interface IState {
    /** true, выбранный день. */
    active: boolean;
    /** Отображаемая дата. */
    currentDate: Date;
    /** Шаг переключения. */
    step: ECalendarStep;
}

/** День месяца. */
export class Calendar extends Component<IProps, IState> {

    /** @inheritdoc */
    state: IState = {
        active: false,
        currentDate: this.props.currentDate,
        step: ECalendarStep.MONTH
    };

    /**
     * Функция получения дефолтного преобразователя относительно выбранного шага календаря.
     * @param isIncrement Флаг увеличения или уменьшения даты.
     */
    getSpecifiedUnitFunc = (isIncrement?: boolean) => {
        const {step} = this.state;
        const multiplier = isIncrement ? 1 : -1;

        switch (step) {
            case ECalendarStep.MONTH:

                return (date: Date) => {
                    return addMonths(date, 1 * multiplier);
                };

            case ECalendarStep.YEAR:

                return (date: Date) => {
                    return addYears(date, 1 * multiplier);
                };

            case ECalendarStep.DECADE:

                return (date: Date) => {
                    return addYears(date, 9 * multiplier);
                };

            default: break;
        }
    }

    /**
     * Функция перелистывания представления календаря на шаг. 
     * @param isIncrement Флаг увеличения или уменьшения даты.
     */
    handleChangeDate = (isIncrement?: boolean) => this.handleChangeCurrentDateFactory(
        this.getSpecifiedUnitFunc(isIncrement)
    );

    /** 
     * Функция переключения шага календаря, с последующим изменения даты.
     * @param modifier функция преобразования текущей даты в необходимую.
     */
    handlePickDate = (modifier?: (date: Date) => Date) => {
        this.setState(({step}) => ({
            step: step - 1
        }), this.handleChangeCurrentDateFactory(modifier));
    };

    /**
     * Фабрика изменения показываемой даты.
     * @param modifier функция преобразования текущей даты в необходимую.
     */
    handleChangeCurrentDateFactory = (modifier?: (date: Date) => Date) => () => {
        this.setState(({currentDate}) => ({currentDate: modifier(currentDate)}));
    }

    /**
     * Функция переключения шага.
     */
    handleChangeView = () => {
        if (this.state.step < 2) {
            this.setState(({step}) => ({
                step: step + 1
            }));
        }
    }

    /** Отрисовка контента для календаря. */
    renderChildren = (): JSX.Element => {
        const {onChange, selectedDate, minDate, maxDate} = this.props;
        const {currentDate, step} = this.state;
        switch (step) {
            case ECalendarStep.MONTH:

                return <Month
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onChange={onChange}
                    onPrev={this.handleChangeDate()}
                    onNext={this.handleChangeDate(true)}
                    minDate={minDate}
                    maxDate={maxDate}
                />;
            case ECalendarStep.YEAR:

                return <Year
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onChange={this.handlePickDate}
                />;
            case ECalendarStep.DECADE:

                return <Decade
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onChange={this.handlePickDate}
                />;
            default: break;
        }
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const {onClick, t} = this.props;
        const {currentDate, step} = this.state;
        const customClass = ['calendar'];

        return (
            <div
                className={customClass.join(' ')}
                data-qa-id="date-picker"
            >
                <Header
                    currentDate={currentDate}
                    onPrev={this.handleChangeDate()}
                    onNext={this.handleChangeDate(true)}
                    onChangeView={this.handleChangeView}
                    onPick={this.handlePickDate}
                    step={step}
                />
                {this.renderChildren()}
                <Footer
                    t={t}
                    onClick={onClick}
                />
            </div>
        );
    }
}
