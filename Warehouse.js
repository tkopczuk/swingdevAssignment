const Truck = require('./Truck');

class Warehouse {
	constructor(order, truckMaxLoad){
		this.order = order;
		this.trucks = [];
		this.truckMaxLoad = truckMaxLoad;
	}
	
	static price(weight){
		if(isNaN(weight)) return 0;
		return (weight <= 400) ? weight * 0.01 : 2 + weight * 0.005;
	}
	
	totalPrice(){
		let total = 0.0;
		this.order.forEach((row) => {
			total += Warehouse.price(row.weight);
		});
		return Number(Math.round(total + 'e2') + 'e-2');
	}
	
	sortOrder(){
		this.order.sort((a,b) => {
			if(a.weight > b.weight) return -1;
			if(a.weight < b.weight) return 1;
			return 0;
		})
	}
	
	assignTrucks(){
		this.sortOrder();
		
		this.order.forEach((ord)=>{
			let assigned = false;
			
			for(let i = 0; i < this.trucks.length; i++){
				
				if(this.trucks[i].addPackage(ord)){
					assigned = true;
					break;
				}
			}
			
			if(!assigned){
				this.trucks.push(new Truck(this.truckMaxLoad));
				this.trucks[this.trucks.length - 1].addPackage(ord);
			}
		})
	}
	
	getTrucksArray(){
		let trucks = [];
		
		this.trucks.forEach((truck)=>{
			trucks.push(truck.toObject());
		});
		
		return trucks;
	}
	
	toObject(){
		return {
			"price": this.totalPrice(),
			"trucks": this.getTrucksArray()
		}
	}
	
}

module.exports = Warehouse;