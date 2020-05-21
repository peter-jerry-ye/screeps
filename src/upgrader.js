module.exports.job = (creep) => {
    if (creep.memory.controller == null) {
        creep.memory.controller = creep.room.controller.id;
    }
	if (creep.memory.source == null) {
		creep.memory.source = Game.getObjectById(creep.memory.controller).memory.source;
	}
	let {controller, source} = creep.memory; // id
	source = Game.getObjectById(source);
	controller = Game.getObjectById(controller);
	
	if (creep.store[RESOURCE_ENERGY] == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(source);
	}
	else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && creep.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	    console.log("YES");
	    creep.moveTo(controller);
	}
	else {
	    console.log(creep.transfer(controller, RESOURCE_ENERGY));
	    creep.harvest(source) || creep.transfer(controller);
	}
};
