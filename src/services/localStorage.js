const getToken = () => {
    console.log("ACCESS_TOKEN");
  };
    
  const setToken = (token) => {
    console.log("ACCESS_TOKEN");
  };
  
  const clearToken = () => {
   console.log('cleartoken');
  };
  
  const getRole = () => {
    if (token) {
      const role = getARole()
      return role || "USER";
    };
    return "GUEST";
  };
  
  const allLocal = {
    getToken,
    setToken,
    clearToken
  }
  
  export default allLocal;
  