import React, { Component, ReactNode } from 'react';
import { withRouter } from 'react-router5';
import { Router, Subscription } from 'router5';
import { Typography } from '@mui/material';
import { Unsubscribe } from 'router5/dist/types/base';
import { ParamsError } from 'src/libs/router/valid-router-plugin';
import styles from './index.module.scss';

type Props = {
  children: ReactNode;
  router: Router;
};

type State = {
  error: boolean;
};

class RouteParamsErrorBoundaryWrapper extends Component<Props, State> {
  private routerSubscription: Subscription | Unsubscribe | undefined;

  private defaultState: State = { error: false };

  constructor(props: Props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.routerSubscription = this.props.router.subscribe(({ route, previousRoute }) => {
      this.setState(this.defaultState);
    });
  }

  componentWillUnmount() {
    if (this.routerSubscription) {
      if (typeof this.routerSubscription === 'function') {
        this.routerSubscription();
      } else {
        this.routerSubscription.unsubscribe();
      }
    }
  }

  // метод для логирования ошибки
  // componentDidCatch(error: any, errorInfo: any) {
  // }

  // метод для контроля UI ошибки
  static getDerivedStateFromError(error: any) {
    if (error instanceof ParamsError) {
      return { error: true };
    }

    throw error;
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.root}>
          <Typography>Ошибка валидации параметров роута</Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

export const RouteParamsErrorBoundary = withRouter<{ children: ReactNode }>(RouteParamsErrorBoundaryWrapper);
