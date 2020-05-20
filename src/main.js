let spawn = require("spawn");
let harvester = require("harvester");
module.exports.loop = function () {
	// Your code goes here
	Object.entries(Game.spawns).forEach(
	    ([spawnName, spawnObject]) => spawn.job(spawnObject)
	);
	Object.entries(Game.creeps).forEach(
	    ([creepName, creepObject]) => harvester.job(creepObject)
	);
}
