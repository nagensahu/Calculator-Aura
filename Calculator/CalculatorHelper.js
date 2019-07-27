({
	handleInput : function(component,key){
        //this.dump(component,'input: '+key);
		var number = new RegExp('(^[0-9]+$)','m','g');
		var operator = new RegExp('([\\*,\\+,\\-,/,=])','m','g');
        //check if input is a number. If it is, append to number already present or add new
		if(number.test(key)){
            var temp = component.get('v.input');
            if(component.get('v.newInput')){
                component.set('v.previous',temp);
                component.set('v.input',key);
                component.set('v.newInput',false);
            }else{
                
                if($A.util.isUndefinedOrNull(temp))temp='';
                component.set('v.input',temp+key);
                //this.dump(component,'number pressed');
            }
		}else if(operator.test(key)){
            this.clearHighlightBtn(component);
			switch(key){
				case '*':
					//component.set('v.msg','Multiply');
                    component.find('multiply').set('v.variant','success');
                	component.set('v.highlightBtn','multiply');
				break;
				case '+':
					//component.set('v.msg','Add');
                	component.find('add').set('v.variant','success');
                	component.set('v.highlightBtn','add');
				break;
				case '-':
					//component.set('v.msg','Subtract');
                    component.find('subtract').set('v.variant','success');
                	component.set('v.highlightBtn','subtract');
				break;
				case '/':
					//component.set('v.msg','Divide');
                    component.find('divide').set('v.variant','success');
                	component.set('v.highlightBtn','divide');
				break;
				case '=':
					//component.set('v.msg','Equals');
				break;
				default:
					//component.set('v.msg','Zilch');
				break;
			}
			this.buildExpr(component,key);
		}
	},
    buildExpr : function(component,operator) {
		var input = component.get('v.input');
		var oldOperator = component.get('v.operator');
		var prev = component.get('v.previous');
		
			if($A.util.isEmpty(prev) && !$A.util.isEmpty(input) && operator != '='){
                //this.dump(component,'input is not empty & previous is empty');
				prev = input;
				component.set('v.previous',prev);
				component.set('v.operator',operator);
				this.clearInput(component);
			}else if(!$A.util.isEmpty(prev) && !$A.util.isEmpty(input) && !$A.util.isEmpty(oldOperator)){
				this.calculate(component);
				this.dump(component,prev+' '+oldOperator+' '+input+' = '+component.get('v.input'));
                if(operator != '='){
                    component.set('v.operator',operator);
        			component.set('v.newInput',true);
                }
			}else{
				//component.set('v.msg','WTF happened. Operator was- '+operator+' .Expr was-'+prev+oldOperator+input);
				console.error('WTF happened. Operator was- '+operator+' .Expr was-'+prev+oldOperator+input);
			}
			
	},
	calculate : function(component) {
        //this.dump(component,'calculating...');
        this.evaluate(component);
        component.set('v.msg','Done!');
        this.clearPrev(component);
        this.clearOp(component);
	},
	clearInput : function(component){
		component.set('v.input',[]);
	},
	clearOp : function(component){
		component.set('v.operator',[]);
	},
    clearPrev : function(component){
		component.set('v.previous',[]);
	},
	evaluate : function(component){
        //this.dump(component,'eval called...');
		var operator = component.get('v.operator');
		var input = component.get('v.input');
		var prev = component.get('v.previous');
		var expr = prev+operator+input;
		var res = eval(expr);
		component.set('v.input',res.toString());
	},
    dump : function(component,val){
		var temp = component.get('v.dump');
		if($A.util.isEmpty(temp))
		component.set('v.dump',val);
		else
		component.set('v.dump',temp+'<br/>'+val);
    },
    clearHighlightBtn : function(component){
        var id = component.get('v.highlightBtn');
        if(!$A.util.isEmpty(id))component.find(id).set('v.variant','brand');
    }
})