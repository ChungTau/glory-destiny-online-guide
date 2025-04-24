'use client';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { FC, memo } from 'react';

export type IconName = keyof typeof dynamicIconImports;

const icons = Object.keys(dynamicIconImports) as IconName[];

type ReactComponent = FC<{ className?: string }>;
const icons_components = {} as Record<IconName, ReactComponent>;

for (const name of icons) {
  const NewIcon = dynamic(dynamicIconImports[name], {
    ssr: false,
  }) as ReactComponent;
  icons_components[name] = NewIcon;
}

type DynamicIconProps = {
  name?: IconName; // Made optional
  className?: string;
};

const DynamicIcon = memo(({ name, ...props }: DynamicIconProps) => {
  if (!name || !icons_components[name]) {
    return (
      <svg
        className={props.className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    );
  }

  const Icon = icons_components[name];
  return <Icon {...props} />;
});
DynamicIcon.displayName = 'DynamicIcon';

export default DynamicIcon;
