function doScript(height,divId){
    var pictures;
    var images = [];
    var rectangles =[];
        var nodeList = document.getElementById(divId);
        pictures = document.getElementById(divId).getElementsByTagName('img');
        for(i=0; i<pictures.length; i++) {
            width = pictures[i].clientWidth;
            heightt = pictures[i].clientHeight;
            source = pictures[i].src;
            idd = pictures[i].id;
            r = heightt/width;
            var imgpush = { rectangle: {h: heightt, w: width, x : 0, y : 0}, picture : {ratio : r, s: source, m: source, l:source, xl:source, id: idd }};    
            images.push(imgpush);
        }
        /*nodeList=nodeList.childNodes[0];*/

       
        /*images = [];
        while (nodeList.nextElementSibling!=null)
          {
            if (nodeList.clientHeight!=undefined){
                width = nodeList.clientWidth;
                height = nodeList.clientHeight;
                source = nodeList.src;
                idd = nodeList.id;
                r = height/width;
                var imgpush = { rectangle: {h: height, w: width, x : 0, y : 0}, picture : {ratio : r, s: source, m: source, l:source, xl:source, id: idd }};    
                images.push(imgpush);
            }
            
            nodeList=nodeList.nextSibling
            
            }*/
        script_new(images, height);

        images.forEach(function(image) {
          rect = image.rectangle;
          pic= image.picture;
          divTag = document.getElementById(pic.id);
          divTag.style.visibility = "hidden";
          parentDiv = divTag.parentNode;
            var divtest = document.createElement("div");
            divtest.className ="imgdiv";

            divtest.style.position = "absolute";
            divtest.style.width = Math.round(rect.w)+"px";
            divtest.style.height = Math.round(rect.h)+"px";
            divtest.style.left = Math.round(rect.x)+"px"; 
            divtest.style.top = Math.round(rect.y)+"px";
            divtest.style.backgroundImage = "url('"+pic.l+"')";
            parentDiv.appendChild(divtest);
        });

}


function script_new(images,height){
    var shuffle =1;
    var invert = 1;
    var ratioFather = 1;
    var param;
    param=1 / 1.618;
    maxArea = 16;
    var safetyCount;
    if(shuffle==1){
        images=shuffleImages(images);
        safetyCount=30;
    }
    else{
        param = 0;
        safetyCount=0;
    }
    var precBlockStart;
    var areaBlock;
    var maxArea;
    var j;
    var ratioDad;
    ratioDad=1/ratioFather;
    //console.log(ratioDad);//larghezza
    var ratioSon;
    var traslatedX;
    do{
        precBlockStart = 0;
        areaBlock = maxArea + 1;
        traslatedX = 0;
        for (j = 0; j < images.length; j++) {
            if (areaBlock < maxArea) {
                var rPrec = images[j - 1].rectangle.th / images[j - 1].rectangle.tw;
                if ((rPrec + images[j].picture.ratio - param / rPrec - param / images[j].picture.ratio) < 0) {//SOTTO
                    images[j].rectangle.x = 0.0;
                    images[j].rectangle.y = images[j - 1].rectangle.th;
                    images[j].rectangle.h = images[j - 1].rectangle.tw * images[j].picture.ratio;
                    images[j].rectangle.w = images[j - 1].rectangle.tw;
                    images[j].rectangle.th = images[j - 1].rectangle.th + images[j].rectangle.h;
                    images[j].rectangle.tw = images[j - 1].rectangle.tw;
                    if(invert == 1&&Math.random()>.5){
                        for(var k=precBlockStart;k<j;k++){
                            images[k].rectangle.y +=images[j].rectangle.h;
                        }
                        images[j].rectangle.y =0;
                    }
                }
                if ((rPrec + images[j].picture.ratio - param / rPrec - param / images[j].picture.ratio) >= 0) {//A DESTRA
                    images[j].rectangle.x = images[j - 1].rectangle.tw;
                    images[j].rectangle.y = 0.0;
                    images[j].rectangle.h = images[j - 1].rectangle.th;
                    images[j].rectangle.w = images[j - 1].rectangle.th / images[j].picture.ratio;
                    images[j].rectangle.th = images[j - 1].rectangle.th;
                    images[j].rectangle.tw = images[j - 1].rectangle.tw + images[j].rectangle.w;
                    if(invert == 1&&Math.random()>.5){
                        for(var k=precBlockStart;k<j;k++){
                            images[k].rectangle.x +=images[j].rectangle.w;
                        }
                        images[j].rectangle.x =0;
                    }
                }

                areaBlock = images[j].rectangle.tw * images[j].rectangle.th;
            }
            else {
                if (j != 0) {
                    //RESIZE and TRASLATE
                    var zoom = height / images[j - 1].rectangle.th;
                    if (precBlockStart != 0) traslatedX += images[precBlockStart - 1].rectangle.tw;
                    for (var i = precBlockStart; i < j; i++) {
                        images[i].rectangle.tw *= zoom;
                        images[i].rectangle.x = images[i].rectangle.x * zoom + traslatedX;
                        images[i].rectangle.y *= zoom;
                        images[i].rectangle.h *= zoom;
                        images[i].rectangle.w *= zoom;
                        images[i].rectangle.th *= zoom;
                    }
                    precBlockStart = j;
                }
                images[j].rectangle.x = 0.0;
                images[j].rectangle.y = 0.0;
                images[j].rectangle.h = 1.0;
                images[j].rectangle.w = 1.0 / images[j].picture.ratio;
                images[j].rectangle.th = 1.0;
                images[j].rectangle.tw = images[j].rectangle.w;
                areaBlock = 0;
            }
        }
        if (j != precBlockStart) {
            //LAST CYCLE
            var zoom = height / images[j - 1].rectangle.th;
            if (precBlockStart != 0) traslatedX += images[precBlockStart - 1].rectangle.tw;
            for (var i = precBlockStart; i < j; i++) {
                images[i].rectangle.tw *= zoom;
                images[i].rectangle.x = images[i].rectangle.x * zoom + traslatedX;
                images[i].rectangle.y *= zoom;
                images[i].rectangle.h *= zoom;
                images[i].rectangle.w *= zoom;
                images[i].rectangle.th *= zoom;
                //console.log("i:" + i + "; transl:" + traslatedX + ";x:" + images[i].rectangle.x);
            }
        }
        ratioSon=(images[images.length-1].rectangle.tw+traslatedX)/images[images.length-1].rectangle.th;
        //maxArea*=0.9;
        param*=.9;
        safetyCount--;
        //console.log(" safetyCount"+safetyCount+" ratioDad"+ratioDad+" ratioSon"+ratioSon+" maxArea"+maxArea);
    }while(ratioSon<ratioDad&&safetyCount>0);
    //ROUND PIXELS
    /*//ceil,floor or round?
    for (var i=0;i < images.length;i++){
        images[i].rectangle.x=Math.round(images[i].rectangle.x);
        images[i].rectangle.y=Math.round(images[i].rectangle.y);
        images[i].rectangle.h=Math.round(images[i].rectangle.h);
        images[i].rectangle.w=Math.round(images[i].rectangle.w);
        images[i].rectangle.th=Math.round(images[i].rectangle.th);
        images[i].rectangle.tw=Math.round(images[i].rectangle.tw);
    }
    images.width=Math.floor(images.width);
    images.height=Math.floor(images.height);
    */

    //if (pattern.zero === "0")invertPath(images);
    //console.log(images);
    /*var key = "height";
    delete images[key];
    key = "length";
    delete images[key];
    key = "width";
    delete images[key];
    key = "caption";
    delete images[key];
    key = "description";
    delete images[key];
    key = "title";
    delete images[key];
    key = "featured_image";
    delete images[key];*/
    return images;
}


function shuffleImages(images) {
    var i = images.length;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = images[i];
        images[i] = images[j];
        images[j] = temp;
    }
    return images; // for convenience, in case we want a reference to the array
}


function orizontal_rggs(images,height){
    for(var i = 0; i < images.length; i ++){
        images[i].rectangle.h*=height;
        images[i].rectangle.w*=height;
        if (i!=0) images[i].rectangle.x=images[i-1].rectangle.x+images[i-1].rectangle.w;
    }

    return images;
}


function vertical_rggs(images,width){
    for(var i = 0; i < images.length; i ++){
        images[i].rectangle.h*=(width/images[i].rectangle.w);
        images[i].rectangle.w=width;
        if (i!=0) images[i].rectangle.y=images[i-1].rectangle.y+images[i-1].rectangle.h;
    }
    return images;
}












