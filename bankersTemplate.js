bankersTemplate = function() {
	'use strict';

	var bankersForm = jQuery("#bankersForm"), rows = jQuery("#rows"), columns = jQuery("#columns"),
	btnResourceDtls = jQuery("#btnResourceDtls"),btnAllotted=jQuery("#btnAllotted"),
	btnSafeState = jQuery("#btnSafeState"),
	available = [],
	maxAlloc = [],
	allotted = [],
	need = [],
	flag = false,
	safeState = [],
	tmp = [],
	rowsCnt,
	colsCnt,
	paragraph,
	mytable,
	lenSafeState,
	checkFlag;
	
	this.enableDisableEle = function(trueOrFalse) {
		 rows.prop("readonly",trueOrFalse);
		 columns.prop("readonly",trueOrFalse);
		 btnResourceDtls.prop("disabled",trueOrFalse);
	};

	this.createResourceDtlsTable = function(tableId,tableId1) {
		rowsCnt = rows.val();
		colsCnt = columns.val();
		if(rowsCnt>0 && colsCnt >0)
		{
		paragraph = $('<p align="center">Feed Available Resources</p>').attr({
			id : tableId+"1"
		});
		mytable = $('<table style="text-align : left" align="center"></table>').attr({
			id : tableId
		});
		var tr = [];
		var row = $('<tr></tr>').attr({
			class : [ "class1", "class2", "class3" ].join(' ')
		}).appendTo(mytable);
		for ( var j = 0; j < colsCnt; j++) {
			var t = $('<td></td>').appendTo(row);
			$('<input maxlength="1" onkeypress="bankersObj.isNumericKey(event);"></input>').attr({
				type : "text",
				id : "available_" + j
			}).appendTo(t);
		}
		paragraph.appendTo("#availableTableDiv");
		mytable.appendTo("#availableTableDiv");

		paragraph = $('<p align="center">Feed maximum count of resources which can be allocated</p>').attr({
			id : tableId1+"1"
		});
		mytable = $('<table style="text-align : left" align="center"></table>').attr({
			id : tableId1
		});
		var tr = [];

		for ( var i = 0; i < rowsCnt; i++) {
			var row = $('<tr></tr>').attr({
				class : [ "class1", "class2", "class3" ].join(' ')
			}).appendTo(mytable);
			for ( var j = 0; j < colsCnt; j++) {
				var t = $('<td></td>').appendTo(row);
				$('<input maxlength="1" onkeypress="bankersObj.isNumericKey(event);"></input>').attr({
					type : "text",
					id : "maxAlloc_" + i + j
				}).appendTo(t);
			}
		}
		paragraph.appendTo("#maxAllocTableDiv");
		mytable.appendTo("#maxAllocTableDiv");
		
		btnAllotted.prop("disabled",false);
		btnAllotted.show();
		btnResourceDtls.prop("disabled",true);
		rows.prop("readonly",true);
		columns.prop("readonly",true);

		return true;
	}
	else
	{
		alert("Number of processes and resources should be more than one");
		return false;
	}
	};

	this.createAllottedTable = function(tableId) {
		/*checkFlag=false;
		for(var i=0;i<colsCnt;i++)
		{
				if($("#available__"+i).val() === undefined)
				{
					checkFlag=true;
				}
		}
		if(!checkFlag)
		{
			for(var i=0;i<rowsCnt;i++)
			{
				for(var j=0;j<colsCnt;j++)
				{
					if($("#maxAlloc_"+i+j).val() === undefined)
					{
						checkFlag=true;
					}
				}
			}
		}*/
		if(!checkFlag)
		{
		paragraph = $('<p align="center">Feed count of resources which are allocated</p>').attr({
			id : tableId+"1"
		});

		mytable = $('<table style="text-align : left" align="center"></table>').attr({
			id : tableId
		});
		var tr = [];
		for ( var i = 0; i < rowsCnt; i++) {
			var row = $('<tr></tr>').attr({
				class : [ "class1", "class2", "class3" ].join(' ')
			}).appendTo(mytable);
			for ( var j = 0; j < colsCnt; j++) {
				var t = $('<td></td>').appendTo(row);
				$('<input maxlength="1" onkeypress="bankersObj.isNumericKey(event);"></input>').attr({
					type : "text",
					id : "allotted_" + i + j
				}).appendTo(t);
			}
		}
		paragraph.appendTo("#allottedTableDiv");
		mytable.appendTo("#allottedTableDiv");

		btnSafeState.prop("disabled",false);
		btnSafeState.show();

		btnAllotted.prop("disabled",true);

		for(var i=0;i<colsCnt;i++)
		{
				jQuery("#available__"+i).prop("readonly",true);
		}
		for(var i=0;i<rowsCnt;i++)
		{
			for(var j=0;j<colsCnt;j++)
			{
				jQuery("#maxAlloc_"+i+j).prop("readonly",true);
			}
		}
	}
	else
	{
		alert("Please complete all fields");
		return false;
	}
	};
	this.test = function(procVar) {
		for ( var j = 0; j < colsCnt; j++) {
			if (need[procVar][j] > available[j]) {
				flag = false;
				return false;
			}
		}
	};
	this.safeStateCalc =function()
	{
		/*checkFlag=false;
		if(!checkFlag)
		{
			for(var i=0;i<rowsCnt;i++)
			{
				for(var j=0;j<colsCnt;j++)
				{
					if($("#allotted__"+i+j).val() === undefined)
					{
						checkFlag=true;
					}
				}
			}
		}*/
		if(!checkFlag)
		{
			for ( var i = 0; i < rowsCnt; i++) {
				maxAlloc[i] = [];
				for ( var j = 0; j < colsCnt; j++) {
					maxAlloc[i][j] = $("#maxAlloc_" + i + j).val();
				}
			}	
			for ( var i = 0; i < rowsCnt; i++) {
				allotted[i] = [];
				for ( var j = 0; j < colsCnt; j++) {
					allotted[i][j] = $("#allotted_" + i + j).val();
				}
			}
			for ( var i = 0; i < rowsCnt; i++) {
				need[i] = [];
				for ( var j = 0; j < colsCnt; j++) {
					need[i][j] = maxAlloc[i][j] - allotted[i][j];
					if (need[i][j] < 0) {
						alert("allotted can not exceed max allocation");
						jQuery("#allotted_" + i + j).val('');		
						return false;
					}
				}
			}
		}
		
		//disabling fields
		for(var i=0;i<rowsCnt;i++)
		{
			for(var j=0;j<colsCnt;j++)
			{
				jQuery("#allotted__"+i+j).prop("readonly",true);
			}
		}
		btnSafeState.prop("disabled",true);
		// disabling fields
		// assignments
		for ( var j = 0; j < colsCnt; j++) {
			available[j] = $("#available_"+ j).val();
		}
		// assignments

		var k = 0;
		while (safeState.length < rowsCnt) {
			if (safeState.length === 0 && tmp.length === 0) {
				while (k < rowsCnt) {
					flag = true;
					bankersObj.test(k);
					if (flag) {
						safeState.push(k);
						for ( var j = 0; j < colsCnt; j++) {
							available[j] = parseFloat(available[j]) + parseFloat(allotted[k][j]);
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
						tmp.pop(index);
						flag = true;
						return false;
					}
				});
			}
		}
		lenSafeState = safeState.length;
		$('#pId').append("Order of processes in safe states is as follows :<br/>");
		for ( var i = 0; i < lenSafeState; i++) {
			$('#pId').append("Process No:"+safeState[i]+"<br/>");
		}
	};
	this.isNumericKey=function(e) {     
		/*if (window.event) {
 			var num = window.event.keyCode; 
		}     
 		if(!(num>=48 && num<=57)) { 
 			return false;
 		}     
		return true; */
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        return false;
    }
	};
};
var bankersObj = new bankersTemplate();
