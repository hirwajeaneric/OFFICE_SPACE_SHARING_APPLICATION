import React, { useEffect } from 'react'
import { ReportPaperContainer, TableList } from '../styled-components/ReportStyledComponents';
import { useParams } from 'react-router-dom';
import { HeaderThree } from '../styled-components/generalComponents';
import { useSelector } from 'react-redux';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const params =  useParams();

    const { ownedOfficeSpaces } = useSelector(state => state.officeSpace);
    // FETCHING CONTRACT INFORMATION.
    useEffect(() => {
        
    },[params])

    return (
        <ReportPaperContainer ref={ref}>
            {/* GENERAL DETAILS ****************************************************************************************************************************** */}
            <img src='/imgs/logo2.png' alt='' style={{ width: '50%' }} />
            <div style={{ display: 'flex', flexDirection:'column', gap: '20px', marginBottom: '20px', alignItems:'flex-start', width:'100%'}}>
                <HeaderThree style={{ margin: '0', fontWeight: '600', color:'green', width: '100%', paddingBottom: '10px', borderBottom: '1px solid green' }}>Office spaces</HeaderThree>
                <TableList>
                    <thead>
                        <tr>
                            <th>Space type</th>
                            <th>Updated on</th>
                            <th>Location</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownedOfficeSpaces && ownedOfficeSpaces.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.officeSpaceType}</td>
                                    <td>{element.lastUpdated}</td>
                                    <td>{element.location}</td>
                                    <td>{element.description}</td>
                                </tr>
                            )
                        })
}                    </tbody>
                </TableList>
            </div>
            <p>Copyright {new Date().getFullYear()} &copy; OSSA. All Rights Reserved. </p>
        </ReportPaperContainer>
    )
})