
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { UserType } from "../user.type";

interface UserTableProps {
    data?: UserType[];
    loading?: boolean;
    columns: ColumnsType<UserType>;
    onAddClick: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
    data,
    loading,
    columns,
}) => {
    return (
        <Table
            dataSource={data}
            columns={columns}
            loading={loading}
            rowKey="id"
            pagination={false}
        />
    );
};

export default UserTable;