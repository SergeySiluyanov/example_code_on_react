import { addMonths, getMonth, setMonth, startOfYear } from 'date-fns';
import { isSameMonth } from 'date-fns/esm';
import { noop } from 'lodash-es';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { MonthShort } from '../MonthShort/MonthShort';
import './year.scss';

/** Модель props компонента. */
interface IProps {
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата */
    selectedDate: Date;
    /** Метод, для изменения даты. */
    onChange: (modifier: (date: Date) => Date) => void;
}

/** Год. */
export class Year extends Component<IProps, {}> {

    /** Изменение даты. */
    handleChange = (newDate: Date) => {
        const {onChange} = this.props;
        onChange((date: Date): Date => {
            return setMonth(date, getMonth(newDate));
        });
    }

    /** Отрисовка списка месяцев для выбора. */
    renderMonthList = (): JSX.Element => {
        const {currentDate, selectedDate} = this.props;
        const startDate = startOfYear(currentDate);
        const countMonth = 12;

        const handleClick = noop;

        return Array.call(null, ...new Array(countMonth)).map((_, offset) => {
            const month = addMonths(startDate, offset);

            return <MonthShort
                key={offset}
                currentDate={month}
                active={isSameMonth(selectedDate, month)}
                onChange={this.handleChange}
                onClick={handleClick}
            />;
        });
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {

        return (
            <div className="year">
                {this.renderMonthList()}
            </div>
        );
    }
}
