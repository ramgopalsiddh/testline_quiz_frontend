
export const fetchQuizData = async () => {
  try {
    const response = await fetch('https://api.jsonserve.com/Uw5CrX', {
      mode: 'no-cors',
    });
    console.log(response)
    if (!response.ok) throw new Error('Failed to fetch quiz data');
    return await response.json(); // This will fail in `no-cors` mode
  } catch (error) {
    console.error(error);
    return null;
  }
};

