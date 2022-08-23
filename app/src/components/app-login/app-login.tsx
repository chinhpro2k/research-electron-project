import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Spin,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import LoginWithKeycloak from '@/src/components/app-login-with-keycloak';
import KeyboardLayout from '@/src/components/keyboard/keyboardLayout';
import Print from '@/src/components/printComponents/print';
const { Title } = Typography;
const exec = require('child_process').exec;
interface AppLoginProps extends Partial<StoreProps> {
  onDone: (userInfo: UserInfoNS.RootObject) => void;
}

interface AppLoginState {
  loading: boolean;
  isModalVisible: boolean;
}
export class AppLogin extends React.Component<AppLoginProps, AppLoginState> {
  state: AppLoginState = {
    loading: false,
    isModalVisible: false,
  };
  // private keyboard: React.RefObject<unknown>;
  // constructor(props: AppLoginProps | Readonly<AppLoginProps>) {
  //   super(props);
  //   this.keyboard = React.createRef();
  // }

  onPressTaiKhoan = (e: React.KeyboardEvent) => {
    const specialCharRegex = /[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/;
    if (!specialCharRegex.test(e.key)) {
      e.preventDefault();
      return false;
    }
  };
  handleResearch = (val: string) => {
    console.log('val', val);
    this.setState({ isModalVisible: true });
  };
  handleOk = () => {};
  render(): JSX.Element {
    const { onDone } = this.props;
    const onFinish = (values: { username: string; password: string }) => {
      this.setState({ loading: true });
      $api
        .login({ username: values.username, password: values.password })
        .then((resData) => {
          $tools.setAccessToken(resData.accessToken);
          $tools.setUserObject(resData.user);
          onDone(resData.data as UserInfoNS.RootObject);
        })
        .catch(() => {
          message.error('Tài khoản hoặc mật khẩu không chính xác');
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    };

    const onFinishFailed = (errorInfo: unknown) => {
      // console.log('Failed:', errorInfo);
    };
    const handleLoginWithKeycloak = async (accessToken: string) => {
      console.log('access token', accessToken);
      $api
        .loginKeycloak({ accessToken: accessToken, clientPlatform: 'Web' })
        .then((resData) => {
          $tools.setAccessToken(resData.data.accessToken);
          $tools.setUserObject(resData.data.user);
          onDone(resData.data as UserInfoNS.RootObject);
        })
        .catch((e) => {
          console.log('error', e);
          message.error('Tài khoản hoặc mật khẩu không chính xác');
        });
    };
    const { loading } = this.state;
    return (
      <>
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%', margin: 'auto' }}
        >
          <Col lg={24}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={$tools.PTIT_LOGO}
                alt=""
                style={{ width: '200px', marginBottom: '20px' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <KeyboardLayout handleResearch={this.handleResearch} />
            </div>
          </Col>
        </Row>
        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <Print />
        </Modal>
      </>
    );
  }
}
