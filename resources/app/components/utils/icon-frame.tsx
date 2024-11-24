import React from 'react';

export const IconFrame = ({ icon }: { icon: React.ReactNode }) => {
    return (
        <div className="flex items-center flex-shrink-0 justify-center mr-2 transition-colors rounded-lg w-7 h-7 ring-1 ring-foreground/10 ring-inset bg-background hover:drop-shadow-sm hover:shadow-lg shadow-primary hover:bg-background hover:ring-primary text-background">
            {icon}
        </div>
    )
}