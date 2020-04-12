import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Card, Form, Input, Checkbox, Button, Typography } from "antd";
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
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
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

      <Card title="Debugging">
        <Paragraph>Current values: </Paragraph>
        <Paragraph>{JSON.stringify(currentValues, null, 2)}</Paragraph>
        <Paragraph>Changed values: </Paragraph>
        <Paragraph>{JSON.stringify(changedValues, null, 2)}</Paragraph>
      </Card>
    </div>
  );
};

export default App;
