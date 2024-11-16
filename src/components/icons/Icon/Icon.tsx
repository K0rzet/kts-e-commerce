import * as React from 'react';
import classNames from 'classnames';
import * as styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    blur?: boolean;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ 
    children, 
    className,
    color,
    blur,
    width = 24,
    height = 24,
    ...props 
}) => {
    
    return (
        <svg
            width={width}
            height={height}
            className={classNames(
                styles.icon,
                color && color === 'primary' && styles.icon_color_primary,
                color && color === 'secondary' && styles.icon_color_secondary,
                color && color === 'accent' && styles.icon_color_accent,
                blur && styles.icon_blur,
                className
            )}
            {...props}
        >
            {children}
        </svg>
    );
};

export default Icon;
