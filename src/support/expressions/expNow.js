
var expNow = {

    parseExpression: function (expression) {
        console.log('received', expression);
        var parts = expression.split('|');

        if (parts.length == 2) {
            var fmt = parts[0].trim();
            var nums = parts[1].trim();

            if (nums.length < 3) {
                throw "[1] - now(format)  		   - now(HH:mm:ss) 		        - 10:17:05 \n";
            }

            console.log('fmt', fmt);
            console.log('nums', nums);
        }else{
            
        }
        return 'NOWWWWWW';
    }

};

module.exports = expNow;