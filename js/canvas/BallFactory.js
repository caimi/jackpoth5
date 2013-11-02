var ballsByColor = {};

function clearBalls(){
    ballsByColor = {};
}

function getBall(key){
    if(!key)
        return resources.get("white");
    if(ballsByColor[key])
        return ballsByColor[key];
    
    var m_canvas = document.createElement('canvas');
    m_canvas.width = ballWidth;
    m_canvas.height = ballHeight;
    var m_context = m_canvas.getContext('2d');
    m_context.drawImage(resources.get("white"), 0, 0);
    
    var originalPixels = m_context.getImageData(0, 0, m_canvas.width, m_canvas.height);
    var currentPixels = m_context.getImageData(0, 0, m_canvas.width, m_canvas.height);

    var newColor = {R:Math.random()*255,G:Math.random()*255,B:Math.random()*255};

    for(var I = 0, L = originalPixels.data.length; I < L; I += 4)
    {
        var isNotTransparent = currentPixels.data[I + 3] > 0;
        if(isNotTransparent){
            currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
            currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
            currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
        }
    }

    m_context.putImageData(currentPixels, 0, 0);
    ballsByColor[key] = m_canvas;
    return ballsByColor[key];
}