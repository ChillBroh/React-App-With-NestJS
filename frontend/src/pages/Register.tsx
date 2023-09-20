import { Checkbox, Form, Input, Select } from "antd";
import Button from "../components/Button";
import Link from "antd/es/typography/Link";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate: any = useNavigate();

  // useEffect(() => {
  //   form.submit = handleSubmit;
  // }, [form]);

  const handleSubmit = async (values: void) => {
    try {
      const phoneNumber = form.getFieldValue("phone");
      const prefixedPhoneNumber = "+94" + phoneNumber;

      const email = form.getFieldValue("email");
      const password = form.getFieldValue("password");
      const username = form.getFieldValue("username");

      const response = await axios.post(
        "http://localhost:5000/users/add-user",
        {
          userName: username,
          email: email,
          mobile: prefixedPhoneNumber,
          firstName: "ishara",
          lastName: "madusanka",
          password: password,
        }
      );
      setLoading(false);
      alert("Registration successful:");
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+94">+94</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-16 mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
          <p className="text-3xl text-center mb-10">Sign Up</p>
          <div className="flex  justify-center">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={() => handleSubmit()}
              initialValues={{
                prefix: "94",
              }}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
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
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="username"
                label="UserName"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>

              {/* <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button name="Captcha" className="rounded-lg bg-black" />
          </Col>
        </Row>
      </Form.Item> */}
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <Link href="">agreement</Link>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="submit" htmlType="submit" name="Register" />
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
