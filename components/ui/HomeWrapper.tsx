import React, { forwardRef } from "react";

interface HomeWrapperProps {
  children: React.ReactNode;
  className?: string; // Optional to customize styling for specific sections
}

// Use forwardRef to allow passing a ref to this component
const HomeWrapper = forwardRef<HTMLDivElement, HomeWrapperProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref} // ✅ Now, ref is passed to the div
        className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${className}`}
      >
        {children}
      </div>
    );
  }
);

// Add a display name to avoid debugging issues
HomeWrapper.displayName = "HomeWrapper";

export default HomeWrapper;
