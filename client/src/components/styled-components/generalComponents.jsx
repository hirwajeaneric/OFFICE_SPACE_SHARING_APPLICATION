import { Card, FormControl, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';

export const MainAppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #f0f5f5;
    min-height: 100vh;
    width: 100vw;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const FullWidthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageSizedContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    width: 90%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 800px) {
        width: 95vw;
    }

    @media (max-width: 480px) {
        width: 98vw;
    }
`;

export const CenteredFlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const TopLeftFlexAlignedContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SlotsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border: 1px solid #d1e0e0; 
    border-radius: 5px;
    background: white;
    padding: 20px;
    gap: 10px;

    div.header-space {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 20px;    
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const TwoSidedContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: nowrap;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }

    @media (max-width: 480px) {
        
    }
`;

export const TwoSidedFormContainer = styled.form`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    flex-wrap: nowrap;

    div.left, div.right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 47%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 20px;
    }

    @media (max-width: 480px) {
        
    }
`;

export const LeftContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const OfficeSpaceDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    gap: 20px;

    div.image-container {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px;
        
        h3 {
            color: white;
        }
    }

    form.space-details, div.space-details {
        padding: 0 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        div.left, div.right {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 10px;
            width: 49%;
            
            p {
                color: black;
                font-size: 90%;
                
                span {
                    color: gray;
                    font-size: 100%;
                }
            }
        }

        div.left {

        }

        div.right {

        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
        
        div.space-details {
            flex-wrap: wrap;
            gap: 10px;
            div.left, div.right {
                width: 100%;
            }
        }
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;


export const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const CustomLeftContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 67%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const CustomRightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const ThreeSidedContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageWithSideBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;

    div.leftSide {
        width: 70%;
    }

    div.rightSide {
        width: 28%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        gap: 20px;
        div.leftSide {
            width: 100%;
        }

        div.rightSide {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageWithSideMenuContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;

    form {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;

        input {
            100%;
        }
    }

    div.profile-picture {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        
        img {
            width: 70%;
            min-height: 200px;
        }
    }

    div.leftSide {
        width: 20%;
    }

    div.rightSide {
        width: 77%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        gap: 20px;

        form {
            width: 100%;
        }

        div.profile-picture {
            width: 100%;
        }

        div.leftSide {
            width: 100%;
        }

        div.rightSide {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageDetailsContainer = styled.div`
    padding: 20px;    
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    h1 {

    }

    h2 {

    }

    h3 {

    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const HeaderOne = styled.h1`
    font-size: 300%;
    font-weight: 400;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        font-size: 200%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const HeaderTwo = styled.h2`
    font-weight: 400;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const HeaderThree = styled.h3`
    font-weight: 400;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomFormControlOne = styled(FormControl)`
    width: 25%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomFormControl = styled(FormControl)`

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomPropertyCard = styled(Card)`
    height: 100%; 
    display: flex; 
    flex-direction: column;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {
    
    }
`;

export const CustomCarousel = styled(Carousel)`
    width: 100%; 
    height: 400px;
    margin-bottom: 30px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        margin-bottom: 30px;
        height: 250px;
    }

    @media (max-width: 480px) {
    }
`;

export const CustomPaper = styled(Paper)`
    width: 100%;

    img {
        width: 100%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        margin-bottom: 50px;
    }

    @media (max-width: 480px) {
    }
`;

export const PropertyDetailsStyles = styled.div`
    padding: 20px; 
    background: #90CAF9; 
    width: 100%; 
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap; 
    justify-content: space-between; 
    gap: 20px;
    align-items: center;
    border: 1px solid #d1e0e0; 
    border-radius: 5px;

    div {
        align-items: center; 
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        // margin-top: 40px;
    }

    @media (max-width: 480px) {
        
    }
`;

export const PropertyDescriptionSection = styled.div`
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    flex-wrap: nowrap; 
    justify-content: flex-start; 
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 60px;

    h2 {
        padding-bottom: 20px;
        width: 100%;
        border-bottom: 1px solid #d1e0e0;
    }

    p {
        line-height: 23px;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        margin-bottom: 40px;
    }

    @media (max-width: 480px) {
        margin-bottom: 30px;
    }
`;

export const MapContainer = styled.div`
    width: 100%; 
    height: 400px;
    margin: 40px 0;
    border: 1px solid gray; 
    border-radius: 5px;
    

    iframe {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        height: 300px;
        margin: 40px 0;
    }

    @media (max-width: 480px) {
        height: 200px;
        margin: 20px 0;
    }
`;

export const SideMenu = styled.div`
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    justify-content: flex-start; 
    gap: 5px;
    align-items: flex-start;
    margin-bottom: 60px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #d1e0e0;

    h3 {
        width: 100%;
        padding-bottom: 5px;
        border-bottom: 1px solid #d1e0e0;
        margin-bottom: 10px; 
    }

    h3.menu-header {
        margin-top: 20px;
    }

    a {
        text-decoration: none;
        color: black;
        font-size: 90%;
        width: 100%;
        padding: 3px 5px;
        display: flex; 
        flex-direction: row; 
        justify-content: space-between; 
        align-items: center;

        span.quantity {
            padding: 2px;
            border-radius: 5px;
            background: #99ccff;
            font-size: 80%;
        }


        &:hover {
            color: blue;
        }

        &.active {
            background-color: #0073e6;
            font-weight: 700;
            font-size: 100%;
            color: white;
            padding: 5px 10px;
        }
    }

    @media (max-width: 768px) {
    
    }

    @media (max-width: 480px) {
    
    }
`;

export const StatsCard = styled.div`
    background: white;
    width: 31%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d1e0e0;
    margin-bottom: 10px;
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
    gap: 5px;
    align-items: center;

    &:hover {
        box-shadow: 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
        border: none;
    }

    div {
        with: 60%;
        display: flex; 
        flex-direction: column; 
        justify-content: space-between; 
        gap: 20px;
        align-items: flex-start;

        a {
            display: flex; 
            flex-direction: row; 
            justify-content: flex-start; 
            gap: 10px;
            align-items: center;
            text-decoration: none;
            color: #0073e6;
        }
    }

    p {
        font-size: 300%;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const TenantCard = styled.div`
    width: 50%; 
    display: flex; 
    flex-direction: column; 
    justify-content: flex-start; 
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 40px;
    
    h4 {
        color: gray;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        
    }
`;