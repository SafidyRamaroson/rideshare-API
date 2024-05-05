module.exports = (database,DataTypes) => {
const Seat = database.define('Seat', {
    seatID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    seatType: {
        type: DataTypes.ENUM('Adult', 'Child', 'Handicap'),
        allowNull: false
    },
    numberOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})
    Seat.belongsTo(require("./trip.model")(database,DataTypes), { foreignKey: 'TripID' });

    return Seat;
}
