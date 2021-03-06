var cellWidth = 30,
    cellHeight = 30,
    DEFAULTROW = 10,
    DEFAULTCOL = 30;

var paintCanvas = function (col, row) {
	var currRow = parseInt($("#tapestry").data("row"), 10);
	var currCol = parseInt($("#tapestry").data("col"), 10);
	
	if (row > currRow) {
		//add more rows
		for (var y = 0; y < row-currRow; y++) {
			var $row = $("<div class='row'/>");
			$row.appendTo("#tapestry");
    		for (var x = 0; x < col; x++){
     			$("<div class='st'/>").appendTo($row);   
    		}
    	}
	} else if (row < currRow) {
		//remove rows
		for (var y = 0; y < currRow-row; y++) {
			$("#tapestry").find(".row:last-child").remove();	
		}
	} else {
		//row hasn't change	
		if (col > currCol){
			//add more columns
			for (var x = 0; x < col - currCol; x++){
				$("#tapestry").find(".row").each(function(){
					$(this).append("<div class='st'/>");
				});
			}
		} else if (col < currCol){
			for (var x = 0; x < currCol - col; x++){
				$("#tapestry").find(".row").each(function(){
					$(this).find(".st:last-child").remove();
				});
			}
		}
	}
	$("#tapestry").data("row",row).data("col",col);

	resizeCells(col);
}

var resizeCells = function(col) {
	//calculate each st div width
	var w = $(window).width();
	
	//find out how wide each stitch cell should be
	var stW = Math.floor((w-10)/col)-4; //2 is the margin between each cell
	if (stW >= 50) {
		stW = 50;	
	}
	$(".st").width(stW);
	$(".st").height(stW);
	
	$("#tapestry").width((stW+4)*col);
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

var updateMainColor = function(color){
$("#mainColorStyle").html($("#mainColorStyle").html().replace(/#[\da-f]{3,6}/ig, color));
}
var updateOtherColor = function(color){
	$("#otherColorStyle").html($("#otherColorStyle").html().replace(/#[\da-f]{3,6}/ig, color));
}


$(function(){
    
    resizeCells(DEFAULTCOL);
    
	$("input.color").spectrum({
		showPalette: false,
		move: function(color){
			if ($(this).attr("id") === "mainColor"){
				updateMainColor(color.toHexString());	
			} else {
				updateOtherColor(color.toHexString());	
			}
		}
	});
	
    $("#tapestry").on("click", ".st", function(){
        var $this = $(this);
        if ($this.hasClass("color")){
            $this.removeClass("color");
        } else {
            $this.addClass("color");
        }
    });
   
    $("#updateRow,#updateSt").click(function(){
		var col = validateNum($("#numStitch").val());
        var row = validateNum($("#numRow").val());
        
        paintCanvas(col, row);
    });
	
	//adjust the cell size on window resize
	$(window).on("resize", function(e){
		resizeCells(validateNum($("#numStitch").val()));	
	});
});