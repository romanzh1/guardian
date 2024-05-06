import React, { Component, ReactNode } from 'react';
import { Link, Typography } from '@mui/material';
import { withRouter } from 'react-router5';
import { Router, Subscription } from 'router5';
import { Unsubscribe } from 'router5/dist/types/base';
import styles from './index.module.scss';

type Props = {
  children: ReactNode;
  router: Router;
};

type State = {
  error: boolean;
};

export const SUPPORT_CHAT_LINK = 'https://rocket-chat.wb.ru/direct/B6NSQmzMccZd6LgFncyY2f2ybvSTkxQoxj';

class GlobalErrorBoundaryWrapper extends Component<Props, State> {
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

  componentDidCatch(error: any, errorInfo: any) {
    console.error(errorInfo);

    this.setState({
      error: true,
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

  render() {
    if (this.state.error) {
      return (
        <div className={styles.root}>
          <div>
            <div className={styles.title}>
              <Typography variant="h2">Что-то пошло не так, помогите нам разобраться с этим</Typography>
            </div>
            <div>
              <Typography>
                <Link href={SUPPORT_CHAT_LINK} rel="noreferrer" target="_blank">
                  Отправьте
                </Link>{' '}
                следующую информацию:
              </Typography>
              <Typography>— ваш номер телефона</Typography>
              <Typography>— текущий url</Typography>
              <Typography>— скриншот с информацией об ошибке из консоли разработчика (F12, ⌥+⌘+i)</Typography>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const GlobalErrorBoundary = withRouter<{ children: ReactNode }>(GlobalErrorBoundaryWrapper);
