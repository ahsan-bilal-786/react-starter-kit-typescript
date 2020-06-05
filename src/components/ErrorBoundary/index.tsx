import React from 'react';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}
interface IErrorBoundaryState {
  error: boolean;
}

/**
 * ErrorBoundary Component catches the error which produces in its child nodes.
 * For Dev it console the errors and for PROD it sends the error report to
 * sentry.
 */
class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error: any) {
    return { error: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
