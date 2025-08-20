import { Modal, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';

type UserEditProps = {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    form: FormInstance;
    onFinish: (values: any) => void;
    onFinishFailed: (errors: unknown) => void;
};

const UserEdit: React.FC<UserEditProps> = ({
    visible,
    onOk,
    onCancel,
    form,
    onFinish,
    onFinishFailed,
}) => {
    return (
        <Modal
            title="Sửa thông tin người dùng"
            width="40%"
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Lưu"
            cancelText="Đóng"
        >
            <Form
                form={form}
                name="update-user-form"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Chưa nhập username' }]} hasFeedback>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Chưa nhập email' }]} hasFeedback>
                    <Input />
                </Form.Item>

                <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Chưa nhập full name' }]} hasFeedback>
                    <Input />
                </Form.Item>

                <Form.Item hidden label="Id" name="id" hasFeedback>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserEdit;