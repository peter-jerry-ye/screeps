module.exports.job = (creep) => {
	if (creep.memory.source == null) {
		creep.memory.source = Game.getObjectById(creep.memory.spawn).memory.source;
	}
	let {spawn, source} = creep.memory; // id
	source = Game.getObjectById(source);
	spawn = Game.getObjectById(spawn);
	
	if (creep.store[RESOURCE_ENERGY] == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(source);
	}
	else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(spawn);
	}
	else {
	    creep.harvest(source) === 0 || creep.transfer(spawn) === 0 || creep.moveTo(spawn);
	}
};
