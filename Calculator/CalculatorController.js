({
	correctInput : function(component, event, helper) {
		var pattern = new RegExp('([^0-9]+)');
        var input = component.get('v.input');
        component.set('v.input',input.replace(pattern,''));
        
	},
    handleClick : function(component, event, helper) {
		var key = event.getSource().get("v.label");
        helper.handleInput(component,key);
        //alert('clicked '+btName);
	},
    keypress : function(component, event, helper) {
		var key = String.fromCharCode(event.keyCode);
		helper.handleInput(component,key);
	},
	equals : function(component, event, helper) {
		helper.handleInput(component,'=');
	},
	clear : function(component, event, helper){
		helper.clearInput(component);
	}
})