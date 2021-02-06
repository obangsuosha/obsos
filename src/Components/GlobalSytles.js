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
    }
`;

export default globalStyles;
