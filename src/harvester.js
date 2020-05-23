module.exports.job = (creep) => {
	// choose target
	if (creep.memory.target != null && Game.getObjectById(creep.memory.target).store.getFreeCapacity(RESOURCE_ENERGY) === 0) { // change target
	    Memory.targets["harvester"][creep.memory.target]--;
	    creep.memory.target = null;
	}
	if (creep.memory.target == null) {
	    for (let id in Memory.targets["harvester"]) {
	        let object = Game.getObjectById(id);
	        if (object.store.getFreeCapacity(RESOURCE_ENERGY) != 0 && Memory.targets["harvester"][id] < 2) {
	            Memory.targets["harvester"][id]++;
	            creep.memory.target = id;
	            break;
	        }
	    }
	}
	
	// choose source
	let {target = null, source = null, spawn} = creep.memory; // id
	if (target == null) return; // do nothing
	target = Game.getObjectById(target);
	spawn = Game.getObjectById(spawn);
	if (source == null) {
	    creep.memory.source = spawn.memory.source[target.id];
	    source = creep.memory.source;
	}
	source = Game.getObjectById(source);
	
	// do the job
	if (creep.store[RESOURCE_ENERGY] == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(source);
	}
	else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(target);
	}
	else {
	    creep.harvest(source) === 0 || creep.transfer(target, RESOURCE_ENERGY) === 0 || creep.moveTo(target);
	}
};
