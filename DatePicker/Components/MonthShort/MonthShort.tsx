import { format } from 'date-fns';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { locale } from '../../Consts';
import './monthShort.scss';

/** Модель props компонента. */
interface IProps {
    /** Отображаемая дата. */
    currentDate: Date;
    /** true, для выбранного года. */
    active: boolean;
    /** Метод, для изменения года. */
    onChange: (date: Date) => void;
    /** Обработчик выбора года. */
    onClick: () => void;
}

/** Компонент месяца в общем списке выбора месяца. */
export class MonthShort extends Component<IProps, {}> {

    /** Обработка выбора года. */
    handleClick = () => {
        const { currentDate, onClick, onChange } = this.props;
        onChange(currentDate);
        onClick();
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const { currentDate, active } = this.props;
        const customClass = ['month-short'];
        !!active && customClass.push('month-short--active');
        const month = format(currentDate, 'LLLL', { locale });

        return (
            <div
                className={customClass.join(' ')}
                onClick={this.handleClick}
            >
                {month}
            </div>
        );
    }
}
