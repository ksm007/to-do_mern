import { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Empty, Alert, Input } from 'antd';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/taskService';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const { Title } = Typography;
const { Search } = Input;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const addedTask = await createTask(taskData);
      setTasks([addedTask, ...tasks]);
      return addedTask;
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
      throw err;
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await updateTask(taskId, taskData);
      setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
      setEditingTask(null);
      return updatedTask;
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const handleToggleComplete = async (taskId, data) => {
    try {
      await handleUpdateTask(taskId, data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchText.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={10} lg={8} xl={6}>
          <div style={{ marginBottom: 24 }}>
            <Title level={3}>
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </Title>
            <TaskForm 
              onAddTask={handleAddTask} 
              editingTask={editingTask}
              onUpdateTask={handleUpdateTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </div>
        </Col>
        
        <Col xs={24} sm={24} md={14} lg={16} xl={18}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3}>My Tasks</Title>
            <Search
              placeholder="Search tasks"
              style={{ width: 250 }}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Spin size="large" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <Empty description={
              searchText ? "No matching tasks found" : "No tasks yet. Create one!"
            } />
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TaskList;