function GetRecentAnomalies(req, resp){
    ClearBlade.init({request:req}); 
    ClearBlade.Query({collectionName:"Anomalies"}).descending("anomaly_timestamp").setPage(10,1).fetch(function(err, data){ 
        if(err){resp.error(data)} 
        resp.success(data)
        
    })
}