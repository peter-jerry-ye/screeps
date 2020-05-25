let calculated = false;
let list = [];
let counter = 0;

module.exports.init = () => {
    calculated = false;
    list = [];
    counter = 0;
}

let calculate = (creep) => {
    list = Object.entries(Memory.targets["maintainer"])
	            .filter(([id, count]) => Game.getObjectById(id).hits < Game.getObjectById(id).hitsMax && count === 0)
	            .sort(([id1, count1], [id2, count2]) => {
	                let object1 = Game.getObjectById(id1);
	                let object2 = Game.getObjectById(id2);
	                if (object1.structureType != STRUCTURE_WALL && object2.structureType === STRUCTURE_WALL) {
	                    return -1; // wall second
	                }
	                else if (object1.structureType === STRUCTURE_WALL && object2.structureType != STRUCTURE_WALL) {
	                    return 1; // wall second
	                }
	                else if (count1 != 0 && count2 == 0) {
	                    return 1; // no maintainer first
	                }
	                else if (count1 == 0 && count2 != 0) {
	                    return -1;
	                }
	                else {
	                    return object1.hits * 1.0 / object1.hitsMax - object2.hits * 1.0 / object2.hitsMax;
	                }
	            })
	            .map(([id, count]) => id);
    calculated = true;
}

module.exports.job = (creep) => {
    if (creep.memory.target != null && (
         (Game.getObjectById(creep.memory.target).structureType == STRUCTURE_WALL
	                && Game.getObjectById(creep.memory.target).hits >= creep.memory.previousHits + 5000)
	        || Game.getObjectById(creep.memory.target).hits == Game.getObjectById(creep.memory.target).hitsMax)
        ) {
        Memory.targets["maintainer"][creep.memory.target]--;
        creep.memory.target = null;
        creep.memory.source = null;
    }
	if (creep.memory.target == null) {
        if (!calculated) calculate();
        list.forEach(id => console.log(id));
		if (list.length > 0) {
		    if (counter > list.length) {
		        creep.memory.target = list[0];
		        creep.memory.source = Game.getObjectById(list[0]).pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
		        Memory.targets["maintainer"][list[0]]++;
		        if (Game.getObjectById(list[0]).structureType == STRUCTURE_WALL) {
    		        creep.memory.previousHits = Game.getObjectById(list[0]).hits;
		        }
		    }
		    else {
		        creep.memory.target = list[counter];
		        creep.memory.source = Game.getObjectById(list[counter]).pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
		        Memory.targets["maintainer"][list[counter]]++;
		        if (Game.getObjectById(list[counter]).structureType == STRUCTURE_WALL) {
    		        creep.memory.previousHits = Game.getObjectById(list[counter]).hits;
		        }
		        counter++;
		    }
		}
	}
	let {target = null, source = null} = creep.memory; // id
	if (target == null) {
	    return;
	}
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
