import React, { Component } from 'react';
import { Button } from 'Common/Components/Buttons';
import { catchRenderErrors } from 'Core/Utils/CommonUtils';
import './footer.scss';

/** Модель props компонента. */
interface IProps {
    /** Функция получения полей из файлов переводов. */
    t?(ns: string | string[]): string;
    /** Обработчик нажатия на кнопку подтверждения. */
    onClick?(): void;
}

/** Футер компонента. */
export class Footer extends Component<IProps, {}> {

    /** @inheritdoc */
    @catchRenderErrors()
    render() {
        const {t, onClick} = this.props;
        const customClass = ['date-picker-footer'];

        return (
            <div
                className={customClass.join(' ')}
            >
                <Button
                    primary
                    onClick={onClick}
                >
                    {t('buttons.ok')}
                </Button>
            </div>
        );
    }
}
