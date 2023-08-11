import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const TopBanner = styled.div`
    color: white;
    width: 100%;
    height: 20%;

    div {
        background: rgba(0,0,0,0.5);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1 {
            text-align: center;
            padding: 0 20px;
        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        div {
            height: 100%;
    
            h1 {
                padding: 20px 20px;
            }
        }
    }

    @media (max-width: 480px) {
        height: 30%;
        div {
            height: 100%;
    
            h1 {
                padding: 20px 20px;
            }
        }
    }
`;

export const AuthPagesContainer = styled.div`
    height: 80%;        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        height: 70%;        
    }
`;

export const AuthenticationPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const InnerContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: white;
    border-top: 4px solid green;
    margin: 40px 0;

    h2 {
        margin: 40px 0;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        h2 {
            margin: 20px 0;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const AuthFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 70%;
    margin-bottom: 80px;

    // input, button, div {
    //     width: 100%;

    //     input {
    //         width: 100%;
    //     }

    //     div {
    //         width: 100%;
    //         display: flex;
    //         flex-direction: row;

    //         input {
    //             width: 100%;
    //         }

    //         div {
    //             width: 100%;
    //         }
    //     }
    // }
    

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 480px) {
        width: 80%;
    }
`;

export const CommandButtons = styled.div`
    display: flex; 
    flex-direction: row; 
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between; 
    align-items: flex-start;
    margin-top: 20px;

    button, p {
        width: 45%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        button, p {
            width: 100%;
        }        
        flex-wrap: wrap;
        
        button { 
            margin-bottom: 20px;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomRequestsNavLink= styled(NavLink)`
    color: black;
    margin-top: 20px;
    text-decoration: none;
    color: black;

    &:hover {
        color: #99ccff;
    }

    &.active {
        color: #0059b3;
        font-weight: 600;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;