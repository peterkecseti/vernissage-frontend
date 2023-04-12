import React from "react";
import {
    useNavigate
  } from "react-router-dom";
  
  export default function withRouter(Component: typeof React.Component) {
    function ComponentWithRouterProp(props: any) {
      let navigate = useNavigate();
      return (
        <Component
          {...props}
          navigate={ navigate }
        />
      );
    }
  
    return ComponentWithRouterProp;
  }