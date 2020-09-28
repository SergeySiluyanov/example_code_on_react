import { format } from 'date-fns';
import React, { Component } from 'react';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { locale } from '../../Consts';
import './yearShort.scss';

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

/** Компонент для выбора года. */
export class YearShort extends Component<IProps, {}> {

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
        const customClass = ['year-short'];
        !!active && customClass.push('year--active');
        const year = format(currentDate, 'yyyy', { locale });

        return (
            <div
                className={customClass.join(' ')}
                onClick={this.handleClick}
            >
                {year}
            </div>
        );
    }
}
