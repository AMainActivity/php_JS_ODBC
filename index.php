<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head>
	<title>hello ASUDNN</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"/>
	<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
	<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
	<link rel="stylesheet" href="../hierarchical-tree-menu-mg/mgaccordion.css" />
	<link rel="stylesheet" href="../style/style.css" /><script src="../hierarchical-tree-menu-mg/mgaccordion.js"></script>
	<script src="asudnn.js"></script>
</head>

<body onload="onLoad();">
<div id="main">	
	<div id="menuButton">
		<button  class="btn" onclick="getAsudnn()" ><i class="fa fa-info"></i></button>
		<button  class="btn2" onclick="backMain()" ><i class="fa fa-arrow-left"></i> Главная</button>
		<input type="text" readonly="false" id="dpStart" size="30" />
		<input type="text" readonly="false" id="dpEnd" size="30" />
		<input id="inSourseName" placeholder="источник" type="text">
		<input id="inDestName" placeholder="приёмник" type="text">
		<input id="inSourceProdName" placeholder="продукт источника" type="text">
		<input id="inDestProdName" placeholder="продукт приёмника" type="text">
		<button class="btnClear" onclick="clearFilter()" ><i class="fa fa-trash"></i></i></button>
	</div>
		<div id="tankInfo2">
  
		</div>


	
	<div id="dialog-info" title="Информация">
		<p id="d-info"></p>

</div>
</div>
</body>
</html>