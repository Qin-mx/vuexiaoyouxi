new Vue({
	el :'#app',
	data : {
		playerblood : 100,
		monsterblood : 100,
		gameIsRun : false,
		turns: []
	},
	methods : {
		damage : function ( max , min ) {
			// 产生一个大于等于1的随机数，这个数在输入的max到min之间
			return Math.max(Math.floor(Math.random() * max) + 1 ,min)
		},
		startGame : function () {
			this.gameIsRun = true;
			this.playerblood = 100;
			this.monsterblood = 100;
			this.turns = []
		},
		attack : function () {
			var damage = this.damage(10,3);
			// console.log(damage)
			this.monsterblood -= damage;
			this.turns.unshift({
				isPlayer : true,
				text : '你攻击了怪物，你掉了 ' + damage + '滴血'
			});	
			if (this.checkWin()) {
                return;
            }	
			this.monsterAttack();	
		},
		specialAttack : function () {
			var damage = this.damage(10,8);
			this.monsterblood -= damage;
			this.turns.unshift({
				isPlayer : true,
				text : '你攻击了怪物，你掉了 ' + damage + '滴血'
			});
			if (this.checkWin()) {
                return;
            }
			this.monsterAttack();
		},
		heal : function () {
			if(this.playerblood <= 90 ){
				this.playerblood += 10;
				this.turns.unshift({
					isPlayer : true,
					text : '你恢复了 10 滴血'
				})
			}else{
				if(this.playerblood == 100){
					this.turns.unshift({
						isPlayer : true,
						text : '你的血量是满的'
					})
				}else{
					var playerblood = this.playerblood;
					var num = parseInt(Math.abs(100-playerblood));
					this.turns.unshift({
						isPlayer : true,
						text : '你恢复了 '+num+' 滴血'
					})
				}
				this.playerblood = 100;
			}

		},
		giveUp : function () {
			this.gameIsRun = false;
			this.turns.unshift({
				isPlayer : true,
				text : '你投降了！'
			});	
		},
		monsterAttack : function () {
			var damage = this.damage(10,5);
			this.playerblood -= damage;
			this.turns.unshift({
				isPlayer : false,
				text : '怪物攻击了你，你掉了 ' + damage + '滴血'
			});		
		},
		checkWin : function () {
			console.log(this)
			if(this.monsterblood <= 0 ){
				if(confirm("你赢了！是否重新开始？")){
					this.startGame();
				}else{
					this.gameIsRun = false;
					this.monsterblood = 0;
				}
				return true;
			}else if(this.playerblood <= 0){
				if(confirm("你输了！是否重新开始？")){
					this.startGame();
					// this.playerblood = 100;
				}else{
					this.gameIsRun = false;
					this.playerblood = 0;
				}
				return true;
			}
			return false;
		}

	}
})

// $('html body').css('font-size',parseInt($(window).width()/750/100)+'px');