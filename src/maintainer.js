module.exports.job = (creep) => {
	if (creep.memory.target == null 
	        || Game.getObjectById(creep.memory.target) == null
	        || (Game.getObjectById(creep.memory.target).structureType == STRUCTURE_WALL
	                && Game.getObjectById(creep.memory.target).hits > creep.memory.previousHits + 1000)
	        || Game.getObjectById(creep.memory.target).hits == Game.getObjectById(creep.memory.target).hitsMax) {
		let structures = creep.room.find(FIND_STRUCTURES, {filter: object => object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax}).sort((a, b) => a.hits - b.hits);
		if (structures.length === 0)
		{
		    let walls = creep.room.find(FIND_STRUCTURES, {filter: object => object.structureType == STRUCTURE_WALL && object.hits < object.hitsMax}).sort((a, b) => a.hits - b.hits);
		    if (walls.length === 0) {
		        return;
		    }
		    creep.memory.target = walls[0].id;
		    creep.memory.previousHits = walls[0].hits;
		    creep.memory.source = walls[0].pos.findClosestByPath(FIND_SOURCES, {
    		    ignoreCreeps: true
		    }).id;
		}
		else {
		    creep.memory.target = structures[0].id;
		    creep.memory.source = structures[0].pos.findClosestByPath(FIND_SOURCES, {
    		    ignoreCreeps: true
		    }).id;
		}
	}
	let {target, source} = creep.memory; // id
	source = Game.getObjectById(source);
	target = Game.getObjectById(target);
	
	if (creep.store[RESOURCE_ENERGY] == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(source);
	}
	else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && creep.repair(target) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(target);
	}
	else {
	    creep.harvest(source) === 0 || creep.repair(target) === 0 || creep.moveTo(target);
	}
};
