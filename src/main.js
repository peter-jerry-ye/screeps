let spawn = require("spawn");
let harvester = require("harvester");
let upgrader = require("upgrader");
let builder = require("builder");
module.exports.loop = function () {
	// Your code goes here
	Object.entries(Game.spawns).forEach(
	    ([spawnName, spawnObject]) => spawn.job(spawnObject)
	);
	Object.entries(Game.creeps).forEach(
	    ([creepName, creepObject]) => {
	        switch(creepObject.memory.role) {
	            case "harvester":
	                harvester.job(creepObject);
	                break;
	            case "upgrader":
	                upgrader.job(creepObject);
	                break;
	            case "builder":
	                builder.job(creepObject);
	                break;
	        }
	    }
	);
}
