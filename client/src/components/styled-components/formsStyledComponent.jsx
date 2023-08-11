import styled from "styled-components";

export const SearchFromContainer = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        button {
            width: 100%;
            margin-top: 20px;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const FormContainer = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 10px;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }

    @media (max-width: 480px) {
        
    }
`;