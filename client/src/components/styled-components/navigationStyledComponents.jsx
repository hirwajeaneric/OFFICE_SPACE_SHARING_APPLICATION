import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled(Link)`
    color: black;
    text-decoration: none;
    font-size: 200%;
    
    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        margin-left: 10px;
    }

    @media (max-width: 480px) {
        
    }
`;

export const DesktopNav = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    button {
        background: none;
        font-size: 100%;
        border: none;
    }

    a, button {
        color: black;
        text-decoration: none;
        padding: 20px 12px;
        cursor: pointer;
    }

    a { 
        &:hover {
            color: blue;
        }

        &.active {
            border-bottom: 3px solid #003366;
            color: #003366;
        }
    }

    div {
        button {
            text-decoration: none;
            padding: 10px 10px;
            cursor: pointer;
        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 800px) {
        display: none;
    }

    @media (max-width: 480px) {
        
    }
`;

export const MobileNav = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    border-top: 1px solid green; 

    button {
        background: none;
        font-size: 100%;
        border: none;
        text-align: left;

        &:hover {
            color: blue;
        }
    }

    a, button {
        color: black;
        text-decoration: none;
        padding: 20px 12px;
        cursor: pointer;
        width: 100%;
    }

    a { 
        &:hover {
            color: blue;
        }

        &.active {
            border-bottom: 3px solid green;
            color: green;
        }
    }

    div {
        button {
            text-decoration: none;
            padding: 10px 10px;
            cursor: pointer;
        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 800px) {

    }

    @media (max-width: 480px) {
        
    }
`;

export const MobileNavButton = styled.button`
    display: none;
    background: none;
    font-size: 100%;
    border: none;
    color: black;
    text-decoration: none;
    padding: 20px 12px;
    cursor: pointer;

    @media (max-width: 800px) {
        display: flex;
    }

    @media (max-width: 480px) {
        
    }
`;