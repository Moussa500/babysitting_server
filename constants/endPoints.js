const EndPoints = {
    BaseUrl: 'http://localhost:5000/',
    User: {
        getAllUsers: '/getAllUsers',
        getUserById: '/getUserById/:id',
        searchUserByName: '/searchUserByName',
        addUserBabySitter: '/addUserBabySitter', // Fixed typo
        addUserAdmin: '/addUserAdmin',
        addUserParent: '/addUserParent', // Added missing slash
        updateUserBabySitter: '/updateUserBabySitter',
        updateUser: '/updateUser/:id',
        deleteUser: '/deleteUser/:id',
        addUser: '/addUser'
    }
};
module.exports = EndPoints;
