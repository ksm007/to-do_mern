import { useEffect, useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Reset form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title,
        description: editingTask.description,
        completed: editingTask.completed,
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingTask) {
        await onUpdateTask(editingTask._id, values);
      } else {
        await onAddTask(values);
        form.resetFields();
      }
    } catch (error) {
      console.error("Task form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ completed: false }}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please enter a task title!" }]}
      >
        <Input placeholder="Task title" />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea placeholder="Task description (optional)" rows={3} />
      </Form.Item>

      {editingTask && (
        <Form.Item name="completed" valuePropName="checked" label="Completed">
          <Switch />
        </Form.Item>
      )}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={editingTask ? null : <PlusOutlined />}
        >
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
        {editingTask && (
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.resetFields();
              onCancelEdit();
            }}
          >
            Cancel
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
