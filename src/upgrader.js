module.exports.job = (creep) => {
    if (creep.memory.controller == null) {
        creep.memory.controller = creep.room.controller.id;
    }
	if (creep.memory.source == null) {
		creep.memory.source = Game.getObjectById(creep.memory.controller).pos.findClosestByRange(FIND_SOURCES).id;
	}
	let {controller, source} = creep.memory; // id
	source = Game.getObjectById(source);
	controller = Game.getObjectById(controller);
	
	if (creep.store[RESOURCE_ENERGY] == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(source);
	}
	else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(controller);
	}
	else {
	    creep.harvest(source) === 0 || creep.upgradeController(controller) === 0 || creep.moveTo(controller);
	}
};
