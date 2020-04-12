import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import {
  Card,
  Form,
  Input,
  Checkbox,
  Button,
  Typography,
  notification,
} from "antd";
import { Store } from "antd/lib/form/interface";

const { Paragraph } = Typography;

type InternalNamePath = (string | number)[];

interface ValidateErrorEntity {
  values: Store;
  errorFields: {
    name: InternalNamePath;
    errors: string[];
  }[];
  outOfDate: boolean;
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const App = () => {
  const [currentValues, setCurrentValues] = useState<Store>({});
  const [changedValues, setChangedValues] = useState<Store>({});
  const onFinish = (values: Store) => {
    notification.open({
      message: "onFinish",
      description: (
        <pre>
          <Paragraph code>{JSON.stringify(values, null, 2)}</Paragraph>
        </pre>
      ),
      duration: 0,
    });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    notification.open({
      message: "onFinishFailed",
      description: (
        <pre>
          <Paragraph code>{JSON.stringify(errorInfo, null, 2)}</Paragraph>
        </pre>
      ),
      duration: 0,
      type: "warning",
    });
  };

  const onValuesChange = (changedValues: Store, currentValues: Store) => {
    console.log("changedValues", changedValues);
    setChangedValues(changedValues);
    setCurrentValues(currentValues);
  };

  return (
    <div className="App">
      <Card title="Login">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input autoComplete="new-password" autoFocus />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <br />

      <Card title="onValuesChange">
        <Paragraph>changedValues: </Paragraph>
        <pre>
          <Paragraph code>{JSON.stringify(changedValues, null, 2)}</Paragraph>
        </pre>

        <Paragraph>currentValues: </Paragraph>
        <pre>
          <Paragraph code>{JSON.stringify(currentValues, null, 2)}</Paragraph>
        </pre>
      </Card>
    </div>
  );
};

export default App;
