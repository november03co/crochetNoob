var cellWidth = 30,
    cellHeight = 30,
    DEFAULTROW = 10,
    DEFAULTCOL = 30;

var paintCanvas = function (col, row) {
   
    for (var y = 0; y < row; y++) {
		var $row = $("<div class='row'/>");
		$row.appendTo("#tapestry");
    	for (var x = 0; x < col; x++){
     		$("<div class='st'/>").appendTo($row);   
    	}
    }
	
	resizeCells(col);
}

var resizeCells = function(col) {
	//calculate each st div width
	var w = $(window).width();
	
	var stW = Math.floor(w/col)-2;
	if (stW >= 50) {
		stW = 50;	
	}
	$(".st").width(stW);
	$(".st").height(stW);
	
	$("#tapestry").width((stW+2)*col);
}

var validateNum = function(val){
    var valid = 10;
    
    if ($.isNumeric(val)){
        val = Math.abs(val);
        if (val > 99) {
            val = 99;   
        }
        valid = val;
    }
    return valid;
}

$(function(){
    
    paintCanvas(DEFAULTCOL,DEFAULTROW);
    
    $("#tapestry").on("click", ".st", function(){
        var $this = $(this);
        if ($this.hasClass("color")){
            $this.removeClass("color");
        } else {
            $this.addClass("color");
        }
    });
    
    $("#size").on("click",".button",function(){
       var $this = $(this);
        if ( $this.data("value") === "rectangle"){
            
        } else {
            
        }
    });
    
    $("#numStitch,#numRow").keyup(function(){
		$("#tapestry").html("");
        
		var col = validateNum($("#numStitch").val());
        var row = validateNum($("#numRow").val());
        
        paintCanvas(col, row);
    });
	
	//adjust the cell size on window resize
	$(window).on("resize", function(e){
		resizeCells(validateNum($("#numStitch").val()));	
	});
});