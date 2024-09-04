const { getBookingByBabysitter } = require("../controller/bookingController");
const { getUserFavorites, addFavorite, deleteFavorite } = require("../controller/favoriteController");

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
    Favorite:{
        getUserFavorites:'/getFavorites/:id',
        addFavorite:'/addFavorite',
        deleteFavorite:'/deleteFavorite',
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
