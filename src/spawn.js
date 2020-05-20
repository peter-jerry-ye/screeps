const harvesterNB = 5;
module.exports.job = function(spawn) {
	if (spawn.memory.source == null) {
		spawn.memory.source = spawn.pos.findClosestByRange(FIND_SOURCES).id;
	}
	if (spawn.memory.path == null) {
		spawn.memory.path = spawn.pos.findPathTo(spawn.memory.source, {serialize: true, ignoreCreeps: true})
		Room.deserializePath(spawn.memory.path)
			.map(pos => spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
	}
	if (Object.keys(Game.creeps).length < harvesterNB) {
	    spawn.spawnCreep([WORK, CARRY, MOVE], 
	        Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "harvester"}}
	    );
	}
};
