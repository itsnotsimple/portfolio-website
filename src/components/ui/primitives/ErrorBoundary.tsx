import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors in the section tree so a single broken section
 * (e.g. a failed lazy import or a WebGL hiccup) degrades to a small message
 * instead of a blank white page. The background, navbar and preloader live
 * outside this boundary and keep working.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Stripped from production by terser's drop_console; useful in dev.
    console.error('Section render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            style={{
              minHeight: '40vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              textAlign: 'center',
              padding: '2rem 1.5rem',
              color: 'var(--text-muted)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-head)', color: 'var(--text)', fontSize: '1.1rem' }}>
              Something went wrong loading this section.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
