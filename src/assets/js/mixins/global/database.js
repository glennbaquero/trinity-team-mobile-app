export default {
	data: function() {
		return {
			database: null,
		}
	},	

	methods: {
		openDatabase: function() {
			this.database = window.sqlitePlugin.openDatabase({
				name: 'my.trinity_team_db',
				location: 'default',
			});

			this.database.transaction(function(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS calls (id, medical_representative_id, doctor_id, agenda, clinic, scheduled_date, arrived_at, left_at, notes, signature, type, display)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS call_attachments (medical_representative_id, call_id, filename, file)');
			}, function(error){
				console.log("Error while creating database");
			});

		},

		insert: function(query, data) {
			this.isDatabaseOpen();
			
			return new Promise((resolve, reject) => {
				
				this.database.transaction(function(tx) {
					tx.executeSql(query, data);
				}, function(error) {
					console.log('Transaction ERROR: ' + error.message);
					reject('Transaction ERROR: ' + error.message);
				}, function() {
					console.log('Populated database OK');
					resolve();
				});

			});
		},

		update: function(query, data) {
			this.isDatabaseOpen();
			
			this.database.transaction(function(tx) {
				tx.executeSql(query, data);
			}, function(error) {
				console.log('Transaction ERROR: ' + error.message);
			}, function() {
				console.log('Updated');
			});

		},

		get: function(query, params = []) {
			this.isDatabaseOpen();

			return new Promise((resolve, reject) => {

				this.database.transaction(transaction => {
					transaction.executeSql(query, params, (ignored, resultSet) => {
						var result = []
						for(var i = 0; i < resultSet.rows.length; i++) {
							var data = resultSet.rows.item(i);
							result.push(data);
						}
						resolve(result);
					});
				}, error => {
					reject(error);
					console.log(error);
				});

			});
		},

		delete(query, params = []) {
			this.isDatabaseOpen();

			return new Promise((resolve, reject) => {
				this.database.transaction(function (tx) {
			        tx.executeSql(query, params, function (tx, res) {
			        	resolve();
			        },
			        function (tx, error) {
			            reject();
			            console.log('DELETE error: ' + error.message);
			        });
			    }, function (error) {
			    	reject();
			        console.log('transaction error: ' + error.message);
			    }, function () {
					resolve();
			        console.log('transaction ok');
			    });
			});

		},

		truncate: function(table) {
			this.isDatabaseOpen();
			this.database.transaction(transaction => {
				transaction.executeSql('DELETE FROM ' + table, (ignored, resultSet) => {
					console.log(table + ' truncated')
				}, error => {
					console.log(error);
				});
			});
		},

		checkDatabase: function(callback) {
			this.openDatabase();
			var status = false;

			this.database.transaction((tx) => {
				tx.executeSql('SELECT count(*) AS item FROM calls', [], (tx, rs) => {
					if(rs.rows.item(0).item !== 0) {
						status = true;
					}
				});
			}, error => {
				console.log(error);
			}, () => {
				callback(status);
			});				
		},

		isDatabaseOpen: function() {
			if(!this.database) {
				this.openDatabase();
			}
		},

	},

}