import {  addDays, addMonths, isAfter, isBefore, isSameDay, isSameMonth, startOfWeek } from 'date-fns';
import { noop } from 'lodash-es';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { locale } from '../../Consts';
import { Day } from '../Day/Day';
import './week.scss';

/** Модель props компонента. */
interface IProps {
    /** Дата месяца. */
    monthDate: Date;
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата */
    selectedDate: Date;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Метод изменения дня. */
    onChange: (date: Date) => void;
    /** Метод изменения месяца на предыдущий. */
    onPrev: () => void;
    /** Метод изменения месяца на следующий. */
    onNext: () => void;
}

/** Неделя. */
export class Week extends Component<IProps, {}> {
    /**
     * Отрисовка дней недели.
     */
    renderDays = (): JSX.Element => {
        const {currentDate, monthDate, onChange, onNext, onPrev, selectedDate, minDate, maxDate} = this.props;
        const startDate = startOfWeek(currentDate, {locale});
        const countDays = 7;

        const prevMonth = addMonths(monthDate, -1);
        const nextMonth = addMonths(monthDate, 1);

        let handleClick = noop;

        return Array.call(null, ...new Array(countDays)).map(( _, offset) => {
            const day = addDays(startDate, offset);
            const isPrevMonth = isSameMonth(prevMonth, day);
            const isNextMonth = isSameMonth(nextMonth, day);
            const isCurrentMonth = isSameMonth(day, monthDate);
            const isMinDate = isBefore(day, minDate);
            const isMaxDate = isAfter(day, maxDate);

            if (isPrevMonth) {
                handleClick = onPrev;
            } else if (isNextMonth) {
                handleClick = onNext;
            } else if (isCurrentMonth || isMinDate || isMaxDate) {
                handleClick = noop;
            }

            const notCurrentMonth = (isPrevMonth || isNextMonth) && !isCurrentMonth;
            const disabled = isMinDate || isMaxDate;

            return (
                <Day
                    key={offset}
                    currentDate={day}
                    active={isSameDay(selectedDate, day)}
                    notCurrentMonth={notCurrentMonth}
                    disabled={disabled}
                    onChange={onChange}
                    onClick={handleClick}
                />
            );
        });
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {

        return (
            <div className="week">
                {this.renderDays()}
            </div>
        );
    }
}
