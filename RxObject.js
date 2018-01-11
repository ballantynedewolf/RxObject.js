function RxObject (input,type,validation) {
    //no set method for type. For a new type, construct a new object
    this.type=type;
    this.setStringVector=function(input){
        if (typeof input=="string"){
            console.log("Setting string and vector from string: "+input);
            this.string=input;
            if (type=="sph"||type=="cyl"||type=="prismH"||type=="prismV"){
                var x=input;
                x= (x.substr(0,1)=="+") ? Number(x.substr(1)) : 0-(Number(x.substr(1)));
                this.vector=x;
                //special case of 0 or plano
                    if (x===0){this.string="plano";}
                }
            else if(type=="axisC"){
                this.vector=Number(input);
                }
            }
        else if(typeof input=="number"){
            console.log("Setting string and vector from number: "+input);
            this.vector=input;
            if (type=="sph"||type=="cyl"||type=="prismH"||type=="prismV"){
                var y=input;
                if (y<0){
                    y= (y%1==0) ? String(y)+".00" : String(y);
                }
                else if(y==0){
                y="plano";
                    }
                else {
                    y= (y%1==0) ? "+"+String(y)+".00" : "+"+String(y);
                    }
            this.string=y;
            }
            else if(type=="axisC"){
                this.string=String(input);
            }
        }
    }//end of setStringVector function
        
    
    this.setValMode=function(type,validation){
        console.log("Setting val mode from "+type+" and "+validation);
        if (type=="cyl"){
            this.valMode="-0.25"//default
            if(validation!=undefined){
                var valModes=["0.25","-0.25","0.12","-0.12"];
                if(valModes.indexOf(validation)==-1){
                    this.valMode=false;
                }
                else {
                    this.valMode=validation;
                    
                }
            }
            console.log("Validation Mode = "+this.valMode);
        }
        if (type=="sph"){
            this.valMode="0.25"//default
            if(validation!=undefined){
                var valModes=["0.25","0.12"];
                if(valModes.indexOf(validation)==-1){
                    this.valMode=false;
                }
                else {
                    this.valMode=validation;
                }
            }
            console.log("Validation Mode = "+this.valMode);
        }
        if (type=="axisC"){
            this.valMode="180";//default
            console.log("Validation Mode = "+this.valMode);
        }
        
            if(this.valMode===false){
                this.validation=false;
                this.validationMsg="Invalid validation mode for a "+this.type;
            }
    
    };//end of setValMode function
    
    this.validate=function(string,valMode){
        console.log("Validating from "+string+" and "+valMode);
        //special case for plano or 0.00
        if (string=="plano"||string.substr(1)=="0.00"||Number(string)==0){
            if(this.type=="sph"){
                var output={valid:true,msg:"Special validation for plano or '0.00'"};
            }
            else if(this.type=="cyl"){
                var output={valid:false,msg:"Cyl cannot be zero"};
            }
            else{
                var output={valid:true,msg:"Validation Mode = "+valMode};
            }
        }
        else{
            switch(valMode){
                case "0.25":
                    var patt = /([-+])([\d]{1,2}).([0257][05])/g;
                    var result = patt.exec(string);
                    var output=(result==null)?{valid:false,msg:"Validation "+valMode+" failed"}:{valid:true,msg:"Validation Mode = "+valMode};                
                    break;
                case "-0.25":
                    var patt = /([-])([\d]{1,2}).([0257][05])/g;
                    var result = patt.exec(string);
                    var output=(result==null)?{valid:false,msg:"Validation "+valMode+" failed"}:{valid:true,msg:"Validation Mode = "+valMode};                
                    break;
                case "0.12":
                    var patt = /([-+])([\d]{1,2}).([0123578][0257])/g;
                    var result = patt.exec(string);
                    var output=(result==null)?{valid:false,msg:"Validation "+valMode+" failed"}:{valid:true,msg:"Validation Mode = "+valMode};                
                    break;
                case "-0.12":
                    var patt = /([-])([\d]{1,2}).([0123578][0257])/g;
                    var result = patt.exec(string);
                    var output=(result==null)?{valid:false,msg:"Validation "+valMode+" failed"}:{valid:true,msg:"Validation Mode = "+valMode};                
                    break;
                case "180":
                    var output=(string.substr(0,1)!="+"&&isNaN(string)===false&&Number(string)>0&&Number(string)<=180)?{valid:true,msg:"Validation Mode = "+valMode}:{valid:false,msg:"Validation "+valMode+" failed"};
                    break;
                case "360":

                    break;
                case "UPDOWN":

                    break;
                case "INOUT":

                    break;
                default:
                    var output={valid:false,msg:"couldn't validate"};

            }
        }//end else
        return output;
    }//end of validate function
    
    //main constructor procedure...
    if(typeof input=="string"){
        this.setValMode(this.type,validation);
        this.validation=this.validate(input,this.valMode);
        this.valid=this.validation.valid;
        this.validationMsg=this.validation.msg;
        if (this.valid===true){
            this.setStringVector(input);
        }
    }
    else{this.setStringVector(input);}
    
//get methods
this.getProperties = function () {
     var dump="vector: "+this.vector+
     ", string: "+this.string+
     ", type: "+this.type+
     ", validation: "+this.valid+
     ", validationMsg: "+this.validationMsg;
     return dump;
}

this.getString=function(){
    return this.string;
}
this.getVector=function(){
    return this.vector;
}
this.getType=function(){
    return this.type;
}
this.getValidation=function(){
    return this.valid;
}
this.getValidationMsg=function(){
    return this.validationMsg;
}

    //set methods
    //there is no setType method - you need to construct a new RxObject to change type
    this.setString=function (input,validation){
        var output={result:"",msg:""};
        if(typeof input!="string"){
            output.result=false;
            output.msg=input+" is not a string.";
        }
        else{
            //set a local validation
            var oldValMode=this.valMode;
            this.setValMode(this.type,validation);
            var val=this.validate(input,this.valMode);
            if (val.valid===true){
                output.result=true;
                output.msg=null;
                this.valid=output.result;
                this.validationMsg="New string "+input+" is valid. valMode= "+this.valMode;
                //set new string and vector
                this.setStringVector(input);
                }
                else{//if didn't validate
                    output.result=false;
                    output.msg=input+" is not a valid "+this.type+" using valMode "+this.valMode;
                    this.valMode=oldValMode;
                    }
            }

    if(output.result===false){console.log(this.validationMsg);}    
    return output;
    }
    this.setVector=function(input){
        var output={result:"",msg:""};
        if(typeof input!="number"){
            output.result=false;
            output.msg=input+" is not a valid number";
            }
            else{
                //set string and vector
                this.setStringVector(input);
                output.result=true
                output.msg=null;
                this.valid=output.result;
                this.validationMsg="vector and string updated";
                }
    if(output.result===false){console.log(this.validationMsg);}
    return output;
    }
    this.setValidation=function(input){
        var output={result:"",msg:""};
        var oldValMode=this.valMode;
        this.setValMode(this.type,input);
        var val=this.validate(this.string,this.valMode);
        if (val.valid===true){
                output.result=true;
                output.msg=this.string+" validates against the new valMode "+this.valMode;
                this.valid=output.result;
                this.validationMsg=output.msg;
            }
            else{
                output.result=false;
                output.msg=this.string+" does not validate against the new ValMode "+validation;
                this.valMode=oldValMode;
                }
    if(output.result==false){console.log(this.validationMsg);}
    return output;
    }
}