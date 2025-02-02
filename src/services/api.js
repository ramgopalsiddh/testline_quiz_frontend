
// CORS block this ddirect acces so i creat a python backend server and connect by that
  const API_URL = "http://127.0.0.1:8000/quiz-data";

  export const fetchQuizData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch quiz data");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };