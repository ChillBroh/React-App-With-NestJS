import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Button from "../components/Button";
import axios from "axios";

import InputResetPass from "./InputResetPass";
import { useState } from "react";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");

  const handleSubmit = async (value: any) => {
    try {
      const { email } = value;
      const response = await axios.post(
        "http://localhost:5000/auth/reset/email-find",
        {
          email,
        }
      );
      setUser(response.data.userName);
      setEmail(email);
      setShow(true);
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
        {show ? (
          <InputResetPass mail={email} username={user.toUpperCase()} />
        ) : (
          "enter your email"
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
