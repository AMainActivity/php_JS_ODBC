
	var tabHeader="";
	var resss="";
	var res;
	
	function backMain(){
		window.open("http://10.16.15.46:555","_self");
	}
	
	function onLoad() {
		$("#dpStart").datepicker({
			onSelect: function(date) {},
			showAnim: "slideDown",
			dateFormat: 'dd.mm.yy',
					monthNames : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
					dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
					firstDay: 1
		});				
		$("#dpStart").datepicker("setDate", -1)
		$('#dpStart').attr('size', $('#dpStart').val().length); 	
		$("#dpEnd").datepicker({
			onSelect: function(date) {},
			showAnim: "slideDown",
			dateFormat: 'dd.mm.yy',
					monthNames : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
					dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
					firstDay: 1
		});				
		$('#dpEnd').datepicker('setDate', 'today');
		$('#dpEnd').attr('size', $('#dpEnd').val().length); 	
		getAsudnnDataByPeriod($('#dpStart').val().toString(),$('#dpEnd').val().toString());	
	}
	
	function getAsudnnDataByPeriod(mStart,mEnd)
	{
		$.post('script2.php', {mStart:	mStart, mEnd:mEnd},
							    function(response){
									var data=JSON.parse(response);	
									if (!data["error"])
									{				
										res=data["asudnnData"];
										if (res.length>0)
											filTable(res);
										else
											showInfoMessage("Информация","Операции в сутках "+$('#dpStart').val().toString()+" - "+$('#dpEnd').val().toString()+" не заведены. Выберите другие сутки");
									}
									else showInfoMessage("Ошибка",data["message"]);
									readyFilter();			
								}
				);
	}

	function clearFilter(){
		document.getElementById('inSourseName').value="";
		document.getElementById('inDestName').value="";
		document.getElementById('inSourceProdName').value="";
		document.getElementById('inDestProdName').value="";
		filTable(res);
	}
	
	function getAsudnn()
	{		
		$('#tankInfo2').html("");
		getAsudnnDataByPeriod($('#dpStart').val().toString(),$('#dpEnd').val().toString());
	}	
	
	function readyFilter(){
		var inSourseName =  document.getElementById('inSourseName');
		var inDestName =  document.getElementById('inDestName');
		var inSourceProdName =  document.getElementById('inSourceProdName');
		var inDestProdName =  document.getElementById('inDestProdName');
		inSourseName.oninput = function() {
			var arr = res.filter(function (el) {
				return el.SourceName.toLowerCase().indexOf(inSourseName.value.toLowerCase()) !== -1 && 
						el.DestinationName.toLowerCase().indexOf(inDestName.value.toLowerCase()) !== -1 && 
						el.SourceProduct.toLowerCase().indexOf(inSourceProdName.value.toLowerCase()) !== -1 && 
						el.DestProduct.toLowerCase().indexOf(inDestProdName.value.toLowerCase()) !== -1
			});	
		filTable(arr);
		};  
		inDestName.oninput = function() {
			var arr = res.filter(function (el) {
				return el.SourceName.toLowerCase().indexOf(inSourseName.value.toLowerCase()) !== -1 && 
						el.DestinationName.toLowerCase().indexOf(inDestName.value.toLowerCase()) !== -1 && 
						el.SourceProduct.toLowerCase().indexOf(inSourceProdName.value.toLowerCase()) !== -1 && 
						el.DestProduct.toLowerCase().indexOf(inDestProdName.value.toLowerCase()) !== -1
			});	
		filTable(arr);
		};
		inSourceProdName.oninput = function() {
			var arr = res.filter(function (el) {
				return el.SourceName.toLowerCase().indexOf(inSourseName.value.toLowerCase()) !== -1 && 
						el.DestinationName.toLowerCase().indexOf(inDestName.value.toLowerCase()) !== -1 && 
						el.SourceProduct.toLowerCase().indexOf(inSourceProdName.value.toLowerCase()) !== -1 && 
						el.DestProduct.toLowerCase().indexOf(inDestProdName.value.toLowerCase()) !== -1
			});	
		filTable(arr);
		};
		inDestProdName.oninput = function() {
			var arr = res.filter(function (el) {
				return el.SourceName.toLowerCase().indexOf(inSourseName.value.toLowerCase()) !== -1 && 
						el.DestinationName.toLowerCase().indexOf(inDestName.value.toLowerCase()) !== -1 && 
						el.SourceProduct.toLowerCase().indexOf(inSourceProdName.value.toLowerCase()) !== -1 && 
						el.DestProduct.toLowerCase().indexOf(inDestProdName.value.toLowerCase()) !== -1
		});	
		filTable(arr);
		};  
	}
	
	function filTable(mJsonData)
	{		
		var tabHeader="<table id=\"tabOperations\">" +
		"<tr>"+
		"<th id=\"th\" ><b>Ид</b></th>"+
		"<th id=\"th\"><b>Начало</b></th>"+
		"<th id=\"th\"><b>Конец</b></th>"+
		"<th id=\"th\"><b>Источник</b></th>"+
		"<th id=\"th\"><b>Приёмник</b></th>"+
		"<th id=\"th\"><b>Продукт источника</b></th>"+
		"<th id=\"th\"><b>Продукт приёмника</b></th>"+
		"<th id=\"th\"><b>Масса И</b></th>"+
		"<th id=\"th\"><b>Масса П</b></th>"+
		"<th id=\"th\"><b>Тег И</b></th>"+
		"<th id=\"th\"><b>Тег П</b></th>"+
		"<th id=\"th\"><b>РВ И</b></th>"+
		"<th id=\"th\"><b>РВ П</b></th>"+
		"</tr>";
		$('#tankInfo2').html(tabHeader);
		resss="";
		var sMassColor="";
		var dMassColor="";
		var sourMassTag="";
		var destMassTag="";
		for (var i = 0; i < mJsonData.length; i++) {
			resss+='<tr id=\"tr\">';
			resss+="<td id=\"td\" ><center><button class=\"btnId\" onclick=\"showInfoMessage('Ид операции','"+(mJsonData[i]["TransferUID"]).toString()+"')\" ><i class=\"fa fa-info\"></i></button></center></td> ";
			resss+='<td id=\"td\" >'+(mJsonData[i]["StartTime"]).toString()+'</td> ';
			resss+='<td id=\"td\" >'+(mJsonData[i]["EndTime"]).toString()+'</td> ';
			resss+='<td id=\"td\" >'+(mJsonData[i]["SourceName"]).toString()+'</td> ';
			resss+='<td id=\"td\" >'+(mJsonData[i]["DestinationName"]).toString()+'</td> ';
			resss+='<td id=\"td\" >'+(mJsonData[i]["SourceProduct"]).toString()+'</td> ';
			resss+='<td id=\"td\" >'+(mJsonData[i]["DestProduct"]).toString()+'</td> ';
			if ((mJsonData[i]["SourceMassManualInput"])>0) sMassColor=" style=\"color: red;\" "; else sMassColor="";
				resss+='<td id=\"td\"'+ sMassColor+'>'+(mJsonData[i]["SourceMass"]).toString()+'</td> ';
			if ((mJsonData[i]["DestinationMassManualInput"])>0) dMassColor=" style=\"color: red;\" "; else dMassColor="";
				resss+='<td id=\"td\" '+ dMassColor+'>'+(mJsonData[i]["DestinationMass"]).toString()+'</td> ';
			if (((mJsonData[i]["SourceTagMass"]).toString()).length>0)
				sourMassTag="<center><button class=\"btnTag\" onclick=\"showInfoMessage('Тег источника','"+(mJsonData[i]["SourceTagMass"]).toString()+"')\" ><i class=\"fa fa-info\"></i></button></center>";
			else sourMassTag="";
				resss+="<td id=\"td\" >"+sourMassTag+"</td> ";						
			if (((mJsonData[i]["DestTagMass"]).toString()).length>0)
				destMassTag="<center><button class=\"btnTag\" onclick=\"showInfoMessage('Тег приёмника','"+(mJsonData[i]["DestTagMass"]).toString()+"')\" ><i class=\"fa fa-info\"></i></button></center>";
			else destMassTag="";
				resss+="<td id=\"td\" >"+destMassTag+"</td> ";
			resss+='<td id=\"td\" >'+(mJsonData[i]["SourceMassManualInput"]).toString()+'</td> ';
			resss+='<td id=\"td\" >'+(mJsonData[i]["DestinationMassManualInput"]).toString()+'</td> ';
			resss+="</tr>";
		}
		tabHeader+=resss+'</table>';			
		$('#tankInfo2').html(tabHeader);				
	}	
	
	function showInfoMessage(title,txt){
		$( "#dialog-info" ).show();
		$(function() {
			$( "#d-info" ).html(txt);
			$( "#dialog-info" ).dialog({
				title: title,
				modal: true,
				height: "auto",
				buttons: {
					"Ok": function() {
					$( this ).dialog( "close" );
					}
				}
			});
		});
	}