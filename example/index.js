document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        CanvasSticks.replace(
            document.getElementById('canvas'),
            {
                canvas: {  
                    width: 500,
                    height: 500,
                },
                data: [
                    {
                        close: 10,
                        open: 5,
                        high: 11,
                        low: 4
                    },
                    {
                        close: 12,
                        open: 10,
                        high: 15,
                        low: 9
                    },
                    {
                        close: 15,
                        open: 12,
                        high: 16,
                        low: 9
                    },
                    {
                        close: 9,
                        open: 12,
                        high: 13,
                        low: 8
                    }
                ]
            }
        );
    }
};