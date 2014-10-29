bankersTemplate = function() {
	// "use strict";

	var bankersForm = jQuery("#bankersForm"), rows = jQuery("#rows"), columns = jQuery("#columns");
	var available = [];
	var maxAlloc = [];
	var allotted = [];
	var need = [];
	var flag = false;

	var safeState = [];
	var tmp = [];

	var rowsCnt;
	var colsCnt;
		

	this.enableDisableEle = function(trueOrFalse) {
		/*
		 * rows.prop("readonly",trueOrFalse);
		 * columns.prop("readonly",trueOrFalse);
		 */
	};

	this.createAvailableTable = function(tableId) {
		rowsCnt = rows.val();
		colsCnt = columns.val();
		
		mytable = $('<table></table>').attr({
			id : tableId
		});
		var tr = [];
		var row = $('<tr></tr>').attr({
			class : [ "class1", "class2", "class3" ].join(' ')
		}).appendTo(mytable);
		for ( var j = 0; j < colsCnt; j++) {
			var t = $('<td></td>').appendTo(row);
			$('<input></input>').attr({
				type : "text",
				id : "available_" + j
			}).appendTo(t);
		}

		mytable.appendTo("#availableTableDiv");
	};

	this.createMaxAllocTable = function(tableId) {
		mytable = $('<table></table>').attr({
			id : tableId
		});
		var tr = [];

		for ( var i = 0; i < rowsCnt; i++) {
			var row = $('<tr></tr>').attr({
				class : [ "class1", "class2", "class3" ].join(' ')
			}).appendTo(mytable);
			for ( var j = 0; j < colsCnt; j++) {
				var t = $('<td></td>').appendTo(row);
				$('<input></input>').attr({
					type : "text",
					id : "maxAlloc_" + i + j
				}).appendTo(t);
			}
		}
		mytable.appendTo("#maxAllocTableDiv");
	};

	this.createAllottedTable = function(tableId) {
		mytable = $('<table></table>').attr({
			id : tableId
		});
		var tr = [];
		for ( var i = 0; i < rowsCnt; i++) {
			var row = $('<tr></tr>').attr({
				class : [ "class1", "class2", "class3" ].join(' ')
			}).appendTo(mytable);
			for ( var j = 0; j < colsCnt; j++) {
				var t = $('<td></td>').appendTo(row);
				$('<input></input>').attr({
					type : "text",
					id : "allotted_" + i + j
				}).appendTo(t);
			}
		}

		mytable.appendTo("#allottedTableDiv");
	};

	this.calcNeed = function() {
		bankersObj.assignValues();
		console.log("need details");
		for ( var i = 0; i < rowsCnt; i++) {
			need[i] = [];
			for ( var j = 0; j < colsCnt; j++) {
				need[i][j] = maxAlloc[i][j] - allotted[i][j];
				console.log(need[i][j]);
				if (need[i][j] < 0) {
					alert("allotted can not exceed max allocation");
					return false;
				}
			}
		}
	};
	this.assignValues = function() {
		//console.log("available");
		for ( var j = 0; j < colsCnt; j++) {
			available[j] = $("#available_"+ j).val();
			//console.log(available[j]);
		}
		//console.log("max allocation");
		for ( var i = 0; i < rowsCnt; i++) {
			maxAlloc[i] = [];

			for ( var j = 0; j < colsCnt; j++) {
				maxAlloc[i][j] = $("#maxAlloc_" + i + j).val();
				//console.log(maxAlloc[i][j]);
			}
		}
		//console.log("allotted");
		for ( var i = 0; i < rowsCnt; i++) {
			allotted[i] = [];
			for ( var j = 0; j < colsCnt; j++) {
				allotted[i][j] = $("#allotted_" + i + j).val();
				//console.log(maxAlloc[i][j]);
			}
		}
	};

	this.genSafeState = function() {
		
		var k = 0;
		while (safeState.length < rowsCnt) {
			if (safeState.length === 0 && tmp.length === 0) {
				while (k < rowsCnt) {
					flag = true;
					bankersObj.test(k);
					if (flag) {
						safeState.push(k);
						for ( var j = 0; j < colsCnt; j++) {
							available[j] = available[j] + allotted[k][j];
							allotted[k][j] = 0;
						}
						flag = true;
					} else {
						tmp.push(k);
						flag = true;
					}
					k++;
				}
			} else {
				jQuery.each(tmp, function(index, valueVar) {
					flag = true;
					bankersObj.test(valueVar);

					if (flag) {
						safeState.push(valueVar);
						//var a = tmp.indexOf(valueVar);
						//tmp.pop(a);
						tmp.pop(index);
						flag = true;
						return false;
					}
				});
			}
		}

	};
	this.test = function(procVar) {
		
		//need[procVar] = [];
		for ( var j = 0; j < colsCnt; j++) {
			if (need[procVar][j] > available[j]) {
				flag = false;
				return false;
			}
		}
	};
	this.dispSafeState = function() {
		lenSafeState = safeState.length;
			console.log("safe state");
		for ( var i = 0; i < lenSafeState; i++) {
			console.log(safeState[i]);
		}
	};
};
var bankersObj = new bankersTemplate();
