const app = () => {
	const actionBtn = document.querySelector(".action");
	//ORC
	// MAX HP AND STA
	const orcMaxHpBar = document.querySelector("#orcMaxHp");
	const orcMaxStaBar = document.querySelector("#orcMaxSta");
	// HP AND STA
	const orcHpBar = document.querySelector("#orcHP");
	const orcStaBar = document.querySelector("#orcSta");

	const orcStatus = document.querySelector("#orcStatus");
	const orcRadioInputs = document.querySelectorAll("#orcRadio > input");
	const maxHp = 200;
	const maxSta = 150;
	const orc = new Orc(maxHp, maxSta);
	// ORC_WOLF
	// MAX HP AND STA
	const orcWolfMaxHpBar = document.querySelector("#orcWolfMaxHp");
	const orcWolfMaxStaBar = document.querySelector("#orcWolfMaxSta");

	// HP AND STA
	const orcWolfHpBar = document.querySelector("#orcWolfHP");
	const orcWolfStaBar = document.querySelector("#orcWolfSta");
	const orcWolfStatus = document.querySelector("#orcWolfStatus");
	const orcWolfRadioInputs = document.querySelectorAll(
		"#orcWolfRadio > input"
	);
	const maxWolfHp = 150;
	const maxWolfSta = 200;
	const orcWolf = new Orc(maxWolfHp, maxWolfSta);

	const setWidthOfbar = (selector, char, width = 0) => {
		selector.style.width = char + width + "px";
	};
	const displayMaxHpAndSta = () => {
		//ORC
		setWidthOfbar(orcMaxHpBar, orc.hp, 10);
		setWidthOfbar(orcMaxStaBar, orc.sta, 10);
		// ORC_WOLF
		setWidthOfbar(orcWolfMaxHpBar, orcWolf.hp, 10);
		setWidthOfbar(orcWolfMaxStaBar, orcWolf.sta, 10);
	};
	const displayHpAndSta = () => {
		// ORC
		setWidthOfbar(orcHpBar, orc.hp);
		setWidthOfbar(orcStaBar, orc.sta);
		// ORC_WOLF
		setWidthOfbar(orcWolfHpBar, orcWolf.hp);
		setWidthOfbar(orcWolfStaBar, orcWolf.sta);
	};
	const getValueFromRadio = (selector) => {
		let res = "";
		selector.forEach((btn) => {
			if (btn.checked) {
				res = btn.value;
			}
		});
		return res;
	};
	const checkWinner = () => {
		if (orc.hp <= 0) {
			orcStatus.textContent = "Died";
			orcWolfStatus.textContent = "Winner"
			actionBtn.classList.toggle('hide')
		}
		if (orcWolf.hp <= 0) {
			orcWolfStatus.textContent = "Died";
			orcStatus.textContent = "Winner"
			actionBtn.classList.toggle('hide')
		}
	};
	
	const actionForCharacter = (action, char, opponent, opponentAction) => {
		if (action === "attack") {
			char.defend();
			if (opponentAction === "defend") {
				if (opponent.sta <= 0) {
					opponent.hp = char[action]();
					return;
				}
				opponent.sta = char[action]();
				return;
			}
			opponent.hp = char[action]();
		}
		if (action === "defend") {
			char[action]();
		}
		if (action === "wait") {
			if(char.sta >= maxSta || char.sta >= maxWolfSta){
				return
			}
			char[action]();
		}
	};
	const onSubmit = () => {
		const orcAction = getValueFromRadio(orcRadioInputs);
		const orcWolfAction = getValueFromRadio(orcWolfRadioInputs);
		actionForCharacter(orcAction, orc, orcWolf, orcWolfAction);
		actionForCharacter(orcWolfAction, orcWolf, orc, orcAction);
		checkWinner();
		displayHpAndSta();
	};
	const init = () => {
		displayMaxHpAndSta(orc.hp, orcWolf.hp);
		actionBtn.addEventListener("click", onSubmit);
	};
	return {
		init: init,
	};
};
app().init();
