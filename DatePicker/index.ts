import { TFormControl } from 'Common/Models';
import { staticImplements } from 'Common/Utils';
import { ControlledDatePicker } from './ControlledDatePicker';
import { UncontrolledDatePicker } from './UncontrolledDatePicker';

/** DatePicker. */
@staticImplements<TFormControl>()
export class DatePicker {
    /** @inheritdoc */
    static Controlled: React.ComponentClass<ControlledDatePicker['props']> = ControlledDatePicker;
    /** @inheritdoc */
    static Uncontrolled: React.ComponentClass<UncontrolledDatePicker['props']> = UncontrolledDatePicker;
}
