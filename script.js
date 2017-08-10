//Defined separator text
const SEPARATOR="/";
//Defined json to show in front web page
var fJson = {"dep":[]};

//Auxiliar Functions
function isEmpty(str) {
    return str.replace(/^\s+|\s+$/gm,'').length == 0;
}

function getIfExist(node,value){
    var hasValue = -1;
    
    for(var m=0;m<node.length;m++){
        if(node[m].id == value){
            hasValue = m;
            break;
        }
    }
    return hasValue;
}

function transformTxtToJson(response){
    var res  = response.data.split('\n');
        for(var i=0;i<res.length;i++){
            var nodes = res[i].split(SEPARATOR);
            var depNode = nodes[0];
            var provNode = nodes[1];
            var disNode = nodes[2];

            //Variables for attributes json
            var attrDepId="";
            var attrDepName="";
            var attrProvId="";
            var attrProvName="";
            var attrDisId="";
            var attrDisName="";

            var posDep  = -1;
            var posProv = -1;
            var posDis  = -1;

            if(!isEmpty(depNode)){
                //console.log("depnode value "+depNode);
                attrDepId = depNode.split(" ")[0];
                attrDepName = depNode.split(/\s(.+)/)[1];
                posDep = getIfExist(fJson.dep,attrDepId);
                if(posDep<0){
                    fJson.dep.push({"id":attrDepId,"name":attrDepName,"prov":[]});
                }
               
            }/*else{
                console.log("no depnode value");
            }*/
            if(!isEmpty(provNode)){
                //console.log("provnode value "+provNode);
                attrProvId = provNode.split(" ")[0];
                attrProvName = provNode.split(/\s(.+)/)[1];

                posDep = getIfExist(fJson.dep,attrDepId);
                if(posDep>=0){
                    posProv = getIfExist(fJson.dep[posDep].prov,attrProvId);
                    if(posProv<0){
                        fJson.dep[posDep].prov.push({"id":attrProvId,"name":attrProvName,"dis":[]});
                    }
                }
                
            }/*else{
                console.log("no provnode value");
            }*/
            if(!isEmpty(disNode)){
                //console.log("disnode value "+disNode);
                attrDisId = disNode.split(" ")[0];
                attrDisName = disNode.split(/\s(.+)/)[1];

                posDep = getIfExist(fJson.dep,attrDepId);
                if(posDep>=0){
                    posProv = getIfExist(fJson.dep[posDep].prov,attrProvId);
                    if(posProv>=0){
                        posDis = getIfExist(fJson.dep[posDep].prov[posProv].dis,attrDisId);
                        if(posDis<0){
                            fJson.dep[posDep].prov[posProv].dis.push({"id":attrDisId,"name":attrDisName});
                        }
                    }
                }
                
            }/*else{
                console.log("no disnode value");
            }*/    
            
            //console.log("-----------------------");        
        }
        //console.log(fJson);
        return fJson;
}

//Main Angular Application
var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope, $http) {
    /*$http.get("data.json")
    .then(function(response) {
        $scope.data = response.data;
    });*/
    $http.get("data.txt")
    .then(function(response) {
        var finalJson = transformTxtToJson(response);
        return finalJson;
    }).then(function(json){
        $scope.data = json;
    });
});