import React from 'react';
import { cn } from '../../../utils/helpers';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={cn('animate-pulse bg-slate-800/80 rounded-xl', className)} />;
};

export default Skeleton;
