const harvesterNB = 5;
const upgraderNB = 2;
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
};
