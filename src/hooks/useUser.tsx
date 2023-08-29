import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch(`/api/user`);

    if (response.status === 429) {
      console.log('Too many requests');
    }
    if (!response.ok) {
      console.log('Error occurred!');
      return;
    }

    const responseJson = await response.json();

    if (responseJson.success === true) {
      setUser(responseJson.data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, getUser };
};

export default useUser;
