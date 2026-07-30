import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  // Optional label so different boundaries can be distinguished in the console
  label?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches render/runtime errors in its subtree and shows a recoverable
 * message instead of letting the whole page go blank (React unmounts the
 * entire tree on an uncaught error unless something like this catches it).
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.label ? `: ${this.props.label}` : ''}] Caught render error:`, error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 border border-dashed border-amber-300 dark:border-amber-900/50 rounded-xl bg-amber-50 dark:bg-amber-950/20 min-h-[200px]">
          <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-sans font-semibold text-stone-800 dark:text-stone-200">
              Something went wrong displaying this section.
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-sans mt-1">
              The rest of the app is unaffected. You can try again below.
            </p>
          </div>
          <button
            onClick={this.handleRetry}
            className="flex items-center space-x-1.5 text-xs font-sans font-semibold px-3 py-1.5 rounded-lg border border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59]/10 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
