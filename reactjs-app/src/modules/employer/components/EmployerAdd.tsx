import { Modal, Form, Input, InputNumber, Select, DatePicker, Checkbox } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';

import type { FormProps } from 'antd';
import type { EmployerType } from '../employer.type';
type EmployerAddProps = {
    isModalAddOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
    form: FormInstance;
    onFinish: (values: EmployerType) => void;
    onFinishFailed: FormProps<EmployerType>['onFinishFailed'];
    queryEmployers: { data?: EmployerType[] };
};

const EmployerAdd: React.FC<EmployerAddProps> = ({
    isModalAddOpen,
    onOk,
    onCancel,
    form,
    onFinish,
    onFinishFailed,
    queryEmployers
}) => {
    return (
        <Modal
            title="Add new Employer"
            open={isModalAddOpen}
            onOk={onOk}     // gọi từ type EmployerAddProps trên
            onCancel={onCancel}
            okText="Thêm thông tin user "   // là cái nút bấm để thêm thông tin sau khi nhập xong trong ô input
        >
            <Form
                form={form}
                layout="vertical"
                name="addEmployerForm-new"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        { required: true, message: 'Please input full name!' },
                        { min: 6, max: 160, message: 'Full name must be between 6 and 160 characters' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input phone number!' },
                        { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits' }
                        
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[{ required: true, message: 'Please select date of birth!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select>
                        <Select.Option value="Nam">Nam</Select.Option>
                        <Select.Option value="Nữ">Nữ</Select.Option>
                        <Select.Option value="Khac">Khác</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Active"
                    name="active"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployerAdd;
