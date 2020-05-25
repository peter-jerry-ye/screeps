module.exports.job = (tower) => {
    let hostile = tower.room.find(FIND_HOSTILE_CREEPS, {
        filter: ((creep) => creep.getActiveBodyparts(ATTACK) != 0 || creep.getActiveBodyparts(RANGED_ATTACK) != 0)
    });
    if (hostile.length != 0) {
        tower.attack(hostile[0]);
    }
}