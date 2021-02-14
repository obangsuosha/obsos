import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color:inherit;
    }
    *{
        box-sizing : border-box;
    }
    body{
        font-size:14px;
        background-color:rgba(20,20,20,1);
        color:white;
        padding: 50px 0px;
    }

    div{
        margin: 10px;
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
            border-radius: 3.5px;
            background-color: rgba(0, 0, 0, 0.5);
        }
    
        &::-webkit-scrollbar {            
            height:7px;
            background-color: rgba(0, 0, 0, 0);
        }
    
        &::-webkit-scrollbar-thumb {
            border-radius: 3.5px;
            -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3);
            background-color: #d62929;
        }
    }
`;

export default globalStyles;
