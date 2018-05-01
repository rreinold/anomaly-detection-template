const TOPIC = "sensor"
const NUM_MESSAGES = 5
const INPUT = [3,4,7,1,1,7,6,3,7,10,3,6,7,0,0,9,0,10,5,5,0,6,1,7,4,40,1,9,8,2,1,8,1,1,6,8,4,2,7,8,6,3,5,5,5,1,9,8,2,9,6,2,10,3,3,3,7,1,5,60,5,6,1,10,9,1,3,8,3,6,10,2,1,8,2,5,6,2,1,1,4,8,6,8,7,30,8,1,1,2,0,6,5,5,7,3,6,4,3,2];
/**
 * Simulates a sensor feed from a sensor network of temperature sensors
 * Publishes NUM_MESSAGES messages to TOPIC
 */
function SimulateSensorFeed(req, resp){
    ClearBlade.init({request:req})
    var client = ClearBlade.Messaging()
    
    var start = Math.floor(Math.random()*25)
    var finish = start+NUM_MESSAGES
    var toPublish = INPUT.slice(start, finish)
    log({start, finish})
    toPublish.forEach(publish)
    resp.success("Completed " + toPublish.length + " pubs")
    
    function publish(val){
        var sensor_key = "temperature"
        var msg = {}
        msg[sensor_key] = val
        var msg = JSON.stringify(msg)
        log(msg)
        client.publish(TOPIC, msg)
    }
}