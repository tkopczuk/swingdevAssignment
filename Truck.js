const ObjectId = require('mongodb').ObjectID;

class Truck{
	constructor(maxLoad){
		this.truckID = new ObjectId();
		this.load = [];
		this.maxLoad = maxLoad;
	}
	
	totalWeight(){
		return this.load.reduce((prev, cur) => {return prev + cur.weight}, 0.0);
	}
	
	addPackage(pack){
		if(this.totalWeight() + pack.weight > this.maxLoad){
			return false;
		}else{
			this.load.push(pack);
			return true;
		}
	}
	
	toObject(){
		return {"truckId": this.truckID, "load": this.load};
	}
}

module.exports = Truck;