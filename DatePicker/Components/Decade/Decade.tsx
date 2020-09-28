import { addYears, getYear, isSameYear, setYear, startOfYear } from 'date-fns';
import { noop } from 'lodash-es';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { YearShort } from '../YearShort/YearShort';
import './decade.scss';

/** Модель props компонента. */
interface IProps {
    /** Отображаемая дата. */
    currentDate: Date;
    /** Выбранная дата */
    selectedDate: Date;
    /** Метод, для изменения даты. */
    onChange: (modifier: (date: Date) => Date) => void;
}

/** День месяца. */
export class Decade extends Component<IProps, {}> {

    /** Изменение даты. */
    handleChange = (newDate: Date) => {
        this.props.onChange((date: Date): Date => {
            return setYear(date, getYear(newDate));
        });
    }

    /** Функция отрисовки списка годов, входящих в десятилетие. */
    renderYearList = (): JSX.Element => {
        const {currentDate, selectedDate} = this.props;
        const startDate = startOfYear(currentDate);
        const countYear = 9;

        const handleClick = noop;

        return Array.call(null, ...new Array(countYear)).map((_, offset) => {
            const year = addYears(startDate, offset);

            return <YearShort
                key={offset}
                currentDate={year}
                active={isSameYear(selectedDate, year)}
                onChange={this.handleChange}
                onClick={handleClick}
            />;
        });
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {

        return (
            <div className="decade">
                {this.renderYearList()}
            </div>
        );
    }
}
