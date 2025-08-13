
// Enhanced Link component with accessibility
interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

export const AccessibleLink: React.FC<AccessibleLinkProps> = ({
  href,
  external = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded';
  
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
        aria-label={`${children} (opens in new tab)`}
        {...props}
      >
        {children}
        <svg
          className="inline-block ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }
  
  return (
    <a
      href={href}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};