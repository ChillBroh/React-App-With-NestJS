import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (value: any) => {
    try {
      const { email } = value;
      const response = await axios.post(
        "http://localhost:5000/users/reset/email-find",
        {
          email,
        }
      );

      navigate(`/password-enter/${email}`);
    } catch (err: any) {
      alert(err.response.data.message);
      return;
    }
  };
  return (
    <div className="mt-16 mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
      <p className="text-3xl text-center mb-10">Password Reset</p>
      <div>
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
          <Form.Item>
            <Button name="Find Acoount" type="submit" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
