

window.CanvasSticks = (function() {
    function drawCandleStick(ctx, index, data, yScale, stickOptions) {
        console.log(data);
        var stickWidth = stickOptions.width;
        var margin = stickOptions.margin;
        var xBaseline = index * (stickWidth + margin);

        // First draw a line for the high
        ctx.strokeStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(xBaseline, data.high * yScale);
        ctx.lineTo(xBaseline + stickWidth, data.high * yScale);
        ctx.stroke();
        ctx.closePath();

        // Then draw a line for the low
        ctx.beginPath();
        ctx.moveTo(xBaseline, data.low * yScale);
        ctx.lineTo(xBaseline + stickWidth, data.low * yScale);
        ctx.stroke();
        ctx.closePath();

        // Now draw the box for open/close
        var bOpenCloseSame = data.open === data.close;
        var bGained = data.close > data.open;
        ctx.fillStyle = bGained ? '#00ff00' : '#ff0000';
        ctx.fillRect(
            xBaseline,
            bGained ? data.open * yScale : data.close * yScale,
            stickWidth,
            bOpenCloseSame ? 0 : Math.abs(data.open - data.close) * yScale
        );
        ctx.strokeRect(
            xBaseline,
            bGained ? data.open * yScale : data.close * yScale,
            stickWidth,
            bOpenCloseSame ? 0 : Math.abs(data.open - data.close) * yScale
        );

        // And draw the line from high to open/close and from low to open/close
        ctx.beginPath();
        ctx.moveTo(xBaseline + (stickWidth / 2), data.high * yScale);
        ctx.lineTo(xBaseline + (stickWidth / 2), bGained ? data.close * yScale : data.open * yScale);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(xBaseline + (stickWidth / 2), data.low * yScale);
        ctx.lineTo(xBaseline + (stickWidth / 2), bGained ? data.open * yScale : data.close * yScale);
        ctx.stroke();
        ctx.closePath();
    }

    return {
        replace: function(canvas, options) {
            if(!options.data || !options.data.length) {
                throw new Error('No data provided');
            }
            if(!options.canvas) {
                options.canvas = {};
            }
            if(!options.sticks) {
                options.sticks = {
                    width: 25,
                    margin: 10
                };
            }
            if(options.canvas.width) {
                canvas.width = options.canvas.width;
            }
            if(options.canvas.height) {
                canvas.height = options.canvas.height;
            }
            
            var data = options.data;
            var dataLength = options.data.length;
            var ctx = canvas.getContext('2d');
            var height = canvas.height;

            // Calculate the max and min values
            var max = 0;
            var min = 0;
            for(var i = 0; i < dataLength; i++) {
                var d = data[i];
                if(d.high > max) {
                    max = d.high;
                }
                if(d.low < min) {
                    min = d.low;
                }
            }

            var range = max - min;

            range += range * 0.1;

            // Get the scale for x = 0 to min mapping
            var yScale = height / range;
            
            canvas.style.transform = 'scaleY(-1)';

            // Draw the sticks
            for(var i = 0; i < dataLength; i++) {
                drawCandleStick(ctx, i, data[i], yScale, options.sticks);
            }
        }
    };
})();