const harvesterNB = 2;
const upgraderNB = 2;
const builderNB = 2;
module.exports.job = function(spawn) {
	if (spawn.memory.source == null) {
		spawn.memory.source = spawn.pos.findClosestByRange(FIND_SOURCES).id;
	}
	if (spawn.memory.path == null) {
		spawn.memory.path = spawn.pos.findPathTo(Game.getObjectById(spawn.memory.source), {serialize: true, ignoreCreeps: true})
		Room.deserializePath(spawn.memory.path)
			.map(pos => spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
	}
	let harvesters = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'harvester';
	});
	let upgraders = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'upgrader';
	});
	let builders = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'builder';
	});
	if (harvesters.length < harvesterNB) {
	    spawn.spawnCreep([WORK, CARRY, MOVE], 
	        Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "harvester"}}
	    );
	}
	else if (upgraders.length < upgraderNB) {
	    spawn.spawnCreep([WORK, CARRY, MOVE], 
	        Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "upgrader"}}
	    );
	}
	else if (builders.length < builderNB) {
	    spawn.spawnCreep([WORK, CARRY, MOVE],
	        Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "builder"}}
	    );
	}
};
