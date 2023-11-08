import { TooltipProps } from 'recharts';
import "./style.scss";
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    console.log('Active:', active);
    console.log('Payload:', payload);
    console.log('Label:', label);

    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload?.[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
