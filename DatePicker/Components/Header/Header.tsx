import { addYears, format } from 'date-fns';
import React, { Component } from 'react';
import { FontButton } from 'Common/Components/Buttons';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import { ECalendarStep, locale } from '../../Consts';
import './header.scss';

/** Модель props компонента. */
interface IProps {
    /** true, когда используется текущий месяц. */
    currentDate: Date;
    /** true, когда используется текущий месяц. */
    step: ECalendarStep;
    /** Функция перехода к предыдущему месяцу, году, десятилетию. */
    onPrev: () => void;
    /** Функция перехода к следующему месяцу, году, десятилетию. */
    onNext: () => void;
    /** Фукнция переключения шага. */
    onChangeView: () => void;
    /** Функция переключения шага календаря, с последующим изменения даты. */
    onPick: (modifier: (date: Date) => Date) => void;
}

/** Шапка компонента. */
export class Header extends Component<IProps, {}> {

    /**
     * Заголовок для выбранного периода.
     */
    getText = (): String => {
        const { currentDate, step } = this.props;

        switch (step) {
            case ECalendarStep.MONTH:

                return format(currentDate, 'LLLL yyyy', { locale });
            case ECalendarStep.YEAR:

                return format(currentDate, 'yyyy', { locale });
            case ECalendarStep.DECADE:
                const multiplier = 1;
                const periodYear = addYears(currentDate, 9 * multiplier);

                return `${format(currentDate, 'yyyy', { locale })} - ${format(periodYear, 'yyyy', { locale })}`;
            default: break;
        }
    }

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const { onChangeView, onNext, onPrev } = this.props;
        const customClass = ['date-picker-header'];

        return (
            <div
                className={customClass.join(' ')}
            >
                <FontButton
                    onClick={onPrev}
                    className="date-picker-header__btn"
                    icon="chevron-left"
                />
                <div
                    onClick={onChangeView}
                    className="date-picker-header__text"
                >
                    {this.getText()}
                </div>
                <FontButton
                    onClick={onNext}
                    className="date-picker-header__btn"
                    icon="chevron-right"
                />
            </div>
        );
    }
}
