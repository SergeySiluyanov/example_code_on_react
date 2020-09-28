import * as locales from 'date-fns/locale';
import i18next from 'i18next';

const value = (i18next ? i18next.language : '').slice(0,2);
export const locale = locales[value];

/** Шаги переключения внутри календаря. */
export enum ECalendarStep {
    /** Месяц. */
    MONTH,
    /** Год. */
    YEAR,
    /** Десятилетие. */
    DECADE
}
