import { format } from 'date-fns';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { locale } from '../../Consts';
import './day.scss';

/** Модель props компонента. */
interface IProps {
    /** Отображаемая дата. */
    currentDate: Date;
    /** true, для выбранного дня. */
    active: boolean;
    /** true, для дней, не входящие в выбранный промежуток. */
    disabled?: boolean;
    /** true, для дней, не входящие в активный месяц. */
    notCurrentMonth?: boolean;
    /** Метод, для изменения дня. */
    onChange: (date: Date) => void;
    /** Обработчик выбора дня. */
    onClick: () => void;
}

/** День месяца. */
export class Day extends Component<IProps, {}> {

    /** Обработка выбора дня. */
    handleClick = () => {
        const { currentDate, onClick, onChange, disabled } = this.props;
        !disabled && onChange(currentDate);
        !disabled && onClick();
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const { disabled, currentDate, active, notCurrentMonth } = this.props;
        const customClass = ['day'];
        !!notCurrentMonth && customClass.push('day--not-current');
        !!disabled && customClass.push('day--disabled');
        !!active && !notCurrentMonth && customClass.push('day--active');
        const day = format(currentDate, 'dd', { locale });

        return (
            <div
                className={customClass.join(' ')}
                onClick={this.handleClick}
            >
                {day}
            </div>
        );
    }
}
