/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

//lifecylce methods


//conditional rendering

const MyComponent = ({ isLoggedIn }) => {
    return (
      <div>
        {isLoggedIn ? <LoggedInComponent /> : <LoginComponent />}
      </div>
    );
  };
  
  const AndComponent = ({ isLoggedIn }) => {
    return (
      <div>
        {isLoggedIn && <LoggedInComponent />}
      </div>
    );
  };
  
  const IfComponent = ({ isLoggedIn }) => {
    if (isLoggedIn) {
      return <LoggedInComponent />;
    } else {
      return <LoginComponent />;
    }
  };
  
  //styling in react JS
  ///1st method 
  const styledCompo = () => {
      const xStyle = {
          color: 'green',
          fontSize: '10px',
      };
      return <div style={xStyle}>hello world</div>;
  };
  /// 2nd method
  //   .abc(
  //     text-colur:green;
  //   )  
  const abc=()=>{
  return(xyc?<div className="abc">hello world</div>:"");
  };
    
  //HTTP requests in react js  
  const c = axios.post("URL",{}).then().catch();