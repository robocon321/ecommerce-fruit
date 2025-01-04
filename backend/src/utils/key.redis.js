// user key section
const usernamesUniqueSetKey = () => 'usernames:unique';
const usersHashKey = (user_id) => `users#${user_id}`;
const usernamesScoreKey = () => 'usernames';

// product key section
const productByScoreKey = (order) =>  `product:${order}`;
const productHashKey = (product_id) => `products#${product_id}`;
const productSetKey = () => 'products:set';


module.exports = {
    usernamesUniqueSetKey,
    usersHashKey,
    usernamesScoreKey,
    productByScoreKey,
    productHashKey,
    productSetKey
}