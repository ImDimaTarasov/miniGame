// абстрактный класс

class Hero {
	constructor(health, energy) {
		this.health = health;
		this.energy = energy;
	}

	wait() {
		throw "This method must be implemented in subclass";
	}
	attack() {
		throw "This method must be implemented in subclass";
	}
	defend() {
		throw "This method must be implemented in subclass";
	}
	get hp() {
		return this.health;
	}
	set hp(damage) {
		this.health = this.health - damage;
	}
	get sta() {
		return this.energy;
	}
	set sta(energy) {
		this.energy = this.energy - energy;
	}
}

class Orc extends Hero {
	attack() {
		return 10;
	}
	defend() {
		this.energy = this.energy - 10;
	}
	wait() {
		this.energy = this.energy + 10;
	}
}

// class Magician extends Hero {
// 	characteristics = {
// 		attack: {
// 			manaCost: 5,
// 			power: 10,
// 			lowPower: 1,
// 		},
// 	};
// 	attack() {
// 		if (this.mana >= this.characteristics.attack.manaCost) {
// 			this.mana = this.mana - this.characteristics.attack.manaCost;
// 			return this.characteristics.attack.power;
// 		}
// 		return this.characteristics.attack.lowPower;
// 	}
// 	defend() {
// 		if (this.energy) {
// 			this.energy = this.energy - 5;
// 			return 5;
// 		}
// 		return 0;
// 	}
// 	// wait() {
// 	// 	this.energy = this.energy + 5;
// 	// 	this.mana = this.mana + 5;
// 	// }
// }

// const magician = new Magician(100, 150, 100);
// console.log(magician.attack())
