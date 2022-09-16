import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {
	Space,
	Table,
	Tag,
	Button,
	Dropdown,
	Menu,
	message,
	Tooltip,
	Modal,
	Form,
	InputNumber,
	Select,
	Input,
	DatePicker,
} from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const Todos = () => {
	const [data, setData] = useState();
	const [currentTask, setCurrentTask] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTask, setNewTask] = useState({
		id: 0,
		name: '',
		status: 1,
		priority: 1,
		due_date: '',
		created_date: Date.now(),
	});

	useEffect(() => {
		axios
			.get('http://localhost:8080/api/task/')
			.then((res) => {
				setData(res.data);
				console.log('>>> data res: ', res.data);
			})
			.catch((err) => {
				console.log('>>> error: ', err);
			});
	}, []);

	const updateTask = (dataUpdate) => {
		axios
			.put(`http://localhost:8080/api/task/update`, dataUpdate)
			.then((res) => {
				alert('update success!');
			})
			.catch((err) => {
				console.log('>>> error: ', err);
			});
	};

	const handleMenuClickPriority = async (e) => {
		const dataNew = data.map((el) => {
			return el.id === currentTask.id
				? { ...el, priority: Number.parseInt(e.key) }
				: el;
		});
		// setCurrentTask({ ...currentTask, priority: Number.parseInt(e.key) });
		const dataUpdate = {
			id: currentTask.id,
			status: currentTask.status,
			priority: Number.parseInt(e.key),
		};
		// console.log('>>> dataUpdate: ', dataUpdate);
		await updateTask(dataUpdate);
		setData(dataNew);
	};

	const handleMenuClickStatus = async (e) => {
		const dataNew = data.map((el) => {
			return el.id === currentTask.id
				? { ...el, status: Number.parseInt(e.key) }
				: el;
		});
		const dataUpdate = {
			id: currentTask.id,
			status: Number.parseInt(e.key),
			priority: currentTask.priority,
		};
		await updateTask(dataUpdate);
		setData(dataNew);
	};

	const handleDelete = (id) => {
		const dataNew = data.filter((el) => el.id !== id);
		setData(dataNew);
		axios
			.delete(`http://localhost:8080/api/task/delete/${id}`)
			.then((res) => {
				alert('delete success!');
			})
			.catch((err) => {
				console.log('>>> error: ', err);
			});
	};

	const menuPriority = (
		<Menu
			onClick={handleMenuClickPriority}
			items={[
				{
					label: 'Low',
					key: 1,
					icon: <UserOutlined />,
				},
				{
					label: 'Medium',
					key: 2,
					icon: <UserOutlined />,
				},
				{
					label: 'High',
					key: 3,
					icon: <UserOutlined />,
				},
			]}
		/>
	);

	const menuStatus = (
		<Menu
			onClick={handleMenuClickStatus}
			items={[
				{
					label: 'Next up',
					key: 1,
					icon: <UserOutlined />,
				},
				{
					label: 'In progress',
					key: 2,
					icon: <UserOutlined />,
				},
				{
					label: 'Completed',
					key: 3,
					icon: <UserOutlined />,
				},
			]}
		/>
	);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (sta, record) => {
				return (
					<Tag
						color={
							sta === 1 ? 'gray' : sta === 2 ? 'yellow' : 'green'
						}
						key={sta}
					>
						<Dropdown
							overlay={menuStatus}
							onClick={() => {
								setCurrentTask(record);
							}}
						>
							<Space>
								{sta === 1
									? 'Next up'
									: sta === 2
									? 'Inprogress'
									: 'Completed'}
								<DownOutlined />
							</Space>
						</Dropdown>
					</Tag>
				);
			},
		},
		{
			title: 'Priority',
			dataIndex: 'priority',
			key: 'priority',
			render: (pro, record) => {
				return (
					<Tag
						color={pro === 1 ? 'green' : pro === 2 ? 'blue' : 'red'}
						key={pro}
					>
						<Dropdown
							overlay={menuPriority}
							onClick={() => {
								setCurrentTask(record);
							}}
						>
							<Space>
								{pro === 1
									? 'Low'
									: pro === 2
									? 'Medium'
									: 'High'}
								<DownOutlined />
							</Space>
						</Dropdown>
					</Tag>
				);
			},
		},
		{
			title: 'Due date',
			dataIndex: 'due_date',
			key: 'due_date',
			render: (text) => moment(text).format('YYYY-MM-DD'),
		},
		{
			title: 'Created date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (text) => moment(text).format('YYYY-MM-DD'),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					{/* <Button type="primary">Update</Button> */}
					<Button
						type="danger"
						onClick={() => handleDelete(record.id)}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setData([...data, newTask]);
		axios
			.post('http://localhost:8080/api/task/add', newTask)
			.then((res) => {
				alert('Create success!');
			})
			.catch((err) => {
				console.log('>>> error: ' + err);
			});
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// console.log('>>> newTask: ', newTask);

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add task
			</Button>
			<Table columns={columns} dataSource={data} />
			<Modal
				destroyOnClose={true}
				title="Add task todo list"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout="horizontal"
					initialValues={{
						size: 'default',
					}}
					// onValuesChange={onFormLayoutChange}
					size={'default'}
				>
					<Form.Item label="Name">
						<Input
							onChange={(event) => {
								setNewTask({
									...newTask,
									name: event.target.value,
								});
							}}
						/>
					</Form.Item>
					<Form.Item label="Status">
						<Select
							onChange={(event) => {
								setNewTask({
									...newTask,
									status: Number.parseInt(event),
								});
							}}
						>
							<Select.Option value="1">Next up</Select.Option>
							<Select.Option value="2">In progress</Select.Option>
							<Select.Option value="3">Completed</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Priority">
						<Select
							onChange={(event) => {
								setNewTask({
									...newTask,
									priority: Number.parseInt(event),
								});
							}}
						>
							<Select.Option value="1">Low</Select.Option>
							<Select.Option value="2">Medium</Select.Option>
							<Select.Option value="3">High</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Due date">
						<DatePicker
							onChange={(date, dateString) => {
								// console.log('>>> date: ', date);
								// console.log('>>> dateString: ', dateString);
								setNewTask({
									...newTask,
									due_date: dateString,
								});
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Todos;
