const harvesterNB = 2;
const upgraderNB = 2;
const builderNB = 3;
const maintainerNB = 3;
let worker = (spawn) => {
    let extensions = spawn.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
    let harvesters = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'harvester';
	});
    if (extensions.length >= 5 && harvesters.length > 0) {
        return [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY];
    }
    else if (extensions.length >= 0) {
        return [WORK, WORK, CARRY, MOVE];
    }
    return [WORK, CARRY, MOVE];
}
module.exports.job = function(spawn) {
	let harvesters = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'harvester';
	});
	let upgraders = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'upgrader';
	});
	let builders = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'builder';
	});
	let maintainers = Object.entries(Game.creeps).filter(([creepName, creepObject]) => {
	    return creepObject.memory.role == 'maintainer';
	});
	if (harvesters.length < harvesterNB) {
	    spawn.spawnCreep(worker(spawn), 
	        "h" + Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "harvester"}}
	    );
	}
	else if (upgraders.length < upgraderNB) {
	    spawn.spawnCreep(worker(spawn), 
	        "u" + Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "upgrader"}}
	    );
	}
	else if (builders.length < builderNB) {
	    spawn.spawnCreep(worker(spawn),
	        "b" + Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "builder"}}
	    );
	}
	else if (maintainers.length < maintainerNB) {
	    spawn.spawnCreep(worker(spawn),
	        "m" + Date.now().toString(),
	        {memory: {spawn: spawn.id, role: "maintainer"}}
	    );
	}
};
