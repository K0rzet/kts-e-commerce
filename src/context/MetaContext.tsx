import React, { createContext, useContext, useEffect, useState } from 'react';

interface MetaContextType {
    setTitle: (title: string) => void;
}

const MetaContext = createContext<MetaContextType | undefined>(undefined);

export const MetaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState<string>('Lalasia');

    const updateTitle = (pageTitle: string) => {
        setTitle(`${pageTitle} | Lalasia`);
    };

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <MetaContext.Provider value={{ setTitle: updateTitle }}>
            {children}
        </MetaContext.Provider>
    );
};

export const useMeta = () => {
    const context = useContext(MetaContext);
    if (!context) {
        throw new Error('useMeta must be used within a MetaProvider');
    }
    return context;
};
