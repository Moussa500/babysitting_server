const { getBookingByBabysitter } = require("../controller/bookingController");

const EndPoints = {
    User: {
        getAllUsers: '/getAllUsers',
        getUserById: '/getUserById/:id',
        searchUserByName: '/searchUserByName',
        updateUserBabySitter: '/updateUserBabySitter/:id',
        updateUserAdmin: '/updateUserAdmin/:id',
        updateUserParent:'/updateUserParent/:id',
        deleteUser: '/deleteUser/:id',
        addUser: '/addUser',
    },
    Auth: {
        login: '/login',
        register: '/register',
        protected:'/protected'
    },
    Permission:{
        getAdminPermission:'/getAdminPermission/:id',
        assignPermission:'/assignPermission/:email',
        banAndUnbanUser:'/banAndUnbanUser',
    },
    booking:{
        bookSitter:'/bookSitter',
        cancelBooking:'/cancelBooking',
        getBookingByParent:'/getBookingByParent/:parentID',
        getBookingByBabysitter:'/getBookingByBabySitter/:babySitterID'
    },
    Article:{
        postArticle:'/postArticle',
        getArticles:'/getArticles',
        updateArticle:'/updateArticle'
    }
};
module.exports = EndPoints;
