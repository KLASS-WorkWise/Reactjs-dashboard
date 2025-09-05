import { Modal, Form, Input, InputNumber, Select, DatePicker, Checkbox } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';

import type { FormProps } from 'antd';
import type { EmployerType } from '../employer.type';
type EmployerAddProps = {
    isModalUpdateOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
    form: FormInstance;
    onFinish: (values: EmployerType) => void;
    onFinishFailed: FormProps<EmployerType>['onFinishFailed'];
    queryEmployers: { data?: EmployerType[] };
};

const EmployerUpdate: React.FC<EmployerAddProps> = ({
    isModalUpdateOpen,
    onOk,
    onCancel,
    form,
    onFinish,
    onFinishFailed,
    queryEmployers
}) => {
    return (
        <Modal
            title="Update Employer"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={onOk}
            onCancel={onCancel}
            okText="Cập nhật thông tin user"
        >
            <Form
                form={form}
                layout="vertical"
                name="update-employer-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input full name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input phone number!' }]}
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
                {/* <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input password!' }]}
                >
                    <Input.Password />
                </Form.Item> */}
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
                <Form.Item
                    hidden
                    name="id"
                >
                    <Input hidden />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployerUpdate;
