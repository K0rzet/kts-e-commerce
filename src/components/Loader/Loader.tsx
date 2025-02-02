import React from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
    return (
        <div 
            className={classNames(
                styles.loader,
                styles[`loader_size_${size}`],
                className
            )}
        >
            <svg 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={styles.loaderSpinner}
            >
                <path 
                    d="M18.6993 27.6924C12.2418 29.1833 5.79833 25.157 4.30749 18.6994C2.81664 12.2418 6.84296 5.79839 13.3005 4.30754C19.7581 2.8167 26.2015 6.84301 27.6924 13.3006L31.5898 12.4008C29.6021 3.79069 21.0108 -1.57773 12.4007 0.41006C3.79064 2.39785 -1.57778 10.9891 0.410008 19.5992C2.3978 28.2093 10.9891 33.5777 19.5991 31.5899L18.6993 27.6924Z" 
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};

export default Loader;
