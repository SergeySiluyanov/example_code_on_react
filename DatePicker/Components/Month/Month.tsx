import { addDays, addWeeks, format, getWeeksInMonth, startOfMonth, startOfWeek } from 'date-fns';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { locale } from '../../Consts';
import { Week } from '../Week/Week';
import './month.scss';

/** Модель props компонента. */
interface IProps {
    /** Текущий день месяца. */
    currentDate: Date;
    /** Выбранный день. */
    selectedDate: Date;
    /** Минимальная возможная дата. */
    minDate?: Date;
    /** Максимальная возможная дата. */
    maxDate?: Date;
    /** Обработчик изменения даты. */
    onChange: (date: Date) => void;
    /** Обработчик перехода на предыдущий месяц/год . */
    onPrev: () => void;
    /** Обработчик перехода на следующий месяц/год . */
    onNext: () => void;
}

/** Месяц. */
export class Month extends Component<IProps, {}> {

    /** Отрисовка дней неделию */
    renderLabels = (): JSX.Element => {
        const { currentDate } = this.props;
        const startDate = startOfWeek(currentDate, { locale });
        const countDays = 7;

        return Array.call(null, ...new Array(countDays)).map((_, offset) => {
            const day = addDays(startDate, offset);

            return <div key={offset} className="month__label">
                {format(day, 'EEEEEE', { locale })}
            </div>;
        });
    }

    /**
     * Отрисовка дней месяца.
     */
    renderWeeks = (): JSX.Element => {
        const { currentDate, selectedDate, onChange, onNext, onPrev, minDate, maxDate } = this.props;
        const startDate = startOfMonth(currentDate);
        const countDays = getWeeksInMonth(startDate, { locale });

        return Array.call(null, ...new Array(countDays)).map((_, offset) => {
            const week = addWeeks(startDate, offset);

            return <Week
                monthDate={currentDate}
                key={offset}
                currentDate={week}
                selectedDate={selectedDate}
                onChange={onChange}
                onPrev={onPrev}
                onNext={onNext}
                minDate={minDate}
                maxDate={maxDate}
            />;
        });
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {

        return (
            <div className="month">
                <div className="month__label-list">
                    {this.renderLabels()}
                </div>
                {this.renderWeeks()}
            </div>
        );
    }
}
