/*
	Date: 10/08/2016
	Author: Tedi Cela
	dependecies: JQuery
*/

//Selectable Plugin:
$.fn.selectable = function(config){
	
	/*
	
	config={
		class:"",
		selectedClass:"selected-row",
		checkbox:false,
		multiple:true,
		combinedKey:"ctrlKey",
		onClick:function(){},
		onSelect:function(){},
		onDeselect:function(){},
	};
	// combinedKey: ctrlKey, altKey,shiftKey
	
	*/
	
	var selectableCls = "selectable";
	var selectedClass = "selected-row";
	var checkbox = true;
	var multiple = true;
	var combinedKey = "ctrlKey";
	var onClick = function(){};
	var onSelect = function(){};
	var onDeselect = function(){};
	
	if(typeof config.class !== "undefined" ) selectableCls = config.class;
	if(typeof config.selectedClass !== "undefined" ) selectedClass = config.selectedClass;
	if(typeof config.checkbox !== "undefined" ) checkbox = config.checkbox;
	if(typeof config.multiple !== "undefined" ) checkbox = config.multiple;
	if(typeof config.combinedKey !== "undefined" ) combinedKey = config.combinedKey;
	if(typeof config.onClick !== "undefined" ) onClick = config.onClick;
	if(typeof config.onSelect !== "undefined" ) onSelect = config.onSelect;
	if(typeof config.onDeselect !== "undefined" ) onDeselect = config.onDeselect;
	
	var SL_BLK = this;
	
	$("#"+SL_BLK.attr('id')+" ."+selectableCls).css("-moz-user-select","none");
	
	$("#"+SL_BLK.attr('id')+" ."+selectableCls).on("click", function(e){
		
		$(this).addClass(selectableCls+"-clicked");
		$(this).removeClass(selectableCls);
		
		if (!e) e = window.event;
		
		if (e[combinedKey] && multiple ) {
			//console.log("Combined key presset");
		}else{
			
			if(checkbox){
				$("#"+SL_BLK.attr('id')+" ."+selectableCls).find("input[type='checkbox']").each(function(){
					$(this).prop("checked", false);
				});
			}
			
			$("#"+SL_BLK.attr('id')+" ."+selectableCls).each(function(){
				$(this).removeClass(selectedClass);
			});
			
		}
		$(this).removeClass(selectableCls+"-clicked");
		$(this).addClass(selectableCls);
		
		//Select Item:
		
		if($(this).hasClass(selectedClass) ){
			
			if(checkbox){
				$(this).find("input[type='checkbox']").each(function(){
					$(this).prop("checked", false);
				});
			}
			
			$(this).removeClass(selectedClass);
			onDeselect(this);
		}else{
			
			if(checkbox){
				$(this).find("input[type='checkbox']").each(function(){
					$(this).prop("checked", true);
				});
			}
			
			$(this).addClass(selectedClass);
			onSelect(this);
		}
		
		onClick();
		
	});
};
