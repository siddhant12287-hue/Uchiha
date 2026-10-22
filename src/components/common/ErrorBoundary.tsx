import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = window.location.origin + window.location.pathname;
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="min-h-screen w-full bg-[#06040a] text-zinc-100 flex flex-col items-center justify-center p-6 select-none"
        >
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0f0b18] border border-red-900/60 shadow-[0_0_50px_rgba(239,68,68,0.25)] flex flex-col items-center text-center gap-5">
            {/* Ocular Disturbance Icon */}
            <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-600/60 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-bold">
                Genjutsu Feedback Anomaly
              </span>
              <h2 className="text-2xl font-black text-white tracking-wider">
                CHAKRA DISRUPTION
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                An unexpected boundary rift interrupted the ocular simulation.
                The flow of chakra has been safely stabilized.
              </p>
            </div>

            {this.state.error && (
              <div className="w-full text-left p-3 rounded-xl bg-black/60 border border-zinc-800 text-[11px] font-mono text-red-300 max-h-28 overflow-y-auto break-all">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center gap-3 w-full pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-align Chakra</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={this.handleReset}
                className="flex items-center justify-center gap-1.5"
                title="Return to the Gateway Hub"
              >
                <Home className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
