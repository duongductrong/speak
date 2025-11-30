"use client";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@speak/ui";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SpeakingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Speaking Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="max-w-2xl w-full backdrop-blur-sm bg-card/95 shadow-2xl border-destructive/50">
          <CardHeader>
            <CardTitle className="text-2xl font-heading flex items-center gap-2 text-destructive">
              <AlertCircle className="w-6 h-6" />
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We encountered an error while loading the speaking practice. This might be due to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Browser compatibility issues with speech recognition</li>
              <li>Missing permissions for microphone access</li>
              <li>Network connectivity problems</li>
            </ul>
            {this.state.error && (
              <details className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <summary className="cursor-pointer font-medium mb-2">Error details</summary>
                <pre className="overflow-auto">{this.state.error.toString()}</pre>
              </details>
            )}
            <Button onClick={this.handleReset} className="w-full gap-2">
              <RefreshCw className="w-4 h-4" />
              Reload and try again
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

