function importPics(extDiv){
    var pictures = [];
    var images = [];
    pictures = extDiv.getElementsByTagName("*");
    console.log(pictures);
    var totalArea = 0;
    for(i=0; i<pictures.length; i++) {
        if (pictures[i].tagName == "IMG"){
            width = pictures[i].clientWidth;
            ratio = pictures[i].clientHeight/width;
            //priority = parseFloat(pictures[i].id);
            priority = i+1;
            //box into a div
            var divBox = document.createElement("div");
            divBox.className = "imgdiv";
            divBox.style.backgroundImage = "url('"+pictures[i].src+"')";
            /*divBox.innerHTML = priority;*/
            divBox.style.backgroundRepeat = "no-repeat";
            divBox.style.backgroundSize = "100%";
            divBox.style.display = "block";
            divBox.style.float = "left";
            var imgpush = { w: width, r : ratio, div: divBox, p: priority ,a: width*width*ratio};    
            images.push(imgpush);
            totalArea += area(priority);
        }
        else{
            width = 1
            ratio = Math.random()/2+.5;
            priority = i+1;
            //box into a div
            var divBox = document.createElement("div");
            divBox.className = "divdiv";
            //divBox.style.backgroundImage = "url('"+pictures[i].src+"')";
            divBox.innerHTML = pictures[i].innerHTML;
            if (Math.random()<.66){
                divBox.style.backgroundColor = "#ec008c";
                divBox.style.color = "white";
            }
            else{
                divBox.style.backgroundColor = "white";
                divBox.style.color = "#ec008c";
            }
            //divBox.style.backgroundRepeat = "no-repeat";
            //divBox.style.backgroundSize = "100%";
            fSize=Math.sqrt(area(priority)/ratio)/pictures[i].innerHTML.length*20;
            divBox.style.fontSize = fSize+"em";
            divBox.style.lineHeight = 20*Math.sqrt(area(priority)*ratio)/fSize+"em";
            console.log(area(priority));
            divBox.style.display = "block";
            divBox.style.float = "left";
            var imgpush = { w: width, r : ratio, div: divBox, p: priority ,a: width*width*ratio};    
            images.push(imgpush);
            totalArea += area(priority);
        }
    }
    for(i=0; i<images.length; i++) {
        images[i].a = area(images[i].p)/totalArea*2000000;
        images[i].div.style.width = Math.round(Math.sqrt(images[i].a / images[i].r))+"px";
        images[i].div.style.height = Math.round(Math.sqrt(images[i].a * images[i].r))+"px";
    }
    return images;
}

function area(priority){
    return 1/priority;
}

function show(images,divv){
    div = document.createElement("div");
    for(i=0; i<images.length; i++){
        div.appendChild(images[i].div);
    }
    divv.appendChild(div);
}