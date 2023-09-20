import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    try {
      const { email, password } = values;
      const response = await axios.post("http://localhost:5000/auth", {
        email,
        password,
      });

      const token: string = response.data.access_token;
      navigate(`/welcome/${token}`);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className="mt-16 mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
      <p className="text-3xl text-center mb-10">Login</p>
      <div className="flex  justify-center">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link href="/forgot-password" className="login-form-forgot">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button name="Login" /> Or{" "}
            <Link href="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
