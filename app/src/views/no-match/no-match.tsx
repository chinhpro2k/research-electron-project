import * as React from 'react';
import { Button, Result } from 'antd';

import './no-match.less';

export default class ErrorPage extends React.Component<PageProps> {
  render(): JSX.Element {
    return (
      <div className="layout-padding flex column center no-match">
        <Result
          status="404"
          title="404"
          subTitle={
            <p className="text-default">
              Sorry, the page you visited does not exist.
            </p>
          }
          extra={
            <Button type="primary" onClick={() => history.go(-1)}>
              Back
            </Button>
          }
        />
      </div>
    );
  }
} // class ErrorPage end
