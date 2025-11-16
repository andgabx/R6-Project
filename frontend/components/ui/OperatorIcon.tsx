"use client";

import Image from 'next/image';

interface OperatorIconProps {
    operatorName: string;
    className?: string;
}

const OperatorIcon = ({ operatorName, className }: OperatorIconProps) => {
    const iconName = operatorName.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
    const iconPath = `/operator-icons/${iconName}.svg`;

    return (
        <Image
            src={iconPath}
            alt={`${operatorName} icon`}
            width={60}
            height={60}
            className={className}
            onError={(e) => {
                e.currentTarget.src = '/operator-icons/recruit-blue.svg';
            }}
        />
    );
};

export default OperatorIcon;
