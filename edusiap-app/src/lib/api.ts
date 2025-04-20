const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const registerUser = async (data: { username: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Fetch error: ", error);
      throw error;  // Re-throw or handle error as needed
    }
  };
  

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
