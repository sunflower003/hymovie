import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: 'white',
          background: '#1a1a1a',
          borderRadius: '8px'
        }}>
          <h2>Oops! Something went wrong with the video player.</h2>
          <p>Please try refreshing the page or try another movie.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '10px 20px',
              background: '#e50914',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
