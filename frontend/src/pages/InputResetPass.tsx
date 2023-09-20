import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const InputResetPass = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [form] = Form.useForm();

  const handleSubmit = async (value: any) => {
    const { password } = value;

    const response = await axios.post(
      "http://localhost:5000/users/reset-user",
      {
        email,
        password,
      }
    );
    if (!response.data) {
      throw new Error("User Password Not updated");
    }
    alert("User Password updated");
    navigate("/login");
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
            <Button name="Reset Password" type="submit" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default InputResetPass;
