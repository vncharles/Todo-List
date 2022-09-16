import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Todos from './pages/Todos';
import { Layout, PageHeader } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
	return (
		<>
			<Layout>
				{/* <Header> */}
				<PageHeader
					title="Todo List"
					subTitle="This is task todo list"
				/>
				{/* </Header> */}
				<Content>
					<Todos />
				</Content>
				<Footer
					style={{
						textAlign: 'center',
						paddingTop: '0',
					}}
				>
					<address>
						You can contact author at{' '}
						<a href="https://www.facebook.com/VN.Charles132/">
							facebook
						</a>
						.<br />
					</address>
				</Footer>
			</Layout>
		</>
	);
}

export default App;
