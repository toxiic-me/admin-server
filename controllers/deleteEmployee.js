const Employees = require("../models/Employees.js");

const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    try {
        console.log('id: ', id);
        let isDeleted = await Employees.deleteOne({ id });
        console.log(isDeleted);
        if (isDeleted.deletedCount === 1) {
            if (updateId(id)) {
                res.status(200).json({ message: 'Employee deleted successfully' })
            } else {
                res.status(207).json({ message: 'Unable to update the employee Id' })
            }
        } else {
            res.status(500).json({ error: 'Error deleting the employee' });
        }
    } catch (error) {
        console.log('Error while deleting a employee: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateId = async (removedEmployeeId) => {
    let isIdUpdated = await Employees.updateMany({ id: { $gt: removedEmployeeId } }, { $inc: { id: -1 } })
    if (isIdUpdated.acknowledged === true) {
        return true
    } else {
        return false
    }
}


module.exports = deleteEmployee;
