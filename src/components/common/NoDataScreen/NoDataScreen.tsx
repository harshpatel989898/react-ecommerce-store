import React from 'react';
import { EmptyState } from '../EmptyState/EmptyState';

export interface NoDataScreenProps {
  title?: string;
  message?: string;
}

export const NoDataScreen: React.FC<NoDataScreenProps> = ({
  title = 'No Data Found',
  message = 'We could not find any data matching your criteria.',
}) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <EmptyState title={title} description={message} />
    </div>
  );
};
