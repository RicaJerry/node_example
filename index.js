var rect = require('./rectangle')

function solveRect(l, b){
    console.log("Solving for rectangle with l = " +l +" b= "+ b);

    rect(l, b, (err, rectangle) => {
        if(err){
            console.error("ERROR:", err.message);
        }else{
            console.log("Perimeter l = " + l + " b = " + b + " perimeter :" + rectangle.perimeter());
            console.log("Area l = " + l + " b = " + b + " area :" + rectangle.area(l+1, b+1));
        }
    });

    console.log("this statement is after the call to rect ");
}
solveRect(2, 3);
solveRect(20, 32);
solveRect(-21, 33);
solveRect(21, 33);