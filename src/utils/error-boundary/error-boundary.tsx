import { Component, ReactNode } from 'react';
import styles from './style.module.scss';

const textError = 'Похоже у нас что то сломалось :(';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    return this.state.hasError ? (
      <div className={styles['error-boundary']}>{textError}</div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;