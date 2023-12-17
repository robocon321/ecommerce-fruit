const db = require('../models');

const generateCode = async (req, res) => {
    await db.sequelize.transaction({
        autocommit: false,
        type: db.Sequelize.Transaction.TYPES.EXCLUSIVE
    }).
    then(async (t) => {
        try {
            const previous = await db.Code.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
                lock: true,
                transaction: t       
            });

            let newCode;

            if (previous) {
                const suffix = parseInt(previous.code.slice(2)) + 1;
                newCode = 'MT' + suffix.toString().padStart(4, '0');
            } else {
                newCode = 'MT0001';
            }

            const newRecord = await db.Code.create({
                code: newCode
            }, {
                transaction: t
            });
            await t.commit();
            return res.status(201).json(newRecord);
        } catch (error) {
            await t.rollback();
            return res.status(500).json(error.message);
        }
    });

}

module.exports = {
    generateCode
}