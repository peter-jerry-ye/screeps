let calculated = false;
let list = [];
module.exports.init = () => {
    calculated = false;
    list = [];
}

let calculate = (creep) => {
    list = Object.entries(Memory.targets["harvester"])
	            .filter(([id, count]) => Game.getObjectById(id).store.getFreeCapacity(RESOURCE_ENERGY) > 0)
	            .sort(([id1, count1], [id2, count2]) => {
	                if ((Game.getObjectById(id1).structureType === STRUCTURE_SPAWN && Game.getObjectById(id2).structureType != STRUCTURE_SPAWN)
	                        || (Game.getObjectById(id1).structureType != STRUCTURE_TOWER && Game.getObjectById(id2).structureType === STRUCTURE_TOWER)) {
	                    return -1; // spawn first, tower second
	                }
	                else if ((Game.getObjectById(id1).structureType != STRUCTURE_SPAWN && Game.getObjectById(id2).structureType === STRUCTURE_SPAWN)
	                        || (Game.getObjectById(id1).structureType === STRUCTURE_TOWER && Game.getObjectById(id2).structureType != STRUCTURE_TOWER)) {
	                    return 1; // spawn first, tower second
	                }
	                else {
	                    return count1 - count2;
	                }
	            })
	            .map(([id, count]) => id);
    calculated = true;
}

module.exports.job = (creep) => {
	// choose target
	if (creep.memory.target != null && Game.getObjectById(creep.memory.target).store.getFreeCapacity(RESOURCE_ENERGY) === 0
	        || Game.getObjectById(creep.memory.spawn).store.getFreeCapacity(RESOURCE_ENERGY) != 0) { // change target
	    Memory.targets["harvester"][creep.memory.target] = Memory.targets["harvester"][creep.memory.target] - 1;
	    creep.memory.target = null;
	    creep.memory.source = null;
	}
	if (creep.memory.target == null || creep.memory.source == null) {
        if (!calculated) {
            calculate(creep);
        }
	    if (list.length > 0) {
	        creep.memory.target = list[0];
	        creep.memory.source = Game.getObjectById(creep.memory.spawn).memory.source[list[0]];
	        Memory.targets["harvester"][creep.memory.target]++;
	    }
	}
	
	// choose source
	let {target = null, source = null, spawn} = creep.memory; // id
	spawn = Game.getObjectById(spawn);
	if (target == null) {
	    // do nothing
	    creep.moveTo(spawn);
	    return;
	}; 
	
	target = Game.getObjectById(target);
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
