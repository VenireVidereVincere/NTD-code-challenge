
export const getBalance = async (): Promise<number>  => {
    try {
      const response = await fetch(`${process.env.API_URL}/get-balance`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Enable sending cookies with the request
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.balance;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to retrieve balance');
      }
    } catch (error) {
      console.error('Error retrieving balance:', error);
      throw new Error('Failed to retrieve balance');
    }
  };