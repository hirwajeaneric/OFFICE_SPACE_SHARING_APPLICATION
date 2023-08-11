/** 
 * 
 * This file contains a list of API Endpoints from the backend application to perform all system functionalities tied to the backend and FaDatabase.
 * 
 * */
const PORT = '4444';
const HOST = '192.168.43.16';
// const HOST = 'localhost';
const PROTOCOL = 'http';
const LINK =  `${PROTOCOL}://${HOST || 'localhost'}:${PORT}/api/v1/isma/`;

let APIS = {
    userApis: {
        signIn: `${LINK}user/signin`,
        signUp:`${LINK}user/signup`,
        requestPasswordReset: `${LINK}user/requestPasswordReset`,
        resetPassword: `${LINK}user/resetPassword?id=`,
        updateUserAccount: `${LINK}user/update?id=`,
        findById: `${LINK}user/findById?id=`,
        findByEmail: `${LINK}user/findByEmail?email=`,
        list: `${LINK}user/list`,
    },
    contractApis: {
        add: `${LINK}contract/add`,
        update: `${LINK}contract/update?id=`,
        delete: `${LINK}contract/delete?id=`,
        list: `${LINK}contract/list`,
        findById: `${LINK}contract/findById?id=`,
        findByOwnerId: `${LINK}contract/findByOwnerId=`,
        findByStatus: `${LINK}contract/findByStatus=`,
        findByTenantId: `${LINK}contract/findByTenantId=`,
    },
    propertyApis: {
        add: `${LINK}property/add`,
        update: `${LINK}property/update?id=`,
        delete: `${LINK}property/delete?id=`,
        list: `${LINK}property/list`,
        findById: `${LINK}property/findById?id=`,
        findByLocation: `${LINK}property/findByLocation?location=`,
        findByMapCoordinates: `${LINK}property/findByMapCoordinates?mapCoordinates=`,
        findByOwnerId: `${LINK}property/findByOwnerId?ownerId=`,
        findByPostId: `${LINK}property/findByPostId?postId=`,
        findByStatus: `${LINK}property/findByStatus?status=`,
    },
    joinPostApis: {
        add: `${LINK}joinPost/add`,
        update: `${LINK}joinPost/update?id=`,
        list: `${LINK}joinPost/list`,
        findById: `${LINK}joinPost/findById?id=`,
        findByPropertyId: `${LINK}joinPost/findByPropertyId?propertyId=`,
        findByExpectedActivities: `${LINK}joinPost/findByExpectedActivities?expectedActivity=`,
        findByOwnerId: `${LINK}joinPost/findByOwnerId?ownerId=`,
        findByPostingTenantId: `${LINK}joinPost/findByPostingTenantId?postingTenantId=`
    },
    joinRequestApis: {
        add: `${LINK}joinRequest/add`,
        update: `${LINK}joinRequest/update?id=`,
        delete: `${LINK}joinRequest/delete?id=`,
        list: `${LINK}joinRequest/list`,
        findById: `${LINK}joinRequest/findById?id=`,
        findByJoinPost: `${LINK}joinRequest/findByJoinPost?joinPost=`,
        findByPropertyId: `${LINK}joinRequest/findByPropertyId?properyId=`,
    },
    rentRequestApis: {
        add: `${LINK}rentRequest/add`,
        update: `${LINK}rentRequest/update?id=`,
        delete: `${LINK}rentRequest/delete?id=`,
        list: `${LINK}rentRequest/list`,
        findById: `${LINK}rentRequest/findById?id=`,
        findByPropertyId: `${LINK}rentRequest/findByPropertyId?propertyId=`,
    },
    contact: {
        add: `${LINK}email`,
    },
    files: {
        profiles: `${LINK}profile/`,
        property: `${LINK}property/`,
    }
}

module.exports = {APIS, HOST, PORT, LINK, PROTOCOL };