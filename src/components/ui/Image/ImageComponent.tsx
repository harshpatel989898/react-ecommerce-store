import React, { useState } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import { PLACEHOLDERS } from '../../../assets';

export interface ImageComponentProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
  objectFit?: 'cover' | 'contain' | 'fill';
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt = '',
  fallbackSrc = PLACEHOLDERS.productFallback,
  aspectRatio = 'auto',
  objectFit = 'cover',
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const aspectMap = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  const fitMap = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  return (
    <div className={`relative overflow-hidden ${aspectMap[aspectRatio]} ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" variant="rectangular" />}
      <img
        src={isError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
        className={`w-full h-full ${fitMap[objectFit]} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
