import { Table, Pagination, Card, Button, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import type { EmployerType } from '../employer.type';

interface EmployerTableProps {
    data?: EmployerType[];
    loading: boolean;
    columns: ColumnsType<EmployerType>;
    onAddClick: () => void;
}

const EmployerTable: React.FC<EmployerTableProps> = ({
    data,
    loading,
    columns,
    onAddClick,
}) => {
    return (
        <Card
            title="Employer List"
            extra={
                <Button type="primary" onClick={onAddClick}>
                    Thêm mới
                </Button>
            }
        >
            {loading ? (
                <Spin tip="Loading">
                    <div className="content" />
                </Spin>
            ) : (
                <>
                    <Table rowKey="id" columns={columns} dataSource={data} />
                    <div style={{ textAlign: 'right', marginTop: 30 }}>
                    </div>
                </>
            )}
        </Card>
    );
};

export default EmployerTable;
