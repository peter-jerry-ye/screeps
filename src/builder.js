module.exports.job = (creep) => {
	if (creep.memory.target == null || Game.getObjectById(creep.memory.target) == null) {
		let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (constructionSites.length === 0)
		    return;
		
		creep.memory.target = constructionSites[0].id;
		creep.memory.source = constructionSites[0].pos.findClosestByPath(FIND_SOURCES, {
		    ignoreCreeps: true
		}).id;
	}
	let {target, source} = creep.memory; // id
	source = Game.getObjectById(source);
	target = Game.getObjectById(target);
	
	if (creep.store[RESOURCE_ENERGY] == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(source);
	}
	else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && creep.build(target) == ERR_NOT_IN_RANGE) {
	    creep.moveTo(target);
	}
	else {
	    creep.harvest(source) === 0 || creep.build(target);
	}
};
