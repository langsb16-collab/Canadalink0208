
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CRITICAL_RUNTIME_ERROR:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-white text-center space-y-6">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[32px] flex items-center justify-center mx-auto animate-pulse">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Interrupted</h2>
              <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                A runtime exception occurred. To protect your data, the session has been paused.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left overflow-hidden">
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Error Code</p>
               <p className="text-[11px] font-mono text-rose-600 font-bold truncate">
                 {this.state.error?.message || "Unknown Runtime Error"}
               </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={this.handleReload}
                className="w-full h-14 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
              >
                <RefreshCcw size={18} /> Refresh Platform
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full h-14 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all"
              >
                <Home size={18} /> Return Home
              </button>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">K-Link Life Infrastructure v2.4.1</p>
          </div>
        </div>
      );
    }

    // Fix: Access children through this.props.children instead of this.children
    return this.props.children;
  }
}
