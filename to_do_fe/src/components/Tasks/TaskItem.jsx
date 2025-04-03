import { Card, Typography, Space, Button, Tag, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <Card
      style={{ marginBottom: 16 }}
      actions={[
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>,
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => onDelete(task._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} type="text" danger>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Typography.Title
            level={4}
            style={{
              marginBottom: 8,
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography.Title>

          {task.description && (
            <Paragraph
              style={{
                marginBottom: 16,
                color: task.completed ? "#00000073" : undefined,
              }}
            >
              {task.description}
            </Paragraph>
          )}

          <Space>
            <Text type="secondary">
              Created: {new Date(task.date).toLocaleDateString()}
            </Text>
            <Tag
              color={task.completed ? "green" : "blue"}
              icon={
                task.completed ? (
                  <CheckCircleOutlined />
                ) : (
                  <ClockCircleOutlined />
                )
              }
              style={{ cursor: "pointer" }}
              onClick={() =>
                onToggleComplete(task._id, { completed: !task.completed })
              }
            >
              {task.completed ? "Completed" : "In Progress"}
            </Tag>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
