const environment = 'prod';
// config.js (or any other file)


let config = {
    
      API_BASE_URL: "http://localhost:8000",
    
    
  };

  
if(environment == 'prod')
{
     config = {
    
        API_BASE_URL: "https://chatnvd.ddns.net",
      
      
    };
}

  // Use REACT_APP_ENV to determine the environment
  
  
  export default config;
  