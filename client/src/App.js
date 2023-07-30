import ListHeader from './components/ListHeader.js';
import ListItem from './components/ListItem.js';
import Auth from './components/Auth.js'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const currentDate = new Date();
  const day = currentDate.toLocaleString('en-US', { weekday: 'long' });
  const date = currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric' });

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken, userEmail]);

  // sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken ? (
        <Auth />
      ) : (
        <>
          <ListHeader listName={`To-Do List (${day}, ${date})`} getData={getData} />
          <p className="user-email">Welcome back! {userEmail} &#128512;</p>

          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}

          <p className="copyright">
            © {new Date().getFullYear()} Abhishek Arya. All rights revered, but sharing is caring.
          </p>
        </>
      )}
    </div>
  );
};

export default App;