import Sidebar from './components/sidebar/Sidebar';

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  type: 'premium' as const,
  imgSrc: 'https://i.pravatar.cc/150?img=3', // random placeholder image
  messagesLeft: 20
};
function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} />
    </div>
  );
}

export default App;
