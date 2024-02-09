const usernamesUniqueSetKey = () => 'usernames:unique';
const usersHashKey = (user_id) => `users#${user_id}`;
const usernamesScoreKey = () => 'usernames';

module.exports = {
    usernamesUniqueSetKey,
    usersHashKey,
    usernamesScoreKey
}