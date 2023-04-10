<?php
header( 'Content-Type: text/html; charset=utf-8' );
	$response = array(); 
						
	if($_SERVER['REQUEST_METHOD']=='POST'){		
		$mStart = $_POST['mStart'];
		$mEnd = $_POST['mEnd'];
        include_once 'config.php';
		$dsn="DRIVER={SQL Server};SERVER=".DB_HOST.";DATABASE=".DB_NAME;
		$username=DB_USERNAME;
		$password=DB_PASSWORD;
		/*
		$conn=odbc_connect($dsn, $username, $password);
		if( $conn === false )
		{ die( FormatErrors(sqlsrv_errors()) ); }
		*/
		//var_dump($conn);
		//echo $sql;
		/*$rs=odbc_exec($conn,$sql);
		// Fetch and display the result set value.
		if (!$rs){
		exit("Error in SQL");
		}		
		while (/*$row = odbc_fetch_array($rs)*odbc_fetch_row($rs)){
		$colTransferUID=odbc_result($rs, "TransferUID");   
		//echo "$col1 # $col2 # $col3 # $col4<br>";
		}
		echo $listOperations;
		odbc_close($conn);*/
		$sql="";
		$sql.=" SELECT * from ";
		$sql.="( ";
		$sql.=" SELECT     [iomsdb_test].[oms].[Transfer].TransferUID, [iomsdb_test].[oms].[Transfer].StartTime, [iomsdb_test].[oms].[Transfer].EndTime, ObjectSource.ObjectName AS SourceName, "; 
		$sql.="                      ObjectDestination.ObjectName AS DestinationName, ProductSource.ProductName AS SourceProduct,  ";
		$sql.="                      ProductDestination.ProductName AS DestProduct,  ";
		$sql.="                [iomsdb_test].[oms].[Transfer].[SourceFlow], [iomsdb_test].[oms].[Transfer].[DestFlow], [iomsdb_test].[oms].[Transfer].[SourceMass], [iomsdb_test].[oms].[Transfer].[DestinationMass], ";
		$sql.="				[iomsdb_test].[oms].[Transfer].ShiftMasses, [iomsdb_test].[oms].[Transfer].SourceTagMass, [iomsdb_test].[oms].[Transfer].DestTagMass, ";
		$sql.="				[iomsdb_test].[oms].[Transfer].SourceMassManualInput, [iomsdb_test].[oms].[Transfer].DestinationMassManualInput ";
		$sql.=" FROM         oms.Transfer INNER JOIN ";
		$sql.="                      oms.Object AS ObjectSource ON [iomsdb_test].[oms].[Transfer].SourceUID = ObjectSource.ObjectUID INNER JOIN ";
		$sql.="                      oms.Object AS ObjectDestination ON [iomsdb_test].[oms].[Transfer].DestinationUID = ObjectDestination.ObjectUID LEFT OUTER JOIN ";
		$sql.="                      oms.Product AS ProductDestination ON [iomsdb_test].[oms].[Transfer].DestProductUID = ProductDestination.ProductUID LEFT OUTER JOIN ";
		$sql.="                      oms.Product AS ProductSource ON [iomsdb_test].[oms].[Transfer].SourceProductUID = ProductSource.ProductUID LEFT OUTER JOIN";
		$sql.="                      oms.Product AS Product ON [iomsdb_test].[oms].[Transfer].ProductUID = Product.ProductUID ";
		$sql.=") tbl                       ";
		$sql.="                Where ";
		$sql.="               (tbl.SourceName <> tbl.DestinationName) AND";
		$sql.="               tbl.StartTime >= :startT AND tbl.StartTime <= :endT AND";
		$sql.="               (tbl.EndTime <= :endT2 OR tbl.EndTime IS NULL) ORDER BY tbl.StartTime, tbl.EndTime";
		
		$dsn2 ="odbc:DRIVER={SQL Server};SERVER=pisql3;DATABASE=iomsdb_test;UID=".$username.";PWD=".$password."";
		try {
			$dbh = new PDO($dsn2);
			$dateStart = date("Y-m-d H:i:s", strtotime($mStart." 12:00:00"));
			$dateEnd = date("Y-m-d H:i:s", strtotime($mEnd." 12:00:00"));
			$stmt = $dbh->prepare($sql);
			$stmt->bindValue(':startT',$dateStart);
			$stmt->bindValue(':endT'  ,$dateEnd);
			$stmt->bindValue(':endT2'  ,$dateEnd);
			/*$stmt->bindParam(1, $inval , PDO::PARAM_DATETIME);
			$stmt->bindParam(2, $inval2 , PDO::PARAM_DATETIME);*/
			$stmt->execute();
			$response['asudnnData'] = array(); 
			$response['error'] = false; 
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
				$temp = array();	
				$temp['TransferUID']=$row["TransferUID"];	
				$temp['StartTime']=date("d.m.Y H:i:s", strtotime($row["StartTime"]));	
				$temp['EndTime']=date("d.m.Y H:i:s", strtotime($row["EndTime"]));	
				$temp['SourceName']=mb_convert_encoding($row["SourceName"], "utf-8", "windows-1251");
				$temp['DestinationName']=mb_convert_encoding($row["DestinationName"], "utf-8", "windows-1251");
				$temp['SourceProduct']=mb_convert_encoding($row["SourceProduct"].$row["SourceFlow"], "utf-8", "windows-1251");
				$temp['DestProduct']=mb_convert_encoding($row["DestProduct"].$row["DestFlow"], "utf-8", "windows-1251");
				$temp['SourceMass']=round(mb_convert_encoding($row["SourceMass"], "utf-8", "windows-1251"),3);
				$temp['DestinationMass']=round(mb_convert_encoding($row["DestinationMass"], "utf-8", "windows-1251"),3);
				$temp['SourceTagMass']=mb_convert_encoding($row["SourceTagMass"], "utf-8", "windows-1251");
				$temp['DestTagMass']=mb_convert_encoding($row["DestTagMass"], "utf-8", "windows-1251");
				$temp['SourceMassManualInput']=round(mb_convert_encoding($row["SourceMassManualInput"], "utf-8", "windows-1251"));
				$temp['DestinationMassManualInput']=mb_convert_encoding($row["DestinationMassManualInput"], "utf-8", "windows-1251");	
				array_push($response['asudnnData'],$temp);   
			}
			$stmt = NULL;
			$dbh = NULL;
		} catch (PDOException $e) {   
			$response['error'] = true;  
			$response['message'] = mb_convert_encoding("Failed to connect: " . $e->getMessage(), "utf-8", "windows-1251");;
		}
	}else{
		$response['message'] =  'ошибка: 2 , обратитесь к администратору';		
	}	
	echo json_encode($response, JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE);						
?>